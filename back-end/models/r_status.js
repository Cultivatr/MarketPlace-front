const Sequelize = require('sequelize');
const db = require('../util/database');

const R_status = db.define('r_status', {
   id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   status_name: Sequelize.STRING
   },
   {tableName: "r_status",
   timestamps: false
   }
);

module.exports = R_status;