const Project = require("../models/Project");
const ProjectJoinRequest = require("../models/ProjectJoinRequest");
const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

const sequelize = require("../db");



  //  SEND JOIN REQUEST
  
exports.sendRequest = async (req, res) => {
  const { projectId } = req.body;

  // already member?
  const project = await Project.findByPk(projectId, {
    include: [{ model: User, as: "members", attributes: ["id"] }]
  });

  if (!project) return res.status(404).json({ msg: "Project not found" });

  if (project.members.some(m => m.id === req.user.id)) {
    return res.status(400).json({ msg: "Already a member" });
  }

  const exists = await ProjectJoinRequest.findOne({
    where: { projectId, userId: req.user.id, status: "pending" }
  });

  if (exists) {
    return res.status(400).json({ msg: "Request already sent" });
  }

  await ProjectJoinRequest.create({
    projectId,
    userId: req.user.id,
    direction: "request",
  });

  res.json({ msg: "Join request sent" });
};


  //  GET REQUESTS (TEAM LEAD)
  
exports.getProjectRequests = async (req, res) => {
  const projectId = req.params.projectId;

  const project = await Project.findByPk(projectId);
  if (!project) return res.status(404).json({ msg: "Project not found" });

  if (project.createdBy !== req.user.id) {
    return res.status(403).json({ msg: "Only team lead can view requests" });
  }

  const requests = await ProjectJoinRequest.findAll({
    where: { projectId, status: "pending" },
    include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }]
  });

  res.json(requests);
};

exports.getMyRequests = async (req, res) => {
  const userId = req.user.id;

  const requests = await ProjectJoinRequest.findAll({
    where: { status: "pending" },
    include: [
      {
        model: Project,
        as: "project",
        where: { createdBy: userId },
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  res.json(requests);
};

exports.getIncomingRequests = async (req, res) => {
  try {
    const requests = await ProjectJoinRequest.findAll({
      include: [
        {
          model: Project,
          as: "project",
          where: { createdBy: req.user.id },
          attributes: ["id", "name"]
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name"]
        }
      ],
      where: { status: "pending" }
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.inviteMember = async (req, res) => {
  const { projectId, userId } = req.body;

  const project = await Project.findByPk(projectId);

  if (!project) {
    return res.status(404).json({ msg: "Project not found" });
  }

  // Only team lead can invite
  if (project.createdBy !== req.user.id) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  const exists = await ProjectJoinRequest.findOne({
    where: {
      projectId,
      userId,
      status: "pending",
      direction: "invite"
    }
  });

  if (exists) {
    return res.status(400).json({ msg: "Invitation already sent" });
  }

  await ProjectJoinRequest.create({
    projectId,
    userId,
    direction: "invite"
  });

  res.json({ msg: "Invitation sent" });
};
exports.getMyInvitations = async (req, res) => {
  const invitations = await ProjectJoinRequest.findAll({
    where: {
      userId: req.user.id,
      status: "pending",
      direction: "invite"
    },
    include: [
      {
        model: Project,
        as: "project",
        attributes: ["id", "name"]
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  res.json(invitations);
};


  //  ACCEPT / DECLINE
exports.updateRequest = async (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body; // accept | decline

  if (!["accept", "decline"].includes(action)) {
    return res.status(400).json({ msg: "Invalid action" });
  }

  const request = await ProjectJoinRequest.findByPk(requestId);
  if (!request) {
    return res.status(404).json({ msg: "Request not found" });
  }

  const project = await Project.findByPk(request.projectId);
  if (!project) {
    return res.status(404).json({ msg: "Project not found" });
  }
// team lead can accept join request and  invitation invited users
  if (
  (request.direction === "request" && project.createdBy !== req.user.id) ||
  (request.direction === "invite" && request.userId !== req.user.id)
) {
  return res.status(403).json({ msg: "Not allowed" });
}

{/*
  if (action === "accept") {
    request.status = "accepted";
    await request.save();  */}

    //  ADD USER TO PROJECT
    {/*
    await sequelize.models.ProjectMembers.findOrCreate({
      where: {
        projectId: request.projectId,
        userId: request.userId
      }
    });

    return res.json({ msg: "Request accepted" });
  }

  if (action === "decline") {
    request.status = "declined";
    await request.save();

    return res.json({ msg: "Request declined" });
  }
    */}
    if (action === "accept") {
  request.status = "accepted";
  await request.save();

  // add member to project
  await sequelize.models.ProjectMembers.findOrCreate({
    where: {
      projectId: request.projectId,
      userId: request.userId
    }
  });

  // 🔔 ACTIVITY LOG FOR LEADER
  await ActivityLog.create({
    action: request.direction === "invite"
      ? "project_invite_accepted"
      : "project_join_request_accepted",

    description:
      request.direction === "invite"
        ? `${req.user.name} accepted invitation to join project "${project.name}"`
        : `${req.user.name} joined project "${project.name}"`,

    projectId: project.id,
    userId: req.user.id
  });

  return res.json({ msg: "Request accepted" });
}

if (action === "decline") {
  request.status = "declined";
  await request.save();

  // 🔔 ACTIVITY LOG FOR LEADER
  await ActivityLog.create({
    action: request.direction === "invite"
      ? "project_invite_declined"
      : "project_join_request_declined",

    description:
      request.direction === "invite"
        ? `${req.user.name} declined invitation for project "${project.name}"`
        : `${req.user.name} declined join request for project "${project.name}"`,

    projectId: project.id,
    userId: req.user.id
  });

  return res.json({ msg: "Request declined" });
}

};
