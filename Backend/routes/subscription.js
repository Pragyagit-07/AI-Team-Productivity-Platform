const router = require('express').Router();
const subscriptionController = require('../controllers/subscriptionController');

// Get subscriptions for a user
router.get('/user/:userId', subscriptionController.getUserSubscriptions);

// Create subscription
router.post('/', subscriptionController.createSubscription);

// Update subscription
router.put('/:id', subscriptionController.updateSubscription);

// Delete subscription
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
