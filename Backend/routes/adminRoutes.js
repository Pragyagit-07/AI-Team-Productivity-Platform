const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const { getAllUsers } = require("../controllers/adminController");

router.get("/users", authMiddleware, adminOnly, getAllUsers);

module.exports = router;
