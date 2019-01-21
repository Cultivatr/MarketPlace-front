const Sequealize = require('sequelize');
const db = require('../util/database');

const User = db.define('user', {
   id: {
      type: Sequealize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   first_name: {
      type: Sequealize.STRING,
      allowNull: false
   },
   last_name: {
      type: Sequealize.STRING,
      allowNull: false
   },
   primary_phone: {
      type: Sequealize.INTEGER,
      allowNull: false  
   },
   secondary_phone: {
      type: Sequealize.INTEGER,
      allowNull: false
   },
   email: {
      type: Sequealize.INTEGER,
      allowNull: false
   },
   farm_name: {
      type: Sequealize.STRING,
      allowNull: false
   },
   farm_location: {
      type: Sequealize.STRING
   },
   area: {
      type: Sequealize.STRING
   },
   is_producer: {
      type: Sequealize.BOOLEAN
   },
   is_admin: {
      type: Sequealize.BOOLEAN
   },
   is_other: {
      type: Sequealize.BOOLEAN
   },
   member_since: {
      type: Sequealize.DATE
   },
   farm_typeL: {
      type: Sequealize.STRING
   },
   rating: {
      type: Sequealize.INTEGER
   }
});

module.exports = User;