// for local
// require('dotenv').config();
// const http = require("http");
// const { Server } = require("socket.io");
// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./db');
// const app = express();

// //  MIDDLEWARE
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || origin.startsWith("http://localhost")) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed"));
//       }
//     },
//     credentials: true
//   })
// );

// // for active/inactive
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin || origin.startsWith("http://localhost")) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed"));
//       }
//     },
//     credentials: true
//   }
// });

// const onlineUsers = new Map();

// // make available everywhere
// app.set("io", io);
// app.set("onlineUsers", onlineUsers);
// app.use(express.json());
// app.use('/api/uploads', express.static('uploads'));

// //  LOAD MODELS (ORDER MATTERS)
// const User = require('./models/User');
// const Project = require('./models/Project');
// const Task = require('./models/Task');
// const Comment = require('./models/Comment');
// const File = require('./models/File');
// const ActivityLog = require('./models/ActivityLog');


// require('./models/Subscription');
// require('./models/ChatMessage');
// require('./models/Organization');
// require('./models/Branch');
// require('./models/OrgUser');
// require('./models/ProjectJoinRequest');
// require("./socket")(io, onlineUsers);

// //  ROUTES
// const authRoutes = require('./routes/auth');
// const profileRoutes = require('./routes/profileRoutes');
// const projectRoutes = require('./routes/projects');
// const taskRoutes = require('./routes/tasks');
// const activityRoutes = require('./routes/activityRoutes');
// const commentRoutes = require('./routes/commentRoutes');
// const fileRoutes = require('./routes/fileRoutes');
// const subscriptionRoutes = require('./routes/subscription');
// const chatRoutes = require('./routes/chat');
// const memberRoutes = require('./routes/memberRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const organizationRoutes = require('./routes/organizationRoutes');
// const branchRoutes = require('./routes/branchRoutes');
// const orgUserRoutes = require('./routes/orgUserRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const projectRequestRoutes = require('./routes/projectRequest');
// const aiAssistantRoutes = require("./routes/aiAssistantRoutes");
// // org-user  side
// // const orgAuthRoutes = require("./routes/orgAuth.routes");

// // ROUTE MOUNTS 
// // Admin / Org
// app.use('/api/admin', adminRoutes);
// app.use('/api/organizations', organizationRoutes);
// app.use('/api/branches', branchRoutes);
// app.use('/api/org-users', orgUserRoutes);
// // app.use('/org-auth', orgAuthRoutes);


// // Auth & Core
// app.use('/api/auth', authRoutes);
// app.use('/api/members', memberRoutes);
// app.use("/api/profile", profileRoutes);

// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/projects', projectRoutes);
// app.use("/api/project-requests", projectRequestRoutes);

// app.use('/api/tasks', taskRoutes);

// // Task related
// app.use('/api/comments', commentRoutes);
// app.use('/api/files', fileRoutes);
// app.use('/api/activity', activityRoutes);

// // Other
// app.use('/api/subscription', subscriptionRoutes);
// app.use("/api/ai-assistant", aiAssistantRoutes);
// app.use("/help-bot", require("./routes/helpBotRoutes"));

// app.use('/api/chat', chatRoutes);

// //  ASSOCIATIONS 

// // Project creator
// Project.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// // Project ↔ Task
// Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
// Task.belongsTo(Project, { foreignKey: 'projectId' });

// // Task ↔ Assignee
// User.hasMany(Task, { foreignKey: 'assigneeId' });
// Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });

// // Project -> Members (Many-to-Many)
// Project.belongsToMany(User, {
//   through: 'ProjectMembers',
//   foreignKey: 'projectId',
//   as: 'members'
// });

// User.belongsToMany(Project, {
//   through: 'ProjectMembers',
//   foreignKey: 'userId',
//   as: 'projects'
// });

// /*  PROJECT JOIN REQUESTS */

// // Project <-> ProjectJoinRequest
// Project.hasMany(require("./models/ProjectJoinRequest"), {
//   foreignKey: "projectId",
//     as: "joinRequests",
//    onDelete: "CASCADE"
// });

// require("./models/ProjectJoinRequest").belongsTo(Project, {
//   foreignKey: "projectId",
//     as: "project"

// });

// // User ↔ ProjectJoinRequest
// User.hasMany(require("./models/ProjectJoinRequest"), {
//   foreignKey: "userId",
//     as: "joinRequests",

//   onDelete: "CASCADE"
// });

// require("./models/ProjectJoinRequest").belongsTo(User, {
//   foreignKey: "userId",
//     as: "user"

// });

// /*  TASK RELATED  */

// // Task ↔ Comments
//  Task.hasMany(Comment, { foreignKey: 'taskId', as: 'comments', onDelete: 'CASCADE', hooks: true });
// Comment.belongsTo(Task, { foreignKey: 'taskId' , onDelete: 'CASCADE'});
// User.hasMany(Comment, { foreignKey: 'userId' });
// Comment.belongsTo(User, { foreignKey: 'userId' });

// // Task ↔ Files
//  Task.hasMany(File, { foreignKey: 'taskId', as: 'files', onDelete: 'CASCADE', hooks: true });
// File.belongsTo(Task, { foreignKey: 'taskId', onDelete: 'CASCADE' });

