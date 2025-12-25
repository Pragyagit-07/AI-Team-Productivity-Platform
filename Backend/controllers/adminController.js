const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
