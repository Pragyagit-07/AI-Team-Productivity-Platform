// const Project = require('../models/Project');
// const User = require('../models/User');
// const Task = require('../models/Task');
// const ActivityLog = require("../models/ActivityLog");


// // ---------- GET ALL PROJECTS ----------

// exports.getAllProjects = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 5;
//     const offset = (page - 1) * pageSize;
//     const { count, rows } = await Project.findAndCountAll({
//       limit: pageSize,
//       offset,
//       order: [['createdAt', 'DESC']],
//       include: [
//         { model: User, as: 'creator', attributes: ['id', 'name'] },
//         { model: User, as: 'members', attributes: ['id', 'name'], through: { attributes: [] } }
//       ],
//       distinct: true 
//     });

//     res.json({
//       projects: rows,
//       total: count,
//       page,
//       pageSize
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// // ---------- CREATE PROJECT ----------
// exports.createProject = async (req, res) => {
//   try {
//     const userId = req.user.id; 
//     const { name, description, status, startDate, endDate , members} = req.body;

//     // Validate status
//     const allowedStatus = ['planned', 'inprogress', 'completed', 'onhold', 'cancelled'];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ msg: 'Invalid status value' });
//     }

//     const project = await Project.create({
//       name,
//       description,
//       status: status || 'planned',
//       startDate,
//       endDate,
//       createdBy: req.user.id
//     });
//     console.log("REQ USER:", req.user);

// // Add members (array of userIds)
//     if (members && members.length > 0) {
//       await project.addMembers(members);
//     }

//     // Add creator also as member automatically
//     await project.addMembers(userId);
//     await ActivityLog.create({
//     action: "project_created",
//     description: `${req.user.name} created project "${project.name}"`,
//     projectId: project.id,
//     userId: req.user.id
//   });
//     res.json(project);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// // ---------- GET ONE PROJECT ----------

// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.id, {
//       include: [
//         { model: User, as: 'creator', attributes: ['id', 'name'] }, // creator
//         { model: User, as: 'members', attributes: ['id', 'name'], through: { attributes: [] } }, // members
//         {
//           model: Task, as: 'tasks',
//           include: [
//             { model: User, attributes: ['id', 'name'], as: 'assignee' } // assignee
//           ]
//         }
//       ]
//     });

//     if (!project) return res.status(404).json({ msg: 'Project not found' });
//     const members = project.members.map(u => ({ id: u.id, name: u.name }));

//     // Transform response for cleaner keys
//     const response = {
//       id: project.id,
//       name: project.name,
//       description: project.description,
//       status: project.status,
//       startDate: project.startDate,
//       endDate: project.endDate,
//       creator: project.creator,
//       members,
//       tasks: project.tasks 
//     };

//     res.json(response);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// exports.updateProject = async (req, res) => {
//   try {
//     const { name, description, status, startDate, endDate, members } = req.body;

//     const project = await Project.findByPk(req.params.id);
//     if (!project) return res.status(404).json({ msg: 'Project not found' });

//     if (project.createdBy !== req.user.id) {
//       return res.status(403).json({ msg: 'You are not allowed to update this project' });
//     }

//     const allowedStatus = ['planned', 'inprogress', 'completed', 'onhold', 'cancelled'];
//     if (status && !allowedStatus.includes(status)) {
//       return res.status(400).json({ msg: 'Invalid status value' });
//     }

//     // Update project fields
//     await project.update({ name, description, status, startDate, endDate });
//     await ActivityLog.create({
//   action: "project_updated",
//   description: `${req.user.name} updated project "${project.name}"`,
//   projectId: project.id,
//   userId: req.user.id
    

// });


//     if (members !== undefined) {
//       const memberIds = Array.isArray(members) ? members : [members];
//       const finalMembers = [...new Set([...memberIds, req.user.id])];

//       await project.setMembers(finalMembers);
//     }

//     const updatedProject = await Project.findByPk(project.id, {
//       include: [
//         { model: User, as: 'creator', attributes: ['id', 'name'] },
//         { model: User, as: 'members', attributes: ['id', 'name'], through: { attributes: [] } }
//       ]
//     });

//     res.json(updatedProject);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