// User.hasMany(File, { foreignKey: 'userId' });
// File.belongsTo(User, { foreignKey: 'userId' });

// // Task ↔ Activity Logs
// Task.hasMany(ActivityLog, { foreignKey: 'taskId', as: 'activities' , onDelete: 'SET NULL',  hooks: true});
//  ActivityLog.belongsTo(Task, { foreignKey: 'taskId',    onDelete: 'SET NULL'});
 

// User.hasMany(ActivityLog, { foreignKey: 'userId' });
// ActivityLog.belongsTo(User, { foreignKey: 'userId' });

// // Project ↔ Activity Logs
// // Project.hasMany(ActivityLog, {
// //   foreignKey: "projectId",
// //   as: "activities",
// //   onDelete: "CASCADE",
// // });

// // ActivityLog.belongsTo(Project, {
// //   foreignKey: "projectId",
// // });


// /*  START SERVER */
// sequelize
// .sync({ force: false, })
//   .then(() => {
//     console.log(' Database synced successfully');
//     const PORT = process.env.PORT || 5000;
//     server.listen(PORT, () =>
//   console.log(` Server running on port ${PORT}`)
// );

//   })
//   .catch((err) => {
//     console.error(' Sequelize Sync Error:', err);
//   });

// for production

require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const sequelize = require("./db");

const app = express();

/*  ALLOWED ORIGINS */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ai-team-productivity-platform.vercel.app", 

];

/* MIDDLEWARE */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(" Blocked by CORS:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
// app.use("/api/uploads", express.static("uploads"));

/*  SERVER + SOCKET.IO */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(" Socket blocked by CORS:", origin);
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  },
});

const onlineUsers = new Map();

// make socket available everywhere
app.set("io", io);
app.set("onlineUsers", onlineUsers);
app.get("/", (req, res) => {
  res.send(" Backend is running");
});

/*  LOAD MODELS (ORDER MATTERS) */
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");
const Comment = require("./models/Comment");
const File = require("./models/File");
const ActivityLog = require("./models/ActivityLog");
const ProjectJoinRequest = require("./models/ProjectJoinRequest");


require("./models/Subscription");
require("./models/ChatMessage");
require("./models/Organization");
require("./models/Branch");
require("./models/OrgUser");
require("./models/ProjectJoinRequest");
require("./socket")(io, onlineUsers);

/*  ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/project-requests", require("./routes/projectRequest"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
app.use("/api/subscription", require("./routes/subscription"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/ai-assistant", require("./routes/aiAssistantRoutes"));
app.use("/help-bot", require("./routes/helpBotRoutes"));

// Admin / Org
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/organizations", require("./routes/organizationRoutes"));
app.use("/api/branches", require("./routes/branchRoutes"));
app.use("/api/org-users", require("./routes/orgUserRoutes"));

/* ASSOCIATIONS */

// Project creator
Project.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// Project ↔ Task
Project.hasMany(Task, { foreignKey: "projectId", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "projectId" });

// Task ↔ Assignee
User.hasMany(Task, { foreignKey: "assigneeId" });
Task.belongsTo(User, { foreignKey: "assigneeId", as: "assignee" });

// Project ↔ Members
Project.belongsToMany(User, {
  through: "ProjectMembers",
  foreignKey: "projectId",
  as: "members",
});

User.belongsToMany(Project, {
  through: "ProjectMembers",
  foreignKey: "userId",
  as: "projects",
});


// ProjectJoinRequest → Project
ProjectJoinRequest.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

// Project → ProjectJoinRequests
Project.hasMany(ProjectJoinRequest, {
  foreignKey: "projectId",
  as: "joinRequests",
});

// ProjectJoinRequest → User
ProjectJoinRequest.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// User → ProjectJoinRequests
User.hasMany(ProjectJoinRequest, {
  foreignKey: "userId",
  as: "joinRequests",
});


// Task ↔ Comments
Task.hasMany(Comment, {
  foreignKey: "taskId",
  as: "comments",
  onDelete: "CASCADE",
  hooks: true,
});
Comment.belongsTo(Task, { foreignKey: "taskId", onDelete: "CASCADE" });
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// Task ↔ Files
Task.hasMany(File, {
  foreignKey: "taskId",
  as: "files",
  onDelete: "CASCADE",
  hooks: true,
});
File.belongsTo(Task, { foreignKey: "taskId", onDelete: "CASCADE" });
User.hasMany(File, { foreignKey: "userId" });
File.belongsTo(User, { foreignKey: "userId" });

// Task ↔ Activity Logs
Task.hasMany(ActivityLog, {
  foreignKey: "taskId",
  as: "activities",
  onDelete: "SET NULL",
  hooks: true,
});
ActivityLog.belongsTo(Task, {
  foreignKey: "taskId",
  onDelete: "SET NULL",
});

User.hasMany(ActivityLog, { foreignKey: "userId" });
ActivityLog.belongsTo(User, { foreignKey: "userId" });

/* START SERVER */
sequelize
  .sync({ force: false })
  .then(() => {
    console.log(" Database synced successfully");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Sequelize Sync Error:", err);
  });
