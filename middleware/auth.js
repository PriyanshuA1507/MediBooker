// Authentication Middleware
// Developed by Priyanshu for MediBooker

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided. Access denied." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.locals = decoded.userId; // attach userId for downstream access
    next();
  } catch (error) {
    console.error("❌ Authentication failed:", error.message);
    return res.status(401).json({ message: "Authentication failed." });
  }
};

module.exports = authMiddleware;
