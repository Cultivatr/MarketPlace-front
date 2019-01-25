const sequelize = require('../util/database');
const Users = require('../models/users');
const R_product = require('../models/r_product');
const Offered_item = require('../models/offered_item');
const R_status = require('../models/r_status');
const Status_tracker = require('../models/status_tracker');
const R_facility = require('../models/r_facility');

const getOfferedItemById = async (user_id) => {
	//let user_id;
	const offered_items = await Offered_item.findAll({
		raw: true,
		where: {
			user_id: user_id
		}
	});
	console.log('im in ', offered_items);
	return offered_items;
};

module.exports = getOfferedItemById;
