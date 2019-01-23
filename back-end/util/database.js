const Sequelize = require('sequelize');

const sequelize = new Sequelize('cultivatr', '', 'evolveu', {
   dialect: 'postgres',
   host: 'localhost'
   //just a comment
});

module.exports = sequelize;