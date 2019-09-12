var sql = require("mssql");
var conn = require("../config/dbconnection")();

var ExecuteQuery = (async function (sqlQry, callback) {
    try {
        await conn.connect().then(function () {
            var sqlQuery = sqlQry;
            var req = new sql.Request(conn);
            req.query(sqlQuery).then(function (recordset) {
                conn.close();
                callback(null, recordset.recordset);
            }).catch(function (err) {
                conn.close();
                callback(err);
    
            });
        }).catch(function (err) {
            conn.close();
            callback("Error while inserting data4:" + err);
        });
    } catch (err) {
        callback(err);
        
    }


})



/**
 * Author : Puneet Sharma
 * Date : 07 August 2019
 * Scope : Execute Stored Procedure.
 * @param {* Name of the procedure to be executed in SQL Server} procedureName 
 * @param {* Json of SQL Parameters} params 
 * @param {* res function to handle response}  
 */
var ExecuteProc = (async function (ProcedureName, Param, callback) {
    try {
        await conn.connect().then(function () {
            var transaction = new sql.Transaction(conn);
            transaction.begin().then(function () {
                var request = new sql.Request(transaction);
                var iLength = Object.keys(Param).length;
                for (var i = 0; i < iLength; i++) {
                    request.input(Object.keys(Param)[i], Param[Object.keys(Param)[i]])
                }
                request.execute(ProcedureName).then(function (recordset) {
                    transaction.commit().then(function (response) {
                        conn.close();
                        callback(null, recordset.recordset);
    
                    }).catch(function (err) {
                        conn.close();
                        callback(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    callback(err);
                });
            }).catch(function (err) {
                conn.close();
                callback(err);
            });
        }).catch(function (err) {
            conn.close();
            callback("Error while inserting data4:" + err);
        });
    } catch (err) {
        callback( err);
    }
    
})

var ExecuteProcWithJsonParam = (async function (ProcedureName, ParamName, ParamValue, callback) {
   
   try {
    await conn.connect().then(function () {
        var transaction = new sql.Transaction(conn);
        transaction.begin().then(function () {
            var request = new sql.Request(transaction);
            request.input(ParamName, ParamValue);
            request.execute(ProcedureName).then(function (recordset) {
                transaction.commit().then(function (response) {
                    conn.close();
                    callback(null, recordset.recordset);
                }).catch(function (err) {
                    conn.close();
                    callback(err);
                });
            }).catch(function (err) {
                conn.close();
                callback(err);
            });
        }).catch(function (err) {
            conn.close();
            callback(err);
        });
    }).catch(function (err) {
        conn.close();
        callback(err);
    });
   } catch (err) {
    callback(err);
   }
    
})

var CreateErrorLogs = async function (errorHeading, errorContent, callback) {
    try {
        const Param =
        {
            ERRORSP: "NODE ERROR:" + errorHeading,
            ERRORReceived: errorContent
        }

        await conn.connect().then(function () {
            var transaction = new sql.Transaction(conn);
            transaction.begin().then(function () {
                var request = new sql.Request(transaction);
                var iLength = Object.keys(Param).length;
                for (var i = 0; i < iLength; i++) {
                    request.input(Object.keys(Param)[i], Param[Object.keys(Param)[i]])
                }
                request.execute("USP_CreateErrorLogs").then(function (recordset) {
                    transaction.commit().then(function (response) {
                        conn.close();
                        callback(null, 'Success');

                    }).catch(function (err) {
                        conn.close();
                        callback(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    callback(err);
                });
            }).catch(function (err) {
                conn.close();
                callback(err);
            });
        }).catch(function (err) {
            conn.close();
            callback(err);
        });

    } catch (err) {
        callback(err);
    }
};


module.exports.ExecuteQuery = ExecuteQuery;
module.exports.ExecuteProc = ExecuteProc;
module.exports.ExecuteProcWithJsonParam = ExecuteProcWithJsonParam;
module.exports.CreateErrorLogs = CreateErrorLogs;