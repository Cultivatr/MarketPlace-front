const sequelize = require('../util/database');
const Users = require('../models/users');
const R_product = require('../models/r_product');
const Offered_item = require('../models/offered_item');
const R_status = require('../models/r_status');
const Status_tracker = require('../models/status_tracker');
const R_facility = require('../models/r_facility');

exports.getOfferedItemByUserId = async (user_id) => {
	const firstJoin = await Offered_item.findAll({
		raw: true,
		where: {
			user_id: user_id
		},
		// include: [Status_tracker]
	});






	// const offered_items_status = await // join Offered_item and Status tracker // 
	// ({
	// 	raw: true,
	// 	where: {
	// 		user_id: user_id
	// 	}
	// })
	return firstJoin;
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


