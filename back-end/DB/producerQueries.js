const pool = require('../connection');

ifSecuredUser = async (token) => {
	return 1;
};

const getOfferedItemByUserId = (req, res, user_id) => {
    let queryText = `SELECT OFFERED_ITEM.*, STATUS_TRACKER.*, R_STATUS.STATUS_NAME \
	FROM OFFERED_ITEM \
	FULL JOIN STATUS_TRACKER \
	ON OFFERED_ITEM.ID = STATUS_TRACKER.OFFER_ID \
	INNER JOIN R_STATUS \
	ON STATUS_TRACKER.STATUS_ID = R_STATUS.ID \
	WHERE USER_ID = ${user_id} \
    AND END_DATE IS NULL;`
    
    pool.query(queryText, function (error, results) {
        ifSecuredUser(req).then((securedUser) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        })
    })
};

const addOfferedItemByUserId = (req, res, data) => {
    let queryText = ``

    pool.query(queryText, function (error, results) {
        ifSecuredUser(req).then((securedUser) => {
            let data = {
                user_id: securedUser,
                breed: req.body.breed,
                type_of_feed: req.body.type_of_feed
            };
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        })
    })
};

const addEntryForStatusTrackerByOfferId = (req, res, item_id) => {
    let queryText = ``

    pool.query(queryText, function (error, results) {
        ifSecuredUser(req).then((securedUser) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        })
    })
}
    
module.exports = { 
    getOfferedItemByUserId, 
    addOfferedItemByUserId, 
    addEntryForStatusTrackerByOfferId,
};