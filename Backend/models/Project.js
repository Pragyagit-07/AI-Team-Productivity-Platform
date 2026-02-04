const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('planned','inprogress','completed','onhold','cancelled'),
    defaultValue: 'planned'
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  createdBy: { type: DataTypes.UUID, allowNull: false }
}, {
  tableName: 'projects',
  timestamps: true
});



module.exports = Project;

