const express = require("express");
const router = express.Router();
const { taskAIHelper } = require("../controllers/aiAssistantController");
const auth = require("../middleware/authMiddleware");

router.post("/task", auth, taskAIHelper);

module.exports = router;
