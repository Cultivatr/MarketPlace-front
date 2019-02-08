// const sequelize = require('../util/database');
// const Users = require('../models/users');
// const R_product = require('../models/r_product');
// const Offered_item = require('../models/offered_item');
// const R_status = require('../models/r_status');
// const Status_tracker = require('../models/status_tracker');
// const R_facility = require('../models/r_facility');

exports.deleteOfferedItemByItemId = async (item_id) => {
	let deleteItem = await Offered_item.destroy({
		where: { id: item_id }
	});
	return deleteItem;
};

exports.deleteStatus = async (statusId) => {
    console.log(statusId);
	let deleteStatus = await Status_tracker.destroy({
		where: { id: statusId[statusId.length - 1] }
	});
	return deleteStatus;
};

exports.getStatusId = async (statusId) => {
    let get_status_id = await Status_tracker.findAll({
        raw: true,
        where: { status_id: statusId }
    });
    return get_status_id;
};