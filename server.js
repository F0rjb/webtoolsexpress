const express = require("express");
const mongoose = require("mongoose");
const app = express();

var morgan = require("morgan");

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://admin:secret@localhost:27017/webtools", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin", // Specify the authentication database
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.urlencoded({ extended: false }));
// Set up your Express middleware and routes here

const port = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");

// Use the auth routes
app.use("/api/auth", authRoutes);

// Add more routes as needed

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
