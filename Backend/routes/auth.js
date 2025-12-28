
const router = require("express").Router();
// const { register, login } = require("../controllers/authController");
const authController = require("../controllers/authController");



// router.post("/register", register);
// router.post("/login", login);
router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/verify-email", authController.verifyEmail);

module.exports = router;
