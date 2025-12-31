// models/ProjectJoinRequest.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProjectJoinRequest = sequelize.define("ProjectJoinRequest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("pending", "accepted", "declined"),
    defaultValue: "pending",
  },
});

module.exports = ProjectJoinRequest;
