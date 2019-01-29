const crudData = require('../routes/crudData.js');

const express = require('express');
const router = express.Router();

//const sequelize = require('./util/database');
// const Users = require('../models/users');
// const R_product = require('../models/r_product');
// const Offered_item = require('../models/offered_item');
// const R_status = require('../models/r_status');
// const Status_tracker = require('../models/status_tracker');
// const R_facility = require('../models/r_facility');

ifSecuredUser = async (token) => {
	return true;
};

router.get('/', function(req, res, next) {
	ifSecuredUser(req).then(
		crudData
			.getOfferedItemByUserId(1)
			.then((lemi) =>
				res.json({
					error: false,
					data: lemi
				})
			)
			.catch((error) =>
				res.json({
					error: true,
					data: [],
					error: error
				})
			)
	);
});

module.exports = router;
