const router = require("express").Router();
const { getMembers } = require("../controllers/memberController");
const authMiddleware = require('../middleware/authMiddleware');


router.get("/", authMiddleware, getMembers);

module.exports = router;
