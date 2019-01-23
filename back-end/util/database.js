const Sequelize = require('sequelize');

const sequelize = new Sequelize('cultivatr', '', 'evolveu', {
   dialect: 'postgres',
   host: 'localhost'
});

module.exports = sequelize;