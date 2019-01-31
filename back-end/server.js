const express = require('express');
const crudData = require('./routes/crudData.js');

// models
const sequelize = require('./util/database');
const Users = require('./models/users');
const R_product = require('./models/r_product');
const Offered_item = require('./models/offered_item');
const R_status = require('./models/r_status');
const Status_tracker = require('./models/status_tracker');
const R_facility = require('./models/r_facility');

const app = express();
app.use(express.json());
const producerRoutes = require('./routes/producerRoutes');
app.use('/producer', producerRoutes); // all producer routes start with /producer/...


// Relationships
Offered_item.belongsTo(Users, { foreignKey: 'user_id' });
Users.hasMany(Offered_item, { foreignKey: 'user_id' });

Status_tracker.belongsTo(Offered_item, { foreignKey: 'offer_id' });
//Offered_item.hasMany(Status_tracker, { foreignKey: 'offer_id' });

Offered_item.belongsTo(R_product, { foreignKey: 'product_id' });
R_product.hasMany(Offered_item, {foreignKey: 'product_id'});

Status_tracker.belongsTo(R_status, { foreignKey: 'status_id' });
R_status.hasMany(Status_tracker, {foreignKey: 'status_id'});

// ****** this method will drop existing tables and re-create tables, you will lose your data
// ****** comment this out when going into production

// sequelize.sync({ force: true });

// ******************************************************************************************

const port = 8080;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
