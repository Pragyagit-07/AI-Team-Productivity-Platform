// const Subscription = require('../models/Subscription');

// exports.getUserSubscriptions = async (req, res) => {
//   try {
//     const subs = await Subscription.findAll({ where: { userId: req.params.userId } });
//     res.json(subs);
//   } catch (err) {
//     console.error("GET SUBSCRIPTIONS ERROR:", err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.createSubscription = async (req, res) => {
//   try {
//     const { userId, plan, status, expiryDate } = req.body;
//     if (!userId || !plan || !status) return res.status(400).json({ msg: 'userId, plan, and status are required' });

//     const sub = await Subscription.create({ userId, plan, status, expiryDate });
//     res.status(201).json(sub);
//   } catch (err) {
//     console.error("CREATE SUBSCRIPTION ERROR:", err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.updateSubscription = async (req, res) => {
//   try {
//     const sub = await Subscription.findByPk(req.params.id);
//     if (!sub) return res.status(404).json({ msg: 'Subscription not found' });

//     await sub.update(req.body);
//     res.json(sub);
//   } catch (err) {
//     console.error("UPDATE SUBSCRIPTION ERROR:", err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.deleteSubscription = async (req, res) => {
//   try {
//     const sub = await Subscription.findByPk(req.params.id);
//     if (!sub) return res.status(404).json({ msg: 'Subscription not found' });

//     await sub.destroy();
//     res.json({ msg: 'Subscription deleted' });
//   } catch (err) {
//     console.error("DELETE SUBSCRIPTION ERROR:", err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };



const Razorpay = require("razorpay"); // import Razorpay SDK
const crypto = require("crypto"); // for verifying signature
const Subscription = require('../models/Subscription'); // subscription table
const User = require('../models/User'); // user table

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Razorpay public key
  key_secret: process.env.RAZORPAY_SECRET, // Razorpay secret key, backend only
});

exports.createOrder = async (req, res) => {
  const { planId } = req.body; // frontend sends planId
  const plans = { pro: 100, team: 149900 }; // prices in paise

  const order = await razorpay.orders.create({
    amount: plans[planId], // required by Razorpay, paise
    currency: "INR",
    receipt: `receipt_${req.user.id}_${Date.now()}`, // unique receipt
  });

  res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
};
exports.getUserSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.findAll({ where: { userId: req.params.userId } });
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
