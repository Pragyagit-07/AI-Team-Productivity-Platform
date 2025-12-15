



const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Organization = require('./Organization');
const Branch = require('./Branch');
const bcrypt = require('bcryptjs');  // required for hashing

const OrgUser = sequelize.define('OrgUser', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },

  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  email: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  password: {                   // 🔥 ADD PASSWORD FIELD
    type: DataTypes.STRING,
    allowNull: false
  },

  role: { 
    type: DataTypes.ENUM('ADMIN', 'MEMBER'), 
    defaultValue: 'ADMIN' 
  },

  organizationId: { 
    type: DataTypes.UUID, 
    allowNull: false 
  },

  branchId: { 
    type: DataTypes.UUID, 
    allowNull: false 
  }

}, {
  tableName: 'org_users',
  timestamps: true,

  // 🔐 Automatically hash password
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

// Relations
OrgUser.belongsTo(Organization, { foreignKey: 'organizationId' });
OrgUser.belongsTo(Branch, { foreignKey: 'branchId' });
Organization.hasMany(OrgUser, { foreignKey: 'organizationId' });
Branch.hasMany(OrgUser, { foreignKey: 'branchId' });

module.exports = OrgUser;
