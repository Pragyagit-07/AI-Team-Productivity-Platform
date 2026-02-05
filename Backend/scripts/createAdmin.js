require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("../db");
const User = require("../models/User");

(async () => {
  try {
    await sequelize.authenticate();

    const email = process.env.ADMIN_EMAIL;

    const existingAdmin = await User.findOne({
      where: { role: "admin" }
    });

    if (existingAdmin) {
      console.log(" Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: "Super Admin",
      email,
      passwordHash,
      role: "admin",
      isVerified: true,          
      avatar: null,
    });

    console.log(" Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error(" Failed to create admin:", err);
    process.exit(1);
  }
})();
