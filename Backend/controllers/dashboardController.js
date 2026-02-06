const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");
const sequelize = require("../db");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.findAll({
      attributes: ["id", "name", "createdBy"],
      include: [
        {
          model: User,
          as: "members",
          attributes: ["id", "name", "email", "avatar"],
          through: { attributes: [] },
        },
        { model: Task, as: "tasks" },
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email", "avatar"],
        },
      ],
    });

    const projectIds = projects.map(p => p.id);

    if (!projectIds.length) {
      return res.json({
        projectsCount: 0,
        membersCount: 0,
        tasks: { todo: 0, inprogress: 0, done: 0 },
        projects: [],
      });
    }

    const taskStats = await Task.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where: { projectId: projectIds },
      group: ["status"],
    });

    const tasks = { todo: 0, inprogress: 0, done: 0 };
    taskStats.forEach(t => {
      tasks[t.status] = Number(t.get("count"));
    });

    const membersCount = await sequelize.query(
      `
      SELECT COUNT(DISTINCT userId) as count
      FROM ProjectMembers
      WHERE projectId IN (:projectIds)
      AND userId != :userId
      `,
      {
        replacements: { projectIds, userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const projectMeta = projects.map(p => ({
      id: p.id,
      name: p.name,
      isTeamLead: p.createdBy === userId,
      teamLead: {
        id: p.creator.id,
        name: p.creator.name,
        avatar: p.creator.avatar,
      },
      members: p.members.map(m => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar || null, 
      })),
      tasksCount: p.tasks.length,
      pendingTasks: p.tasks.filter(t => t.status === "todo").length,
      inProgressTasks: p.tasks.filter(t => t.status === "inprogress").length,
      completedTasks: p.tasks.filter(t => t.status === "done").length,
    }));

    res.json({
      projectsCount: projects.length,
      membersCount: membersCount[0].count,
      tasks,
      projects: projectMeta,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ msg: "Dashboard error" });
  }
};
