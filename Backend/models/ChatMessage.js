const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const ChatMessage = sequelize.define('ChatMessage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message: { type: DataTypes.TEXT },
  response: { type: DataTypes.TEXT }
}, { tableName: 'chat_messages', timestamps: true });

ChatMessage.belongsTo(User, { foreignKey: 'userId' }); // FK User.id

module.exports = ChatMessage;
