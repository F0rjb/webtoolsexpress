const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
// Authentication logic for private routes
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) res.status(401).send("unauthenticated");
  jwt.verify(token, "your-secret-key", (error, userId) => {
    console.log(error);
    if (error) return res.status(403);
    req.user = userId;
    next();
  });
};
//Admin Authorization for protected routes
const isAdmin = async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);

  try {
    if (!userId) {
      return res.status(401).send("Unauthorized");
    }

    const user = await Users.findById(userId);
    if (user.role === "admin") {
      console.log("Authorized");
      next();
    } else {
      console.log("Unauthorized");
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).send("Unauthorized");
  }
};

module.exports = { authenticateJWT, isAdmin };
