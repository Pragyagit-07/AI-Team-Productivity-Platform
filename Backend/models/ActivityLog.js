



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
  action: { type: DataTypes.STRING, allowNull: false },
  projectId: { type: DataTypes.UUID, allowNull: false },  // project for easier filtering
  taskId: { type: DataTypes.UUID },                        // optional task reference
  userId: { type: DataTypes.UUID, allowNull: false }       // user who performed action
}, { tableName: 'activity_logs', timestamps: true });

// Associations
ActivityLog.belongsTo(User, { foreignKey: 'userId' });
ActivityLog.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = ActivityLog;
