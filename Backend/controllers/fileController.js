const File = require('../models/File');
const ActivityLog = require('../models/ActivityLog');
const Task = require('../models/Task');

exports.uploadFile = async (req, res) => {
  try {
    const { taskId } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ msg: 'No file uploaded' });

    const savedFile = await File.create({
      name: file.originalname,
      path: `uploads/${file.filename}`,
      mimeType: file.mimetype,
      taskId,
      userId: req.user.id
    });

    const task = await Task.findByPk(taskId);

    await ActivityLog.create({
      action: 'file_uploaded',
      description: `${req.user.name} uploaded file ${file.originalname}`,
      taskId,
      projectId: task.projectId,
      userId: req.user.id
    });

    res.status(201).json(savedFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'File upload failed' });
  }
};
