var http = require("http");
var express = require('express');
var app = express();
var sql = require('mssql');
var bodyParser = require('body-parser');

//start sql connection
var connection = sql.createConnection({
  host     : 'localhostDESKTOP-OVEBFF1\SQLEXPRESS01', //sql database host name
  user     : '', //sql database user name
  password : '', //sql database password
  database : 'EK_Admin' //sql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with sql database...')
})
//end sql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

