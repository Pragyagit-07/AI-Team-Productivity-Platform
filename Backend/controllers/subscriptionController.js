const Subscription = require('../models/Subscription');

exports.getUserSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.findAll({ where: { userId: req.params.userId } });
    res.json(subs);
  } catch (err) {
    console.error("GET SUBSCRIPTIONS ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { userId, plan, status, expiryDate } = req.body;
    if (!userId || !plan || !status) return res.status(400).json({ msg: 'userId, plan, and status are required' });

    const sub = await Subscription.create({ userId, plan, status, expiryDate });
    res.status(201).json(sub);
  } catch (err) {
    console.error("CREATE SUBSCRIPTION ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ msg: 'Subscription not found' });

    await sub.update(req.body);
    res.json(sub);
  } catch (err) {
    console.error("UPDATE SUBSCRIPTION ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const sub = await Subscription.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ msg: 'Subscription not found' });

    await sub.destroy();
    res.json({ msg: 'Subscription deleted' });
  } catch (err) {
    console.error("DELETE SUBSCRIPTION ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};
