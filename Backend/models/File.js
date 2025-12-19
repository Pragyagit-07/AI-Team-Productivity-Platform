const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Task = require('./Task');
const User = require('./User');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: { type: DataTypes.STRING },
  path: { type: DataTypes.STRING },
  mimeType: { type: DataTypes.STRING },
  taskId: { type: DataTypes.UUID },
  userId: { type: DataTypes.UUID }
}, { timestamps: true });

File.belongsTo(Task, { foreignKey: 'taskId' });
File.belongsTo(User, { foreignKey: 'userId' });

module.exports = File;
