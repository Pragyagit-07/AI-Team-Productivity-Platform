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
    avatar: {
  type: DataTypes.STRING,
  allowNull: true,
},

    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      defaultValue: "member",
    },
isVerified: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
},
emailVerifyOtp: {
  type: DataTypes.STRING,
  allowNull: true,
},
emailVerifyOtpExpires: {
  type: DataTypes.DATE,
  allowNull: true,
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
