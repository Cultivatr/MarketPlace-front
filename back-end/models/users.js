const Sequealize = require('sequelize');
const db = require('../util/database');

const Users = db.define('user', {
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
      type: Sequealize.STRING,
      allowNull: false  
   },
   secondary_phone: {
      type: Sequealize.STRING,
      allowNull: false
   },
   email: {
      type: Sequealize.STRING,
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
   farm_type: {
      type: Sequealize.STRING
   },
   rating: {
      type: Sequealize.INTEGER
   },
   mailing_street: {
      type: Sequealize.STRING
   },
   mailing_city: {
      type: Sequealize.STRING
   },
   mailing_province: {
      type: Sequealize.STRING
   },
   mailing_country: {
      type: Sequealize.STRING
   },
   mailing_postal_code: {
      type: Sequealize.STRING
   },
   billing_street: {
      type: Sequealize.STRING
   },
   billing_city: {
      type: Sequealize.STRING
   },
   billing_province: {
      type: Sequealize.STRING
   },
   billing_country: {
      type: Sequealize.STRING
   },
   billing_postal_code: {
      type: Sequealize.STRING
   },
   user_comments: {
      type: Sequealize.TEXT
   }
   },
   {tableName: "users",
   timestamps: false
   }
   );

module.exports = Users;