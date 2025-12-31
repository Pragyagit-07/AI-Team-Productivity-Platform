const Task = require("../models/Task");
const User = require("../models/User");
const Project = require("../models/Project");
const ActivityLog = require("../models/ActivityLog");
const Comment = require("../models/Comment");
const File = require("../models/File");
const { Op } = require("sequelize");
const sequelize = require("../db");



// GET TASKS BY PROJECT
{/*
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
*/}
exports.getTasksByProject = async (req, res) => {
  try {
    // projectPermission middleware already verified access
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


{/*
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
*/}
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
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

    // 🔑 get projects where user is member
    const [projects] = await sequelize.query(
      `SELECT projectId FROM projectmembers WHERE userId = :userId`,
      { replacements: { userId } }
    );

    const allowedProjectIds = projects.map(p => p.projectId);

    // ❌ user is in no project
    if (!allowedProjectIds.length) {
      return res.json({
        tasks: [],
        total: 0,
        page: Number(page),
        pageSize: Number(pageSize),
      });
    }

    const where = {
      projectId: allowedProjectIds
    };

    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) where.title = { [Op.like]: `%${search}%` };

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
{/*
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
*/}
exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assigneeId, status, priority, dueDate } = req.body;

    // 🔐 check project permission
    const project = await Project.findByPk(projectId, {
      include: [{ model: User, as: "members", attributes: ["id"] }]
    });

    if (!project) return res.status(404).json({ msg: "Project not found" });

    const isAllowed =
      project.createdBy === req.user.id ||
      project.members.some(m => m.id === req.user.id);

    if (!isAllowed) {
      return res.status(403).json({ msg: "Not allowed to create task in this project" });
    }

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
{/*
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
*/}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const project = await Project.findByPk(task.projectId);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    // Only team lead or assignee can update
    if (project.createdBy !== req.user.id && task.assigneeId !== req.user.id) {
      return res.status(403).json({
        msg: "Only the team lead or assigned member can update this task"
      });
    }

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
          attributes: ["id", "name", "status", "description", "startDate", "endDate" ],
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

        
        {
          model: Comment,
          as: "comments",
          include: [{ model: User, attributes: ["id", "name"] }]
        },

        
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




 // DELETE TASK

{/*
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    // 1 delete ALL task-dependent records
    await ActivityLog.destroy({ where: { taskId: task.id } });
    await Comment.destroy({ where: { taskId: task.id } });
    await File.destroy({ where: { taskId: task.id } });

    // 2 delete task
    await task.destroy();

    // 3 log deletion WITHOUT taskId (project-level log)
    await ActivityLog.create({
      action: "task_deleted",
      description: `${req.user.name} deleted a task`,
      projectId: task.projectId,
      userId: req.user.id,
      taskId: null
    });

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
*/}
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const project = await Project.findByPk(task.projectId);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    // Only team lead can delete
    if (project.createdBy !== req.user.id) {
      return res.status(403).json({
        msg: "Only the team lead can delete this task"
      });
    }

    // delete dependent records
    await ActivityLog.destroy({ where: { taskId: task.id } });
    await Comment.destroy({ where: { taskId: task.id } });
    await File.destroy({ where: { taskId: task.id } });

    await task.destroy();

    await ActivityLog.create({
      action: "task_deleted",
      description: `${req.user.name} deleted task "${task.title}"`,
      projectId: task.projectId,
      userId: req.user.id,
      taskId: null
    });

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
