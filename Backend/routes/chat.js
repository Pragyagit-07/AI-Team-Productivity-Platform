const router = require('express').Router();
const chatController = require('../controllers/chatController');
router.get('/user/:userId', chatController.getChatsByUser);

router.post('/', chatController.sendMessage);


module.exports = router;
