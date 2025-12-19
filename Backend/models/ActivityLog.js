const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Task = require('./Task');

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
    type: DataTypes.UUID
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {
  tableName: 'activity_logs',
  timestamps: true
});

ActivityLog.belongsTo(User, { foreignKey: 'userId' });
ActivityLog.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = ActivityLog;
