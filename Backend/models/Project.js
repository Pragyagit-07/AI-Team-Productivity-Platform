// Project.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  createdBy: { type: DataTypes.UUID, allowNull: false } // FK to User.id
}, { tableName: 'projects', timestamps: true });

// Many-to-Many: Project members
Project.belongsToMany(User, { through: 'ProjectMembers', foreignKey: 'projectId' });
User.belongsToMany(Project, { through: 'ProjectMembers', foreignKey: 'userId' });

module.exports = Project;
