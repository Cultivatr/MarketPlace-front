const sequelize = require('../util/database');
const Users = require('../models/users');
const R_product = require('../models/r_product');
const Offered_item = require('../models/offered_item');
const R_status = require('../models/r_status');
const Status_tracker = require('../models/status_tracker');
const R_facility = require('../models/r_facility');

exports.getOfferedItemByUserId = async (user_id) => {
	let queryText = `SELECT OFFERED_ITEM.*, STATUS_TRACKER.*, R_STATUS.STATUS_NAME \
	FROM OFFERED_ITEM \
	FULL JOIN STATUS_TRACKER \
	ON OFFERED_ITEM.ID = STATUS_TRACKER.OFFER_ID \
	INNER JOIN R_STATUS \
	ON STATUS_TRACKER.STATUS_ID = R_STATUS.ID \
	WHERE USER_ID = ${user_id} \
	AND END_DATE IS NULL;`

	const firstJoin = await sequelize.query(queryText);
	return firstJoin[0]; //sequelize.query returns [[results], [metadata]]
};

exports.addOfferedItemByUserId = async (data) => {
	let add_newItem = await Offered_item.create(data, {
		include: [ { association: Offered_item.belongsTo(Users, { foreignKey: 'user_id' }) } ]
	});
	return add_newItem;
};

exports.deleteOfferedItemByItemId = async (item_id) => {
	let deleteItem = await Offered_item.destroy({
		where: { id: item_id }
	});
	return deleteItem;
};

exports.updateOfferedItemByItemId = async (item_id, newData) => {
	let offeredItems = await Offered_item.update(newData, { where: { id: item_id } });
	return offeredItems;
};

exports.getItemDetailsByItemId = async (item_id) => {
	let itemDetails = await Offered_item.findOne({
		raw: true,
		where: {
			id: item_id
		}
	});
		return itemDetails;
};

// exports.testJoin = async () => {
// 	let testJoin = await Offered_item.findAll({
// 		include: [{
// 			model: Users,
// 			// as: 'offered_item',
// 			where: {
// 				id: 1
// 			}
// 			// required: true
// 		}],
// 		raw: true
// 	})
// 	return testJoin;
// }

exports.testJoin = async () => {
	let queryText = "SELECT OFFERED_ITEM.*, STATUS_TRACKER.*, R_STATUS.STATUS_NAME \
	FROM OFFERED_ITEM \
	FULL JOIN STATUS_TRACKER \
	ON OFFERED_ITEM.ID = STATUS_TRACKER.OFFER_ID \
	INNER JOIN R_STATUS \
	ON STATUS_TRACKER.STATUS_ID = R_STATUS.ID;"

	let testJoin = await sequelize.query(queryText)
	return testJoin[0];
}


