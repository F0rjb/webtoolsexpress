// POST route to handle the request
const express = require("express");
const Function = require("../models/Functions");
const router = express.Router();

//Post REQUEST to handle Adding the api's
router.post("/add", async (req, res) => {
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
router.post("/edit/:id", async (req, res) => {
  try {
    const input = req.body.input; // Assuming the input is sent as { "input": "some input value" }
    const functionId = req.params.id;

    if (await Function.exists({ _id: functionId })) {
      await Function.findOneAndUpdate(
        { _id: functionId },
        { $set: { input: input } }
      );
      res.send(input);
    } else {
      res.status(404).send("Function doesn't exist");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// POST route to handle the request
router.post("/:id", async (req, res) => {
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

module.exports = router;

module.exports = router;
