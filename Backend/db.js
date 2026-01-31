// For local use
// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT || 'mysql',
//     logging: false, 
//   }
// );

// // connection
// sequelize.authenticate()
//   .then(() => console.log(' MySQL Connected'))
//   .catch(err => console.error('MySQL Connection Error:', err));

// module.exports = sequelize;

// for production use

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log("✅ MySQL Connected (Aiven + Sequelize)"))
  .catch(err => console.error("❌ MySQL Connection Error:", err));

module.exports = sequelize;
