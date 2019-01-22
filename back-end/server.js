const express = require('express');

// models
const sequelize = require('./util/database');
const User = require('./models/user');
const Product = require('./models/product');
const Offered_item = require('./models/offered_item');
const Status = require('./models/status');
const Status_tracker = require('./models/status_tracker');
const Facility = require('./models/facility');

const app = express();

// Relationships
// Product.belongsTo(User);
// User.hasMany(Product);
Offered_item.belongsTo(User);
Offered_item.belongsTo(Product);
// Offered_item.belongsTo(Status);
Status_tracker.belongsTo(Offered_item);
Status_tracker.belongsTo(Status);

sequelize.sync({force:true});

const port = 8080;
app.listen(port, () => {
   console.log(`Server running on port ${port}`)
});