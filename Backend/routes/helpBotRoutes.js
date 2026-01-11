const express = require("express");
const router = express.Router();
const { chatWithBot } = require("../controllers/helpBotController");

router.post("/chat", chatWithBot);

module.exports = router;
