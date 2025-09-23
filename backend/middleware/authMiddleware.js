const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Get token from header
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "⛔ No token provided" });
  }

  try {
    const secret = process.env.JWT_SECRET || "your_secret_key";
    const decoded = jwt.verify(token, secret); // ✅ verify token
    req.user = decoded; // attach user data (id, email, etc.) to request
    next(); // move to next middleware or controller
  } catch (err) {
    return res.status(403).json({ message: "⛔ Invalid or expired token" });
  }
};

module.exports = authMiddleware;
