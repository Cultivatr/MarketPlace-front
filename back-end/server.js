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
const producerRoutes = require('./routes/producerRoutes');
app.use('/producer', producerRoutes);


// Relationships
Users.hasMany(Offered_item, { foreignKey: 'user_id' });
Offered_item.belongsTo(Users, { foreignKey: 'user_id' });
Offered_item.belongsTo(R_product, { foreignKey: 'product_id' });
Status_tracker.belongsTo(Offered_item, { foreignKey: 'offer_id' });
Status_tracker.belongsTo(R_status, { foreignKey: 'status_id' });

// ****** this method will drop existing tables and re-create tables, you will lose your data
// ****** comment this out when going into production

// sequelize.sync({ force: true });

// ******************************************************************************************

const port = 8080;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
