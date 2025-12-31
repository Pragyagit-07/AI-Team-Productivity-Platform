const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

router.get("/", authMiddleware, dashboardController.getDashboardStats);

module.exports = router;
