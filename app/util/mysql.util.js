var mysql = require('mysql2');
const config = require('../config/index');

var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

module.exports=con;
