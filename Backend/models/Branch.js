




// models/Branch.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Organization = require('./Organization');

const Branch = sequelize.define('Branch', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  organizationId: { type: DataTypes.UUID, allowNull: false }
}, { tableName: 'branches', timestamps: true });

Branch.belongsTo(Organization, { foreignKey: 'organizationId' });

module.exports = Branch;
