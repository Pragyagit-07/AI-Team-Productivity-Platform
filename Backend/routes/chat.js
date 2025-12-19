const router = require('express').Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/user/:userId', authMiddleware, chatController.getChatsByUser);
router.post('/', authMiddleware, chatController.sendMessage);


module.exports = router;
