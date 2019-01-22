const Sequelize = require('sequelize');
const db = require('../util/database');

const Status_tracker = db.define('status_tracker', {
   id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   start_date: Sequelize.DATE,
   end_date: Sequelize.DATE
   },
   {tableName: "status_tracker"}
);

module.exports = Status_tracker;