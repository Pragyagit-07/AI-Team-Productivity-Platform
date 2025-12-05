//Task.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Project = require('./Project');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('todo', 'inprogress', 'done'), defaultValue: 'todo' },
  priority: { type: DataTypes.ENUM('low', 'medium', 'high') },
  dueDate: { type: DataTypes.DATE },
  assigneeId: { type: DataTypes.UUID } // FK to User.id
}, { tableName: 'tasks', timestamps: true });

Task.belongsTo(Project, { foreignKey: 'projectId' });
Task.belongsTo(User, { foreignKey: 'assigneeId' });

module.exports = Task;

