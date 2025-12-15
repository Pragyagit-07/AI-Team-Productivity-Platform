



const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Task = sequelize.define("Task", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("todo", "inprogress", "done"),
    defaultValue: "todo",
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium",
  },
  startDate: {
  type: DataTypes.DATE,
  allowNull: true,
  defaultValue: DataTypes.NOW
},

  dueDate: DataTypes.DATE,
  projectId: DataTypes.UUID,
  assigneeId: DataTypes.UUID,
}, {
  tableName: "tasks",
  timestamps: true,
});

module.exports = Task;
