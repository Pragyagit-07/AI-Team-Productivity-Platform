const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require("../models/ActivityLog");
const ProjectJoinRequest = require('../models/ProjectJoinRequest');


// GET ALL PROJECTS 
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
        //  Only projects where user is member
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

/*  CREATE PROJECT */

exports.createProject = async (req, res) => {
  try {
    // admin cannot create project
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

    // creator always member team lead
    await project.addMembers(userId);

  
    // INVITE MEMBERS  TO BECOME MEMBER OF PROJECT
if (Array.isArray(members) && members.length > 0) {
  for (const memberId of members) {
    await ProjectJoinRequest.findOrCreate({
      where: {
        projectId: project.id,
        userId: memberId,
        direction: "invite",
        status: "pending",
      },
    });
  }
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

/* GET PROJECT BY ID */

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
exports.getDiscoverProjects = async (req, res) => {
  const projects = await Project.findAll({
    where: {
      createdBy: { [require("sequelize").Op.ne]: req.user.id }
    },
    include: [
      { model: User, as: "creator", attributes: ["id", "name"] },
      { model: User, as: "members", attributes: ["id"] }
    ]
  });

  const requests = await require("../models/ProjectJoinRequest").findAll({
    where: { userId: req.user.id }
  });

  const result = projects.map(p => ({
    ...p.toJSON(),
    isMember: p.members.some(m => m.id === req.user.id),
    hasRequested: requests.some(r => r.projectId === p.id && r.status === "pending")
  }));

  res.json(result);
};

exports.getProjectMembers = async (req, res) => {
try{
         const onlineUsers = req.app.get("onlineUsers");

     const project = await Project.findByPk(req.params.projectId, {
     include: [
            { model: User,  as: 'members', attributes: ['id', 'name', 'avatar'], through: { attributes: [] } }
     ]
    });
        if (!project) return res.status(404).json({ msg: 'Project not found' });
                    

        // 
            const members = project.members.map(m => ({
              id: m.id,
              name: m.name,
              
                    online: onlineUsers?.has(m.id) || false

            }));
    res.json(members);

  } catch(err) {
        res.status(500).json({ msg: 'Server error' });
  }
};
/* UPDATE PROJECT*/

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

/* DELETE PROJECT*/

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


