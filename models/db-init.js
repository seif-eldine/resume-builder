

const { Sequelize } = require('sequelize');

// Connect to DB
module.exports = new Sequelize('sequelize_db', 'postgres', 'RoBeN44554488', {
    host: 'localhost',
    dialect: 'postgres',
});

