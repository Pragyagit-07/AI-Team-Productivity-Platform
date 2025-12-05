//models/ Organization.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Organization = sequelize.define('Organization', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  domain: { type: DataTypes.STRING },        // optional, for mail domain or slug
  phone: {type: DataTypes.STRING },
  address: { type: DataTypes.TEXT},
  createdBy: { type: DataTypes.TEXT }        // global admin who created it
}, { tableName: 'organizations', timestamps: true });

module.exports = Organization;


