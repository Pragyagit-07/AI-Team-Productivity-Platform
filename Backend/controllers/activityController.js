const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');
const Task = require("../models/Task");
const Project = require("../models/Project");

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

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.findAll({
      include: [
               { model: User, attributes: ['id', 'name', 'avatar'] },
              { model: Task, attributes: ['id', 'title'] },

      ],
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch activities' });
  }
};
