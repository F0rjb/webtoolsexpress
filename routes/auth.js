const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/Users");

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, "your-secret-key");

    res
      .status(201)
      .json({ token: token, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(404).json({ message: "Internal server error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "your-secret-key");
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/admin/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, "your-secret-key");

    res
      .status(201)
      .json({ token: token, message: role + " registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(404).json({ message: "Internal server error" });
  }
});

// Protected route example
router.get(
  "/protected",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    res.json({ message: "Protected route accessed successfully" });
  }
);

module.exports = router;
