// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     logging: false
//   }
// );

// sequelize.authenticate()
//   .then(() => console.log(' MySQL Connected'))
//   .catch(err => console.error(' MySQL connection error:', err));

// module.exports = sequelize;



const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // disable SQL logs, optional
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ MySQL Connected'))
  .catch(err => console.error('❌ MySQL Connection Error:', err));

module.exports = sequelize;
