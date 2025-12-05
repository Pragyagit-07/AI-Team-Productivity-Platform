const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');
const Task = require('../models/Task');

exports.createActivity = async (req, res) => {
  try {
    const { action, userId, projectId, taskId } = req.body;

    if (!action || !userId || !projectId)
      return res.status(400).json({ msg: 'action, userId, and projectId are required' });

    const activity = await ActivityLog.create({ action, userId, projectId, taskId });
    res.status(201).json(activity);
  } catch (err) {
    console.error("CREATE ACTIVITY ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getActivityByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const activities = await ActivityLog.findAll({
      where: { projectId },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Task, attributes: ['id', 'title'] }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.json(activities);
  } catch (err) {
    console.error("GET ACTIVITY BY PROJECT ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getActivityByTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const activities = await ActivityLog.findAll({
      where: { taskId },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Task, attributes: ['id', 'title'] }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.json(activities);
  } catch (err) {
    console.error("GET ACTIVITY BY TASK ERROR:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};
