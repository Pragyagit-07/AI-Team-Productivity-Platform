const Project = require("../models/Project");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const projectId =
      req.params.projectId ||
      req.params.id ||
      req.body.projectId ||
      req.task?.projectId;

    if (!projectId) {
      return res.status(400).json({ msg: "Project ID missing" });
    }

    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: User,
          as: "members",
          attributes: ["id"],
          through: { attributes: [] }
        }
      ]
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const isCreator = project.createdBy === userId;
    const isMember = project.members.some(m => m.id === userId);

    if (!isCreator && !isMember) {
      return res.status(403).json({
        msg: "You are not part of this project"
      });
    }

    // attach for later controllers (safe)
    req.project = project;

    next();
  } catch (err) {
    console.error("Project permission error:", err);
    res.status(500).json({ msg: "Permission check failed" });
  }
};
