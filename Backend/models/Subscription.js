// //Subscription.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const User = require('./User');

// const Subscription = sequelize.define('Subscription', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   plan: { type: DataTypes.STRING },
//   status: { type: DataTypes.ENUM('active', 'inactive', 'cancelled') },
//   expiryDate: { type: DataTypes.DATE }
// }, { tableName: 'subscriptions', timestamps: true });

// Subscription.belongsTo(User, { foreignKey: 'userId' }); 

// module.exports = Subscription;




const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
// create subscription table   => sequelize.define('Subscription', {  ......})   
// id unique id for subscription             
 
const Subscription = sequelize.define('Subscription', {                   
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  plan: { type: DataTypes.STRING }, // plan name (pro/team/free)
  status: { type: DataTypes.ENUM('active','inactive','cancelled') },
  expiryDate: { type: DataTypes.DATE } // optional, subscription expiry
}, { tableName: 'subscriptions', timestamps: true });

Subscription.belongsTo(User, { foreignKey: 'userId' }); 
module.exports = Subscription;
