

const { Sequelize } = require('sequelize');

// Connect to DB
module.exports = new Sequelize('d8nmqhi8r4mvmp', 'ofqwvoqzvyigqt', 'c0aba7d30f70c81ef21609509fb7fb21be842daa689fff99e4414bca099211d4', {
    host: 'ec2-54-204-56-171.compute-1.amazonaws.com',
    dialect: 'postgres',
    ssl: false
});

