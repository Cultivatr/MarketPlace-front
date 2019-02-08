// const crudData = require('../routes/crudData.js');
const express = require('express');
const db = require('../DB/producerQueries');
const router = express.Router();

router.get('/', db.getOfferedItemByUserId);
router.post('/addOfferedItem', db.addOfferedItemByUserId);

module.exports = router;
