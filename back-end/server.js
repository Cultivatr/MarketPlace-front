const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// const crudData = require('./routes/crudData.js');
const producerRoutes = require('./routes/producerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}))
app.use('/producer', producerRoutes);
app.use('/admin', adminRoutes);
app.use(cors());

app.listen(8080, () => {
    console.log('app is running on port 8080');
});