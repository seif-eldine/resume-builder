const { Sequelize, DataTypes } = require('sequelize');
const connection = require('./db-init');
const bCrypt = require('bcrypt');

const ResumeUser = connection.define('resume_user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSONB,
    defaultValue: Sequelize.JSONB('{}'),
  },
});

connection.sync().then(async () => {
  const hashedPassword = await bCrypt.hash('user', 10);

  ResumeUser.findOrCreate({

    where: {username: 'user'},
    defaults: {
      username: 'user',
      password: hashedPassword,
      data: {}
    },
  });

}).catch(err => {
  console.log('Found error on creating first user :', err)
});

module.exports = ResumeUser;
