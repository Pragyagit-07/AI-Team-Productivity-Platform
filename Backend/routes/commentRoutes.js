const router = require('express').Router();
const { createComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createComment);

module.exports = router;
