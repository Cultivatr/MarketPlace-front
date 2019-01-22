const Sequelize = require('sequelize');
const db = require('../util/database');

const R_facility = db.define('r_facility', {
   id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   facility_name: Sequelize.STRING,
   type_of_facility: Sequelize.STRING
   },
   {tableName: "r_facility",
   timestamps: false
   }
);

module.exports = R_facility;