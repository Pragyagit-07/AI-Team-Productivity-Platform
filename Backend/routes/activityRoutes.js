const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTaskActivities } = require('../controllers/activityController');
const { getAllActivities } = require('../controllers/activityController');

router.get('/', authMiddleware, getAllActivities);
router.get('/:taskId', authMiddleware, getTaskActivities);

module.exports = router;

