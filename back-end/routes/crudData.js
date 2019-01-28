const sequelize = require('../util/database');
const Users = require('../models/users');
const R_product = require('../models/r_product');
const Offered_item = require('../models/offered_item');
const R_status = require('../models/r_status');
const Status_tracker = require('../models/status_tracker');
const R_facility = require('../models/r_facility');

exports.getOfferedItemByUserId = async (user_id) => {
	const offered_items = await Offered_item.findAll({
		raw: true,
		where: {
			user_id: user_id
		}
	});

	return offered_items;
};
exports.addOfferedItemByUserId = async (user_id) => {
	let add_newItem = await Offered_item.create(
		{
			user_id: 1,
			breed: 'lemi',
			type_of_feed: 'jeff'
		},
		{
			include: [ { association: Offered_item.belongsTo(Users, { foreignKey: 'user_id' }) } ]
		}
	);

	return add_newItem;
};
exports.deleteOfferedItemByItemId = async (user_id) => {
	let deleteItem = await Offered_item.destroy({
		where: { breed: 'barry' }
	});
	return deleteItem;
};

exports.updateOfferedItemByItemId = async (item_id) => {
	const newData = {
		breed: 'barry'
	};
	let offeredItems = await Offered_item.update(newData, { where: { id: item_id } });
	return offeredItems;
};
