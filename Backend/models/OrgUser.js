// models/OrgUser.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Organization = require('./Organization');
const Branch = require('./Branch');

const OrgUser = sequelize.define('OrgUser', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  //  role: { type: DataTypes.STRING, defaultValue: "admin"  },
    // role: { type: DataTypes.ENUM('org_admin','member'), defaultValue: 'org_admin' },
role: { type: DataTypes.ENUM('ADMIN', 'MEMBER'), defaultValue: "ADMIN" },

  organizationId: { type: DataTypes.UUID, allowNull: false },
  branchId: { type: DataTypes.UUID, allowNull: false }
}, { tableName: 'org_users', timestamps: true });

OrgUser.belongsTo(Organization, { foreignKey: 'organizationId' });
OrgUser.belongsTo(Branch, { foreignKey: 'branchId' });
Organization.hasMany(OrgUser, { foreignKey: 'organizationId' });
Branch.hasMany(OrgUser, { foreignKey: 'branchId' });

module.exports = OrgUser;
