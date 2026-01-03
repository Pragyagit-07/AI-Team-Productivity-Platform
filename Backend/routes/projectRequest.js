const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const ctrl = require("../controllers/projectRequestController");

router.post("/", authMiddleware, ctrl.sendRequest);
router.post("/invite", authMiddleware, ctrl.inviteMember);
router.get("/my-invitations", authMiddleware, ctrl.getMyInvitations);
router.get("/my", authMiddleware, ctrl.getMyRequests);
router.get("/:projectId", authMiddleware, ctrl.getProjectRequests);
router.put("/:requestId", authMiddleware, ctrl.updateRequest);

module.exports = router;
