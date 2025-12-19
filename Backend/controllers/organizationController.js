const Organization = require('../models/Organization');
const Branch = require('../models/Branch');
const OrgUser = require('../models/OrgUser');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");


exports.createOrganization = async (req, res) => {
  const t = await Organization.sequelize.transaction();

  try {
    //  Create Organization
    const org = await Organization.create(req.body, { transaction: t });

    //  Create Default Branch
    const branch = await Branch.create({
      organizationId: org.id,
      name: `${org.name} Main Branch`,
      email: req.body.domain || null,
      phone: req.body.phone || null,
      address: req.body.address || null,
    }, { transaction: t });

    //  Create Default Admin User
    const plainPassword = crypto.randomBytes(4).toString("hex");
    const orgUser = await OrgUser.create({
      organizationId: org.id,
      branchId: branch.id,
      name: req.body.createdBy || "Admin User",
      email: req.body.email || `${org.name.replace(/\s+/g, '').toLowerCase()}@admin.com`,
      password: plainPassword,
      role: "ADMIN"
    }, { transaction: t });

    await t.commit();

    return res.status(201).json({
      message: "Organization, Branch & Admin User created successfully",
      org,
      branch,
      orgUser,
      adminLogin: {
    email: orgUser.email,
    password: plainPassword,   
  }

    });

  } catch (err) {
    await t.rollback();
    console.error(" Error:", err);
    return res.status(500).json({ msg: err.message });
  }
};




exports.getOrganizations = async (req, res) => {
  const orgs = await Organization.findAll();
  res.json(orgs);
};

exports.getOrganizationById = async (req, res) => {
  const org = await Organization.findByPk(req.params.id);
  if (!org) return res.status(404).json({ msg: 'Not found' });
  res.json(org);
};

exports.updateOrganization = async (req, res) => {
  const org = await Organization.findByPk(req.params.id);
  if (!org) return res.status(404).json({ msg: 'Not found' });

  await org.update(req.body);
  res.json(org);
};

exports.deleteOrganization = async (req, res) => {
  const org = await Organization.findByPk(req.params.id);
  if (!org) return res.status(404).json({ msg: 'Not found' });

  await org.destroy();
  res.json({ msg: 'Organization deleted' });
};
