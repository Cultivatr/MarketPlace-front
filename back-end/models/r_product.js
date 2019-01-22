const Sequelize = require('sequelize');
const db = require('../util/database');

const R_product = db.define('r_product', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false
   },
   type: {
      type: Sequelize.STRING,
      allowNull: false
   },
   qty_unit: Sequelize.STRING
   },
   {tableName: "r_product"}
);

module.exports = R_product;