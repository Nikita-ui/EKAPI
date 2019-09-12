var sql = require("mssql");
const fs = require('fs');
let dbconfigData = JSON.parse(fs.readFileSync('./config/dbconfig.json', 'utf-8'))

var connect = function () {
    var conn = new sql.ConnectionPool({
        user: dbconfigData.user,
        password: dbconfigData.password,
        server: dbconfigData.server,
        database: dbconfigData.database,
        port: dbconfigData.port,
        pool: {
            idleTimeoutMillis: 60000
        },
        requestTimeout: 60000,
        options: {
            encrypt: true
        }
    });

    return conn;
};
 
module.exports=connect;
 