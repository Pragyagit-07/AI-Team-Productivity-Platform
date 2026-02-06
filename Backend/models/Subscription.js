// //Subscription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

// id unique id for subscription             
 
const Subscription = sequelize.define('Subscription', {                   
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  plan: { type: DataTypes.STRING }, // plan name 
  status: { type: DataTypes.ENUM('active','inactive','cancelled') },
  expiryDate: { type: DataTypes.DATE } //  subscription expiry
}, { tableName: 'subscriptions', timestamps: true });

Subscription.belongsTo(User, { foreignKey: 'userId' }); 
module.exports = Subscription;
