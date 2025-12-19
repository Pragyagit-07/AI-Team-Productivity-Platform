const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');

exports.getTaskActivities = async (req, res) => {
  try {
    const { taskId } = req.params;

    const activities = await ActivityLog.findAll({
      where: { taskId },
      include: [{ model: User, attributes: ['name'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch activities' });
  }
};
