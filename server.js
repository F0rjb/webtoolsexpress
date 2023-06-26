const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost/webtools", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up your Express middleware and routes here

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
