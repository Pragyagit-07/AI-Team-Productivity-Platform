const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  taskId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'activity_logs',
  timestamps: true
});

module.exports = ActivityLog;
