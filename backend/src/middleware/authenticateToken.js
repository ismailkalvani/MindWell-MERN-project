const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.header("x-auth-token"); // Changed to get token from the correct header

  // Check if token is provided
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = decoded.user;  // Attach user info to request
    console.log("Decoded user:", req.user);  //  to verify the user info
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = authenticateToken;
