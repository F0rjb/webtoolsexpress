const Function = require("./models/Functions"); // Assuming the Function model is defined in a separate file

// Define the array of functions to insert
const functionsToInsert = [
  {
    name: "Hex to Binary Converter",
    kind: "converter",
    inputType: "string",
    outputType: "string",
    functionString: `
      function hexToBinary(hex) {
        return parseInt(hex, 16).toString(2);
      }
    `,
  },
  {
    name: "JSON to CSV Converter",
    kind: "converter",
    inputType: "json",
    outputType: "string",
    functionString: `
      function jsonToCsv(json) {
        const csv = Object.keys(json[0]).join(',') + '\\n';
        return csv + json.map(obj => Object.values(obj).join(',')).join('\\n');
      }
    `,
  },
  {
    name: "Image Resize Manipulator",
    kind: "manipulator",
    inputType: "file",
    outputType: "file",
    functionString: `
      function imageResize(image) {
        // Code to resize the image
        return resizedImage;
      }
    `,
  },
];

// Insert the functions in bulk
Function.insertMany(functionsToInsert)
  .then(() => {
    console.log("Functions inserted successfully.");
  })
  .catch((error) => {
    console.error("Error inserting functions:", error);
  });
