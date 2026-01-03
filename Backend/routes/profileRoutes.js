const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  getProfile,
  updateProfile,
  updateAvatar,
} = require("../controllers/profileController");


router.get("/me", auth, getProfile);
router.put("/update", auth, updateProfile);
router.put("/avatar", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
