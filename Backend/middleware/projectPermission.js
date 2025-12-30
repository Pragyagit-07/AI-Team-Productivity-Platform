const sequelize = require('../db');

module.exports = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // projectId can come from params or body
    const projectId =
      req.params.projectId ||
      req.body.projectId ||
      req.task?.projectId;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID missing" });
    }

    //  Check ProjectMembers table directly
    const [result] = await sequelize.query(
      `
      SELECT * FROM ProjectMembers
      WHERE projectId = :projectId AND userId = :userId
      `,
      {
        replacements: { projectId, userId }
      }
    );

    if (!result.length) {
      return res.status(403).json({
        message: "You are not a member of this project"
      });
    }

    next();
  } catch (err) {
    console.error("Permission error:", err);
    res.status(500).json({ message: "Permission check failed" });
  }
};
