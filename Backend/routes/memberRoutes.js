const router = require("express").Router();
const { getMembers } = require("../controllers/memberController");

router.get("/", getMembers);

module.exports = router;
