const crudData = require('../routes/crudData.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser)

const router = express.Router();

ifSecuredUser = async (token) => {
	return 1;
};

router.get('/', function(req, res, next) {
	ifSecuredUser(req).then((securedUser) => 
		crudData.getOfferedItemByUserId(securedUser)
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

router.post('/addOfferedItem', function(req, res, next) {
	ifSecuredUser(req).then((securedUser) => {
		let data = {
			user_id: securedUser,
			breed: req.body.breed,
			type_of_feed: req.body.type_of_feed
		};
		crudData.addOfferedItemByUserId(data)
			.then((newItem) =>
				res.json({
					error:false,
					data:newItem
				})
			)
			.catch((error) =>
				res.json({
					error: true,
					data: [],
					error: error
				})
			)
		});
	});

module.exports = router;
