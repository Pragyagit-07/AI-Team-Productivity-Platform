// const router = require('express').Router();
// const activityController = require('../controllers/activityController');

// router.get('/project/:projectId', activityController.getActivityByProject);

// module.exports = router;


const router = require('express').Router();
const activityController = require('../controllers/activityController');

// Create new activity log
router.post('/', activityController.createActivity);

// Get activity logs by project
router.get('/project/:projectId', activityController.getActivityByProject);

// Get activity logs by task
router.get('/task/:taskId', activityController.getActivityByTask);

module.exports = router;
