const User = require("../models/User");

exports.getMembers = async (req, res) => {
  try {
    const members = await User.findAll({
      where: { role: "member" },   
      attributes: ["id", "name"], 
    });

    res.json(members);
  } catch (err) {
    console.error(" getMembers error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
