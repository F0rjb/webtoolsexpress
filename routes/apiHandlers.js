// POST route to handle the request
const express = require("express");
const Function = require("../models/Functions");
const { authenticateJWT, isAdmin } = require("../config/authenticate");
const router = express.Router();

//Post REQUEST to handle Adding the api's
router.post("/add", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { name, kind, inputType, outputType, functionString } = req.body;
    if (await Function.findOne({ name: name })) {
      res.status(400).send({ error: "Funtion name already exists" });
      console.log("Function name already exists");
    } else {
      const addedFunction = new Function({
        name,
        kind,
        inputType,
        outputType,
        functionString,
      });
      await addedFunction.save();
      console.log("function added", addedFunction);
      res.send({ message: "Function added successfully", addedFunction });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// Post Request that will handle modifications on a function
router.put("/edit/:id", authenticateJWT, isAdmin, async (req, res) => {
  const input = req.body; // Assuming the input is sent as { "input": "some input value" }
  const functionId = req.params.id;

  try {
    if (!(await Function.findById(functionId))) {
      res.status(404).send("Function doesn't exist");
    } else {
      try {
        await Function.findOneAndUpdate({ _id: functionId }, { input }).then(
          res.send(input)
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST route to handle the request
router.post("/:id", authenticateJWT, isAdmin, async (req, res) => {
  try {
    const input = req.body.input; // Assuming the input is sent as { "input": "some input value" }
    const functionId = req.params.id;
    // Retrieve the function string from the MongoDB collection
    const functionString = await Function.findOne({ _id: functionId }).select(
      "functionString"
    );

    // Evaluate the function with the input
    const convertedValue = eval(
      `(${functionString.functionString})('${input}')`
    );

    // Return the converted value as the response
    res.json({ convertedValue });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Delete request the deletes a fn by it's param id
router.delete("/delete/:id", authenticateJWT, isAdmin, async (req, res) => {
  const functionId = req.params.id;
  // finding the fn and deleting
  try {
    if (!Function.findById(functionId)) {
      res.status(401).send("Function unexistant");
    } else {
      await Function.findByIdAndRemove(functionId).then(
        res.send("Function deleted successfully")
      );
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
