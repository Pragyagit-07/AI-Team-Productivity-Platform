// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer '))
//       return res.status(401).json({ msg: 'No token provided' });

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// console.log("JWT USER ID:", decoded.id);

//     const user = await User.findByPk(decoded.id);
//     if (!user) return res.status(401).json({ msg: 'User not found' });

//     req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    // 🔑 Decode token (contains id + role)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};
