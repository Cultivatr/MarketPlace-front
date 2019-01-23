const Sequelize = require('sequelize');
const db = require('../util/database.js');

const Offered_item = db.define('offered_item', {
   id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   },
   quantity: Sequelize.INTEGER,
   price_paid: Sequelize.NUMERIC,
   est_birthdate: Sequelize.DATE,
   registration_number: Sequelize.INTEGER,
   rfid_tag: Sequelize.INTEGER,
   breed: Sequelize.STRING,
   single_brand: Sequelize.BOOLEAN,
   starting_date_of_feed: Sequelize.DATE,
   type_of_feed: Sequelize.STRING,
   est_completion_date: Sequelize.DATE,
   starting_weight: Sequelize.NUMERIC,
   est_finished_weight: Sequelize.NUMERIC,
   hanging_weight: Sequelize.NUMERIC,
   est_price_to_be_paid: Sequelize.NUMERIC,
   date_planted: Sequelize.DATE,
   seed_type: Sequelize.STRING,
   heirloom: Sequelize.BOOLEAN,
   gmo: Sequelize.BOOLEAN,
   fertilizer_type_used: Sequelize.STRING,
   pesticide_type_used: Sequelize.STRING,
   estimated_qty_planted: Sequelize.NUMERIC,
   estimated_finished_qty: Sequelize.NUMERIC,
   qty_accepted_for_listing: Sequelize.NUMERIC,
   qty_accepted_at_delivery: Sequelize.NUMERIC,
   chargebacks: Sequelize.NUMERIC,
   delivered_date: Sequelize.DATE,
   delivered_to: Sequelize.STRING
   },
   {tableName: "offered_item",
   timestamps: false
   }
);

module.exports = Offered_item;





