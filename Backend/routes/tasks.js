const router = require("express").Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

//  All task routes protected
router.get("/", authMiddleware, taskController.getAllTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.get("/project/:projectId", authMiddleware, taskController.getTasksByProject);
router.post("/", authMiddleware, taskController.createTask);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
