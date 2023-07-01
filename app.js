const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
console.log(process.env.PORT);

// Connect to MongoDB using Mongoose
mongoose
  .connect(
    process.env.DBSTRING || "mongodb://admin:secret@localhost:27017/webtools",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin", // Specify the authentication database
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.urlencoded({ extended: false }));
// Set up your Express middleware and routes here

const authRoutes = require("./routes/auth");

// Use the auth routes
app.use("/api/auth", authRoutes);
// Handler Route

const handlerRouter = require("./routes/apiHandlers");
app.use("/api/", handlerRouter);
//Bulk Add of fn
// require("./BulkInjection");

module.exports = app;
