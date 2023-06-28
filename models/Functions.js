const mongoose = require("mongoose");

// Define the Function schema
const functionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kind: { type: String, required: true }, // Type of the function (e.g., "converter", "manipulator")
  inputType: { type: String, required: true }, // Type of the input (e.g., "string", "file")
  outputType: { type: String, required: true }, // Type of the output (e.g., "string", "file")
  functionString: { type: String, required: true }, // The function as a string
});

// Create the Function model
const Function = mongoose.model("Function", functionSchema);

module.exports = Function;