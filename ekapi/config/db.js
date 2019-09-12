require('dotenv').config();
const mssql = require("mssql");

const db_write = mysql.createConnection({
    host     : process.env.DB_WRITE_HOST || '104.211.167.190',
    user     : process.env.DB_USERNAME   || 'sa',
    password : process.env.DB_PASSWORD   || 'ekadmin@123#',
    database : process.env.DB_DATABASE   || 'EKAdminDB',
    port     : process.env.DB_PORT       || 1400
});

const db_read = mysql.createConnection({
    host     : process.env.DB_READ_HOST || '104.211.167.190',
    user     : process.env.DB_USERNAME  || 'sa',
    password : process.env.DB_PASSWORD  || 'ekadmin@123#',
    database : process.env.DB_DATABASE  || 'EKAdminDB',
    port     : process.env.DB_PORT      || 1400
});

db_write.connect(function(err) {
    if (err) throw err;
});

db_read.connect(function(err) {
    if (err) throw err;
});

module.exports = {db_write, db_read};