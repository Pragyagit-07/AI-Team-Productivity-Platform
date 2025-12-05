const Organization = require('../models/Organization');
const Branch = require('../models/Branch');
const OrgUser = require('../models/OrgUser');

exports.createOrganization = async (req, res) => {
  const t = await Organization.sequelize.transaction();

  try {
    // 1️⃣ Create Organization
    const org = await Organization.create(req.body, { transaction: t });

    // 2️⃣ Create Default Branch
    const branch = await Branch.create({
      organizationId: org.id,
      name: `${org.name} Main Branch`,
      email: req.body.domain || null,
      phone: req.body.phone || null,
      address: req.body.address || null,
    }, { transaction: t });

    // 3️⃣ Create Default Admin User
    const orgUser = await OrgUser.create({
      organizationId: org.id,
      branchId: branch.id,
      name: req.body.createdBy || "Admin User",
      // email: req.body.domain,   // using domain as login email
      email: req.body.email || `${org.name.replace(/\s+/g, '').toLowerCase()}@admin.com`,

      role: "ADMIN"
    }, { transaction: t });

    await t.commit();

    return res.status(201).json({
      message: "Organization, Branch & Admin User created successfully",
      org,
      branch,
      orgUser
    });

  } catch (err) {
    await t.rollback();
    console.error("❌ Error:", err);
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
