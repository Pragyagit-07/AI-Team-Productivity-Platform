const router = require('express').Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware'); 


router.get('/with-tasks', authMiddleware, projectController.getProjectsWithTasks);

router.get('/:projectId/members', authMiddleware, projectController.getProjectMembers);
router.get('/', authMiddleware, projectController.getAllProjects);
router.post('/', authMiddleware, projectController.createProject);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
