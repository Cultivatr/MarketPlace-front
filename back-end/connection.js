const Pool = require('pg').Pool
const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'cultivatr',
    password: 'evolveu',
    port: 5432,
})

module.exports = pool;