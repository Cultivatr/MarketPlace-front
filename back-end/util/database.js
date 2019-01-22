const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb', '', '', {
   dialect: 'postgres',
   host: 'localhost'
});

module.exports = sequelize;