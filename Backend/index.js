require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// 🔥 LOAD MODELS HERE (VERY IMPORTANT)
require('./models/User');
require('./models/Project');
require('./models/Task');
require('./models/ActivityLog');
require('./models/Subscription');
require('./models/ChatMessage');
require('./models/Organization');
require('./models/Branch');
require('./models/OrgUser');

// Routes
const organizationRoutes = require('./routes/organizationRoutes');
const branchRoutes = require('./routes/branchRoutes');
const orgUserRoutes= require('./routes/orgUserRoutes');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const activityRoutes = require('./routes/activity');
const subscriptionRoutes = require('./routes/subscription');
const chatRoutes = require('./routes/chat');

// admin routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/org-users',orgUserRoutes);

// main routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/chat', chatRoutes);

// ✅ NOW Sequelize knows about models
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database synced and tables created');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log('Server running on port', PORT));
}).catch(err => {
  console.error("❌ Sequelize Sync Error:", err);
});
