const Razorpay = require("razorpay"); // import Razorpay SDK
const crypto = require("crypto"); // for verifying signature
const Subscription = require('../models/Subscription'); // subscription table
const User = require('../models/User'); // user table

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Razorpay public key
  key_secret: process.env.RAZORPAY_SECRET, // Razorpay secret key, 
});
exports.createOrder = async (req, res) => {
  try {
    const { planId } = req.body;

    const plans = {
      pro: 10000,
      team: 149900,
    };

    if (!plans[planId]) {
      return res.status(400).json({ msg: "Invalid plan selected" });
    }

    const order = await razorpay.orders.create({
      amount: plans[planId],
      currency: "INR",
      receipt: `receipt_${req.user.id}_${Date.now()}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("RAZORPAY ERROR:", err);
    res.status(500).json({ msg: "Order creation failed" });
  }
};

exports.getUserSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.findAll({ where: { userId: req.user.id } });
    res.json(subs);
  } catch (err) {
    console.error("GET SUBSCRIPTIONS ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature)
    return res.status(400).json({ msg: "Payment verification failed" });

  const user = await User.findByPk(req.user.id);
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30); // 30 days subscription

  user.subscriptionPlan = planId;
  user.subscriptionExpiry = expiryDate;
  await user.save();

  await Subscription.create({
    userId: user.id,
    plan: planId,
    status: "active",
    expiryDate,
  });

  res.json({ msg: "Payment verified and subscription updated", plan: planId });
};
