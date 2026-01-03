const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, preferences } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name) user.name = name;
    if (preferences) user.preferences = preferences;

    await user.save();

    res.json({ msg: "Profile updated", user });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE AVATAR 
exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.avatar = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      msg: "Avatar updated successfully",
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Avatar update error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
