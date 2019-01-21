const Sequelize = require('sequelize');

const sequelize = new Sequelize('cultivatr', '', '', {
   dialect: 'postgres',
   host: 'localhost'
});

module.exports = sequelize;