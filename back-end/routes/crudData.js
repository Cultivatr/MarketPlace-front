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
	// let data = {
	// 	user_id: '1',
	// 	breed: 'lemi',
	// 	type_of_feed: 'jeff'
	// };
	let add_newItem = await Offered_item.create({
		// raw: true,
		user_id: 1,
		breed: 'lemi',
		type_of_feed: 'jeff'
		// });
		// Users.findByPk(1).then((user) => {
		// 	user
		// 		.createOffered_item({
		// 			breed: 'lemi',
		// 			type_of_feed: 'jeff'
		// 		})
		// 		.then((result) => console.log(result));
		// });
		//console.log(getOfferedItemByUserId(1));
		// const offered_items = await Offered_item.findAll({
		// 	raw: true,
		// 	where: {
		// 		user_id: user_id
		// 	}
	});

	return add_newItem;
};
//console.log(getOfferedItemByUserId(1));

//module.exports = getOfferedItemByUserId;

//addOfferedItemByUserId: addOfferedItemByUserId
