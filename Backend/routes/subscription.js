const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const subscriptionController = require("../controllers/subscriptionController");

router.use(auth); // protect all routes
router.post("/create-order", subscriptionController.createOrder); // create Razorpay order
router.post("/verify", subscriptionController.verifyPayment); // verify payment
router.get("/my", subscriptionController.getUserSubscriptions); // get history

module.exports = router;
