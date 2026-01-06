const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    //  Decode token (contains id + role)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("TOKEN RECEIVED:", token);

  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};
