const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, 
  }
);

// connection
sequelize.authenticate()
  .then(() => console.log(' MySQL Connected'))
  .catch(err => console.error('MySQL Connection Error:', err));

module.exports = sequelize;



// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.MYSQLDATABASE,   
//   process.env.MYSQLUSER,     
//   process.env.MYSQLPASSWORD,   
//   {
//     host: process.env.MYSQLHOST,
//     port: process.env.MYSQLPORT,
//     dialect: 'mysql',
//     logging: false,
//   }
// );

// module.exports = sequelize;



