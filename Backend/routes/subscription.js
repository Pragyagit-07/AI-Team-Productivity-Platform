// const router = require('express').Router();
// const subscriptionController = require('../controllers/subscriptionController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Get subscriptions for a user
// router.get('/user/:userId', authMiddleware, subscriptionController.getUserSubscriptions);

// // Create subscription
// router.post('/', authMiddleware, subscriptionController.createSubscription);

// // Update subscription
// router.put('/:id', authMiddleware, subscriptionController.updateSubscription);

// // Delete subscription
// router.delete('/:id', authMiddleware, subscriptionController.deleteSubscription);

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const subscriptionController = require("../controllers/subscriptionController");

router.use(auth); // protect all routes

router.post("/create-order", subscriptionController.createOrder); // create Razorpay order
router.post("/verify", subscriptionController.verifyPayment); // verify payment
router.get("/my", subscriptionController.getUserSubscriptions); // get history

module.exports = router;
