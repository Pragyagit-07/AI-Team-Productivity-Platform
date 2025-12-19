const OrgUser = require('../models/OrgUser');
const Organization = require('../models/Organization');
const Branch = require('../models/Branch');

// Helper: remove password before sending response
const removePassword = (user) => {
  if (!user) return user;
  const plain = user.toJSON();
  delete plain.password;
  return plain;
};

// CREATE ORG USER
exports.createOrgUser = async (req, res) => {
  try {
    const orgUser = await OrgUser.create(req.body);
    res.status(201).json(removePassword(orgUser));
  } catch (err) {
    console.error("Create OrgUser Error:", err);
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL ORG USERS
exports.getOrgUsers = async (req, res) => {
  try {
    const users = await OrgUser.findAll({
      include: [
        { model: Organization, attributes: ["id", "name"] },
        { model: Branch, attributes: ["id", "name"] }
      ]
    });
    res.json(users.map(removePassword));
  } catch (err) {
    console.error("Get OrgUsers Error:", err);
    res.status(500).json({ msg: err.message });
  }
};

// GET ORG USERS BY BRANCH
exports.getOrgUsersByBranch = async (req, res) => {
  try {
    const users = await OrgUser.findAll({
      where: { branchId: req.params.branchId },
      include: [
        { model: Organization, attributes: ["id", "name"] },
        { model: Branch, attributes: ["id", "name"] }
      ]
    });

    res.json(users.map(removePassword));
  } catch (err) {
    console.error("Get OrgUsers by Branch Error:", err);
    res.status(500).json({ msg: err.message });
  }
};

// GET ORG USER BY ID
exports.getOrgUserById = async (req, res) => {
  try {
    const user = await OrgUser.findByPk(req.params.id, {
      include: [
        { model: Organization, attributes: ["id", "name"] },
        { model: Branch, attributes: ["id", "name"] }
      ]
    });

    if (!user) return res.status(404).json({ msg: "Not found" });

    res.json(removePassword(user));
  } catch (err) {
    console.error("Get OrgUser by ID Error:", err);
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE ORG USER
exports.updateOrgUser = async (req, res) => {
  try {
    const user = await OrgUser.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: "Not found" });

    await user.update(req.body);
    res.json(removePassword(user));
  } catch (err) {
    console.error("Update OrgUser Error:", err);
    res.status(500).json({ msg: err.message });
  }
};

// DELETE ORG USER
exports.deleteOrgUser = async (req, res) => {
  try {
    const user = await OrgUser.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: "Not found" });

    await user.destroy();
    res.json({ msg: "Org user deleted" });
  } catch (err) {
    console.error("Delete OrgUser Error:", err);
    res.status(500).json({ msg: err.message });
  }
};
