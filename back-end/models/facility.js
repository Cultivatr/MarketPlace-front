const Sequelize = require('sequelize');
const db = require('../util/database');

const Facility = db.define('facility', {
   id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   facility_name: Sequelize.STRING,
   type_of_facility: Sequelize.STRING
});

module.exports = Facility;