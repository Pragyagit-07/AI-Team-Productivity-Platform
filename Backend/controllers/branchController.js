//branchController.js
const Branch = require('../models/Branch');
const Organization = require('../models/Organization');
exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json(branch);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.getBranches = async (req, res) => {
  try {
    const { organizationId } = req.query;

    const where = {};
    if (organizationId) {
      where.organizationId = organizationId; // filter branches of that org
    }

    const branches = await Branch.findAll({ where });

    res.json(branches);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};





exports.getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id, {
      include: [
        { model: Organization, attributes: ["id", "name"] }
      ]
    });

    if (!branch) {
      return res.status(404).json({ msg: "Not found" });
    }

    res.json(branch);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.updateBranch = async (req, res) => {
  const branch = await Branch.findByPk(req.params.id);
  if (!branch) return res.status(404).json({ msg: 'Not found' });

  await branch.update(req.body);
  res.json(branch);
};




exports.deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);

    if (!branch) {
      return res.status(404).json({ msg: "Branch not found" });
    }

    await branch.destroy();

    res.json({ msg: "Branch deleted successfully" });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ msg: "Failed to delete branch", error: err.message });
  }
};
