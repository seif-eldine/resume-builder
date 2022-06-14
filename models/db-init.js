const { Sequelize } = require('sequelize');

// Connect to DB
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;
module.exports = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

