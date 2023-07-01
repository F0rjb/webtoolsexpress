const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

// Authentication logic for private routes
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      console.log(error);
      return res.status(403).send("Forbidden: Invalid token");
    }

    req.user = decodedToken;
    next();
  });
};

// Admin Authorization for protected routes
const isAdmin = async (req, res, next) => {
  const userId = req.user.id;

  try {
    if (!userId) {
      return res.status(401).send("Unauthorized: No user ID provided");
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.role === "admin") {
      console.log("Authorized");
      req.userId = userId;
      next();
    } else {
      console.log("Unauthorized");
      return res.status(401).send("Unauthorized: Admin access required");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { authenticateJWT, isAdmin };
