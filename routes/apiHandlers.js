const express = require("express");
const router = express.Router();
// Dummy function as a string - hexToBinary
const functionString = `
  function hexToBinary(hex) {
    return parseInt(hex, 16).toString(2);
  }
`;

// POST route to handle the request
router.post("/convert", async (req, res) => {
  try {
    const input = req.body.input; // Assuming the input is sent as { "input": "some input value" }

    // Evaluate the function with the input
    const convertedValue = eval(`(${functionString})('${input}')`);

    // Return the converted value as the response
    res.json({ convertedValue });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
