var sql = require("mssql");
//var conn = require("../config/dbconnection")();
var DynamicConn = require("../config/DynamicDbConnection");

var ExecuteQuery = async (AccountID, sqlQry, callback) => {
    await DynamicConn.DynamicConnection(AccountID, function (err, conn) {
        if (err) {
            console.log("Dyanmic erro", err);
            callback(err);
        }
        else {
            conn.connect().then(function () {
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

        }

    });


};



/**
 * Author : Puneet Sharma
 * Date : 07 August 2019
 * Scope : Execute Stored Procedure.
 * @param {* Name of the procedure to be executed in SQL Server} procedureName 
 * @param {* Json of SQL Parameters} params 
 * @param {* res function to handle response}  
 */
var ExecuteProc = (async (AccountID, ProcedureName, Param, callback) => {

    await DynamicConn.DynamicConnection(AccountID, function (err, conn) {

        if (err) {
            console.log("Dyanmic erro", err);
            callback(err);
        }
        else {
            conn.connect().then(function () {
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

        }

    });



})


const ExecuteProcWithPromise = async function (AccountID, ProcedureName, Param){

    return new Promise((resolve, reject) => {
         DynamicConn.DynamicConnection(AccountID, function (err, conn) {

            if (err) {
                console.log("Dyanmic erro", err);
                reject(err);
            }
            else {
                conn.connect().then(function () {
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
                                
                                resolve( recordset.recordset);


                            }).catch(function (err) {

                                conn.close();

                                reject(err);
                            });
                        }).catch(function (err) {
                            conn.close();
                            reject(err);
                        });
                    }).catch(function (err) {
                        conn.close();

                        reject(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    reject("Error while inserting data4:" + err);
                });

            }

        });
    })




}


var ExecuteProcWithOutputParam = (async (AccountID, ProcedureName, inputParam, outputParam, callback) => {
    try {
        await DynamicConn.DynamicConnection(AccountID, function (err, conn) {
            if (err) {
                console.log("Dyanmic erro", err);
                callback(err);
            }
            else {
                conn.connect().then(function () {
                    var transaction = new sql.Transaction(conn);
                    transaction.begin().then(function () {
                        var request = new sql.Request(transaction);
                        var iLength = Object.keys(Param).length;
                        for (var i = 0; i < iLength; i++) {
                            request.input(Object.keys(Param)[i], Param[Object.keys(Param)[i]])
                        }
                        var JLength = outputParam.length;

                        for (var i = 0; i < JLength; i++) {
                            if (outputParam[i].DataType === "INT") {
                                request.output(outputParam[i].ParamName, sql.Int);
                            }
                            else {
                                request.output(outputParam[i].ParamName, sql.VarChar(1000));
                            }
                        }


                        request.execute(ProcedureName).then(function (recordset) {
                            transaction.commit().then(function (response) {
                                conn.close();
                                callback(null, { data: recordset.recordset, output: recordset.output });

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

            }

        })
    } catch (err) {
        callback(err);
    }




})

var ExecuteProcWithJsonParam = (async function (AccountID, ProcedureName, ParamName, ParamValue, callback) {

    try {
        await DynamicConn.DynamicConnection(AccountID, function (err, conn) {
            if (err) {
                console.log("Dynamic erro", err);
                callback(err);
            }
            else {
                conn.connect().then(function () {
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

            }

        })
    } catch (error) {
        callback(error);
    }



})

var CreateErrorLogs = async function (AccountID, errorHeading, errorContent, callback) {

    await DynamicConn.DynamicConnection(AccountID, function (err, conn) {
        if (err) {
            console.log("Dyanmic erro", err);
            callback(err);
        }
        else {
            try {
                const Param =
                {
                    ERRORSP: "NODE ERROR:" + errorHeading,
                    ERRORReceived: errorContent
                }

                conn.connect().then(function () {
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

        }

    });

};


module.exports.ExecuteQuery = ExecuteQuery;
module.exports.ExecuteProc = ExecuteProc;
module.exports.ExecuteProcWithJsonParam = ExecuteProcWithJsonParam;
module.exports.CreateErrorLogs = CreateErrorLogs;
module.exports.ExecuteProcWithOutputParam = ExecuteProcWithOutputParam;
module.exports.ExecuteProcWithPromise=ExecuteProcWithPromise;