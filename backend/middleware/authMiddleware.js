const jwt = require("jsonwebtoken");

// ==========================
// AUTH MIDDLEWARE
// Phase 25 - strips Bearer prefix
// Phase 29 - production security
// ==========================
module.exports = async (req, res, next) => {

  try {

    const authHeader = req.header("Authorization");

    // ==========================
    // CHECK TOKEN EXISTS
    // ==========================
    if (!authHeader) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    // ==========================
    // STRIP BEARER PREFIX
    // ==========================
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    // ==========================
    // VERIFY TOKEN
    // ==========================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    console.log("AUTH MIDDLEWARE ERROR:", error.message);

    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};