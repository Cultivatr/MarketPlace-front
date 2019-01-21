const Sequelize = require('sequelize');
const db = require('../util/database');

const Product = db.define('product', {
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
});

module.exports = Product;