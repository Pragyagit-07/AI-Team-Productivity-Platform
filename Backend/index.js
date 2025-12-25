require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const app = express();


/* -------------------- MIDDLEWARE -------------------- */
// app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true
  })
);


app.use(express.json());
app.use('/api/uploads', express.static('uploads'));

/* -------------------- LOAD MODELS (ORDER MATTERS) -------------------- */
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Comment = require('./models/Comment');
const File = require('./models/File');
const ActivityLog = require('./models/ActivityLog');

require('./models/Subscription');
require('./models/ChatMessage');
require('./models/Organization');
require('./models/Branch');
require('./models/OrgUser');

/* -------------------- ROUTES -------------------- */
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const activityRoutes = require('./routes/activityRoutes');
const commentRoutes = require('./routes/commentRoutes');
const fileRoutes = require('./routes/fileRoutes');
const subscriptionRoutes = require('./routes/subscription');
const chatRoutes = require('./routes/chat');
const memberRoutes = require('./routes/memberRoutes');
const adminRoutes = require('./routes/adminRoutes');

const organizationRoutes = require('./routes/organizationRoutes');
const branchRoutes = require('./routes/branchRoutes');
const orgUserRoutes = require('./routes/orgUserRoutes');

/* -------------------- ROUTE MOUNTS -------------------- */
// Admin / Org
app.use('/api/admin', adminRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/org-users', orgUserRoutes);

// Auth & Core
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Task related
app.use('/api/comments', commentRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/activity', activityRoutes);

// Other
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/chat', chatRoutes);

/* -------------------- ASSOCIATIONS -------------------- */

// Project creator
Project.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// Project ↔ Task
Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

// Task ↔ Assignee
User.hasMany(Task, { foreignKey: 'assigneeId' });
Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });

// Project ↔ Members (Many-to-Many)
Project.belongsToMany(User, {
  through: 'ProjectMembers',
  foreignKey: 'projectId',
  as: 'members'
});

User.belongsToMany(Project, {
  through: 'ProjectMembers',
  foreignKey: 'userId',
  as: 'projects'
});

/* -------------------- TASK RELATED -------------------- */

// Task ↔ Comments
// Task.hasMany(Comment, { foreignKey: 'taskId', as: 'comments', onDelete: 'CASCADE', hooks: true });
// Comment.belongsTo(Task, { foreignKey: 'taskId' , onDelete: 'CASCADE'});

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Task ↔ Files
// Task.hasMany(File, { foreignKey: 'taskId', as: 'files', onDelete: 'CASCADE', hooks: true });
// File.belongsTo(Task, { foreignKey: 'taskId', onDelete: 'CASCADE' });

User.hasMany(File, { foreignKey: 'userId' });
File.belongsTo(User, { foreignKey: 'userId' });

// Task ↔ Activity Logs
// Task.hasMany(ActivityLog, {
  // foreignKey: 'taskId',
  // as: 'activities',
    // constraints: false   


// });

// ActivityLog.belongsTo(Task, {
  // foreignKey: 'taskId',
    // constraints: false   

// });


 Task.hasMany(ActivityLog, { foreignKey: 'taskId', as: 'activities' , onDelete: 'setNull',  hooks: true});
 ActivityLog.belongsTo(Task, { foreignKey: 'taskId',   onDelete: 'CASCADE'});

User.hasMany(ActivityLog, { foreignKey: 'userId' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });

/* -------------------- START SERVER -------------------- */
sequelize
.sync({force: false})

  //  .sync({ alter: true })
  .then(() => {
    console.log(' Database synced successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(` Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error(' Sequelize Sync Error:', err);
  });
