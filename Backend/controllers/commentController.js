const Comment = require('../models/Comment');
const ActivityLog = require('../models/ActivityLog');
const Task = require('../models/Task');

exports.createComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;
    const comment = await Comment.create({
      text,
      taskId,
      userId: req.user.id
    });

    const task = await Task.findByPk(taskId);

    await ActivityLog.create({
      action: 'comment_added',
       description: `${req.user.name} added a comment`,
      taskId,
      projectId: task.projectId,
      userId: req.user.id
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};
