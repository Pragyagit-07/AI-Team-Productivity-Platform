const router = require('express').Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

// Get subscriptions for a user
router.get('/user/:userId', authMiddleware, subscriptionController.getUserSubscriptions);

// Create subscription
router.post('/', authMiddleware, subscriptionController.createSubscription);

// Update subscription
router.put('/:id', authMiddleware, subscriptionController.updateSubscription);

// Delete subscription
router.delete('/:id', authMiddleware, subscriptionController.deleteSubscription);

module.exports = router;