// exports.getProjectMembers = async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.projectId, {
//       include: [
//         { model: User,  as: 'members', attributes: ['id', 'name'], through: { attributes: [] } }
//       ]
//     });

//     if (!project) return res.status(404).json({ msg: 'Project not found' });

//     res.json(project.members);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


// exports.getProjectsWithTasks = async (req, res) => {
//   try {
//     const projects = await Project.findAll({
//       include: [
//         {
//           model: Task,
//           as: "tasks",
//           attributes: ["id", "status", "dueDate"],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     res.json(projects);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ---------- DELETE PROJECT ----------
// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.id);
//     if (!project) return res.status(404).json({ msg: 'Project not found' });

//     // Only creator can delete
//     if (project.createdBy !== req.user.id) {
//       return res.status(403).json({ msg: 'You are not allowed to delete this project' });
//     }
//   await ActivityLog.create({
//   action: "project_deleted",
//   description: `${req.user.name} deleted project "${project.name}"`,
//   projectId: project.id,
//   userId: req.user.id
// });

//     await project.destroy();
//     res.json({ msg: 'Project deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };


const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require("../models/ActivityLog");





/* ============================
   GET ALL PROJECTS (FIXED)
   ============================ */

exports.getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Project.findAndCountAll({
      limit: pageSize,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        // 🔐 Only projects where user is member
        {
          model: User,
          as: 'members',
          attributes: [],
          where: { id: req.user.id },
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        },
        {
          model: Task,
          as: 'tasks'
        }
      ],
      distinct: true
    });

    res.json({
      projects: rows,
      total: count,
      page,
      pageSize
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/* ============================
   CREATE PROJECT
   ============================ */

exports.createProject = async (req, res) => {
  try {
    // ❌ admin cannot create project
    if (req.user.role === 'admin') {
      return res.status(403).json({ msg: "Admin cannot create projects" });
    }

    const userId = req.user.id;
    const { name, description, status, startDate, endDate, members } = req.body;

    const allowedStatus = ['planned', 'inprogress', 'completed', 'onhold', 'cancelled'];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    const project = await Project.create({
      name,
      description,
      status: status || 'planned',
      startDate,
      endDate,
      createdBy: userId
    });

    // creator always member (team lead)
    await project.addMembers(userId);

    // add selected members
    if (Array.isArray(members) && members.length > 0) {
      await project.addMembers(members);
    }

    await ActivityLog.create({
      action: "project_created",
      description: `${req.user.name} created project "${project.name}"`,
      projectId: project.id,
      userId
    });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/* ============================
   GET PROJECT BY ID
   ============================ */

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: User, as: 'creator', attributes: ['id', 'name'] },
        { model: User, as: 'members', attributes: ['id', 'name'], through: { attributes: [] } },
        {
          model: Task,
          as: 'tasks',
          include: [{ model: User, as: 'assignee', attributes: ['id', 'name'] }]
        }
      ]
    });

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.getProjectMembers = async (req, res) => {
try{
     const project = await Project.findByPk(req.params.projectId, {
     include: [
            { model: User,  as: 'members', attributes: ['id', 'name'], through: { attributes: [] } }
     ]
    });
        if (!project) return res.status(404).json({ msg: 'Project not found' });
            res.json(project.members);
  } catch(err) {
        res.status(500).json({ msg: 'Server error' });
  }
};
/* ============================
   UPDATE PROJECT
   ============================ */

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // only team lead
    if (project.createdBy !== req.user.id) {
      return res.status(403).json({ msg: 'Only team lead can update project' });
    }

    await project.update(req.body);

    await ActivityLog.create({
      action: "project_updated",
      description: `${req.user.name} updated project "${project.name}"`,
      projectId: project.id,
      userId: req.user.id
    });

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/* ============================
   DELETE PROJECT
   ============================ */

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (project.createdBy !== req.user.id) {
      return res.status(403).json({ msg: 'Only team lead can delete project' });
    }

    await project.destroy();

    res.json({ msg: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

/* ============================
   ❌ DO NOT USE (SECURITY RISK)
   ============================ */

exports.getProjectsWithTasks = async () => {
  throw new Error("Do not use this API — permission unsafe");
};
