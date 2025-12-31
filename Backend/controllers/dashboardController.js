// const Project = require("../models/Project");
// const Task = require("../models/Task");
// const User = require("../models/User");
// const sequelize = require("../db");

// exports.getDashboardStats = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // projects user is part of
//     const projects = await Project.findAll({
//       include: [
//         {
//           model: User,
//           as: "members",
//           attributes: [],
//           where: { id: userId },
//           through: { attributes: [] }
//         }
//       ]
//     });

//     const projectIds = projects.map(p => p.id);

//     if (!projectIds.length) {
//       return res.json({
//         projectsCount: 0,
//         membersCount: 0,
//         tasks: { pending: 0, inprogress: 0, completed: 0 }
//       });
//     }

//     // task status count
//     const taskStats = await Task.findAll({
//       attributes: [
//         "status",
//         [sequelize.fn("COUNT", sequelize.col("id")), "count"]
//       ],
//       where: { projectId: projectIds },
//       group: ["status"]
//     });

//     const tasks = { pending: 0, inprogress: 0, completed: 0 };

// taskStats.forEach(t => {
//   const status = t.status;
//   const count = Number(t.get("count"));

//   if (status === "todo") tasks.pending += count;
//   else if (status === "inprogress") tasks.inprogress += count;
//   else if (status === "done") tasks.completed += count;
//   else if (tasks[status] !== undefined) tasks[status] += count;
// });


//     // unique members count (excluding self optional)
//     const membersCount = await sequelize.query(
//       `
//       SELECT COUNT(DISTINCT userId) as count
//       FROM ProjectMembers
//       WHERE projectId IN (:projectIds)
//       `,
//       {
//         replacements: { projectIds },
//         type: sequelize.QueryTypes.SELECT
//       }
//     );

//     res.json({
//       projectsCount: projects.length,
//       membersCount: membersCount[0].count,
//       tasks
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Dashboard error" });
//   }
// };



const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");
const sequelize = require("../db");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Projects where user is a member
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: "members",
          attributes: [],
          where: { id: userId },
          through: { attributes: [] }
        }
      ]
    });

    const projectIds = projects.map(p => p.id);

    if (!projectIds.length) {
      return res.json({
        projectsCount: 0,
        membersCount: 0,
        tasks: {
          todo: 0,
          inprogress: 0,
          done: 0
        }
      });
    }

    // 2️⃣ Task stats ONLY for those projects
    const taskStats = await Task.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"]
      ],
      where: {
        projectId: projectIds
      },
      group: ["status"]
    });

    const tasks = {
      todo: 0,
      inprogress: 0,
      done: 0
    };

    taskStats.forEach(t => {
      tasks[t.status] = Number(t.get("count"));
    });

    // 3️⃣ Unique members count (excluding logged-in user)
    const membersCount = await sequelize.query(
      `
      SELECT COUNT(DISTINCT userId) as count
      FROM ProjectMembers
      WHERE projectId IN (:projectIds)
      AND userId != :userId
      `,
      {
        replacements: { projectIds, userId },
        type: sequelize.QueryTypes.SELECT
      }
    );

    res.json({
      projectsCount: projects.length,
      membersCount: membersCount[0].count,
      tasks
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ msg: "Dashboard error" });
  }
};
