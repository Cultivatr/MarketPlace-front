const express = require('express');

// models
const sequelize = require('./util/database');
const Users = require('./models/users');
const R_product = require('./models/r_product');
const Offered_item = require('./models/offered_item');
const R_status = require('./models/r_status');
const Status_tracker = require('./models/status_tracker');
const R_facility = require('./models/r_facility');

const app = express();

// Relationships
// Product.belongsTo(User);
// User.hasMany(Product);
Offered_item.belongsTo(Users);
Offered_item.belongsTo(R_product);
// Offered_item.belongsTo(Status);
Status_tracker.belongsTo(Offered_item);
Status_tracker.belongsTo(R_status);

// ****** this method will drop existing tables and re-create tables, you will lose your data
// ****** comment this out when going into production

sequelize.sync({force:true}); 

// ******************************************************************************************

const port = 8080;
app.listen(port, () => {
   console.log(`Server running on port ${port}`)
}); 