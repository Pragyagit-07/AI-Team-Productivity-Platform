const express = require("express");
const router = express.Router();
const { taskAIHelper, chatAIHelper } = require("../controllers/aiAssistantController");
const auth = require("../middleware/authMiddleware");

router.post("/task", auth, taskAIHelper);
router.post("/chat", auth, chatAIHelper); 


module.exports = router;
