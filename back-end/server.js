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
app.use(producerRoutes);
// ifSecuredUser = async (token) => {
// 	return true;
// };
// app.get('/', function(req, res, next) {
// 	ifSecuredUser(req).then(
// 		crudData
// 			.getOfferedItemByUserId(1)
// 			.then((lemi) =>
// 				res.json({
// 					error: false,
// 					data: lemi
// 				})
// 			)
// 			.catch((error) =>
// 				res.json({
// 					error: true,
// 					data: [],
// 					error: error
// 				})
// 			)
// 	);
// });

// Relationships
// Product.belongsTo(User);
Users.hasMany(Offered_item, { foreignKey: 'user_id' });
Offered_item.belongsTo(Users, { foreignKey: 'user_id' });
Offered_item.belongsTo(R_product, { foreignKey: 'product_id' });
// Offered_item.belongsTo(Status);
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
