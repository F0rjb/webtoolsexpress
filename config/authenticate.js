const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.status(401).send("Unautherized");
  jwt.verify(token, "your-secret-key", (error, user) => {
    console.log(error);
    if (error) return res.status(403);
    req.userId = userId;
    next();
  });
};
module.exports = authenticateJWT;
