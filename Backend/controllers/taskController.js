const Task = require("../models/Task");
const User = require("../models/User");
const Project = require("../models/Project");
const ActivityLog = require("../models/ActivityLog");
const Comment = require("../models/Comment");
const File = require("../models/File");

// GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { projectId: req.params.projectId },
      include: [
        { model: User, as: "assignee", attributes: ["id", "name"] }
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ALL TASKS (GLOBAL TASK TAB)
// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.findAll({
//       include: [
//         { model: User, as: "assignee", attributes: ["id", "name"] },
//         { model: Project, attributes: ["id", "name"] },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     res.json(tasks);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };
const { Op } = require("sequelize");

exports.getAllTasks = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 5,
      search = "",
      status,
      priority,
      projectId
    } = req.query;

    const limit = parseInt(pageSize);
    const offset = (page - 1) * limit;

    const where = {};

    // filters
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (priority) where.priority = priority;

    // search
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    const { rows, count } = await Task.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        { model: User, as: "assignee", attributes: ["id", "name"] },
        { model: Project, attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      tasks: rows,
      total: count,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assigneeId, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      projectId,
      assigneeId,
      status,
      priority,
      dueDate,
    });
await ActivityLog.create({
  action: "task_created",
  description: `${req.user.name} created task "${task.title}"`,
  taskId: task.id,
  projectId: task.projectId,
  userId: req.user.id
});

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    await task.update(req.body);
    await ActivityLog.create({
  action: "task_updated",
  description: `${req.user.name} updated task "${task.title}"`,
  taskId: task.id,
  projectId: task.projectId,
  userId: req.user.id
});

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
// GET SINGLE TASK (FOR EDIT / VIEW)


    
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: User, as: "assignee", attributes: ["id", "name"] },

        {
          model: Project,
          attributes: ["id", "name", "status"],
          include: [
            { model: User, as: "creator", attributes: ["id", "name"] },
            {
              model: User,
              as: "members",
              attributes: ["id", "name"],
              through: { attributes: [] }
            }
          ]
        },

        //  COMMENTS
        {
          model: Comment,
          as: "comments",
          include: [{ model: User, attributes: ["id", "name"] }]
        },

        //  FILES
        {
          model: File,
          as: "files",
          include: [{ model: User, attributes: ["id", "name"] }]
        },

        //  ACTIVITIES
        {
          model: ActivityLog,
            

          as: "activities",
          include: [{ model: User, attributes: ["id", "name"] }]
        }
      ],

      //  ORDER MUST BE HERE (TOP LEVEL)
      order: [
        [{ model: Comment, as: "comments" }, "createdAt", "ASC"],
        [{ model: File, as: "files" }, "createdAt", "DESC"],
        [{ model: ActivityLog, as: "activities" }, "createdAt", "DESC"]
      ]
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};




// // DELETE TASK


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    // 1️⃣ delete ALL task-dependent records
    await ActivityLog.destroy({ where: { taskId: task.id } });
    await Comment.destroy({ where: { taskId: task.id } });
    await File.destroy({ where: { taskId: task.id } });

    // 2️⃣ delete task
    await task.destroy();

    // 3️⃣ log deletion WITHOUT taskId (project-level log)
    await ActivityLog.create({
      action: "task_deleted",
      description: `${req.user.name} deleted a task`,
      projectId: task.projectId,
      userId: req.user.id,
      taskId: null // 👈 VERY IMPORTANT
    });

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
