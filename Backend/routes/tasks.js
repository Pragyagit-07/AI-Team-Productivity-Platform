const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.get('/project/:projectId', taskController.getTasksByProject);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
