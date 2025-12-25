//models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Task = require('./Task');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  taskId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, { timestamps: true });

Comment.belongsTo(User, { foreignKey: 'userId' });
// Comment.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = Comment;
