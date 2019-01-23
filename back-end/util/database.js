const Sequelize = require('sequelize');

const sequelize = new Sequelize('cultivatr', 'postgres', 'Password', {
   dialect: 'postgres',
   host: 'localhost'
});

module.exports = sequelize;