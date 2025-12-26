// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

// const User = sequelize.define('User', {
//   id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, allowNull: false, unique: true },
//   passwordHash: { type: DataTypes.STRING, allowNull: false },
//   role: { type: DataTypes.ENUM('admin', 'member'), defaultValue: 'member' }
// }, { tableName: 'users', timestamps: true });

// module.exports = User;

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      defaultValue: "member",
    },

    // ✅ ADD THESE
    resetOtp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetOtpExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
