const Sequelize = require('sequelize');

const sequelize = new Sequelize('cultivatr', 'evolveu', 'Password', {
   dialect: 'postgres',
   host: 'localhost'
});

module.exports = sequelize;