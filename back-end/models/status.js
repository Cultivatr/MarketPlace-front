const Sequelize = require('sequelize');
const db = require('../util/database');

const Status = db.define('status', {
   id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   status_name: Sequelize.STRING
});

module.exports = Status;