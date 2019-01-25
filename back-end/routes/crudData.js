const sequelize = require('../util/database');
const Users = require('../models/users');
const R_product = require('../models/r_product');
const Offered_item = require('../models/offered_item');
const R_status = require('../models/r_status');
const Status_tracker = require('../models/status_tracker');
const R_facility = require('../models/r_facility');

const getOfferedItemById = async () => {
	let offered_items;
	const lemi = await Offered_item.findAll({
		where: {
			user_id: 1
		}
	});
	return lemi.length;
};

module.exports = getOfferedItemById;
