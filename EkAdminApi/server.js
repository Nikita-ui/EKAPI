const express = require('express');
const jwt = require('jsonwebtoken');
const appConfig = require('./config/ÁppConfig.js');
var bodyParser = require('body-parser');
const expressJoi = require('express-joi-validator');
const SchemaValidator = require('./api/requestvalidator/RequestSchema');
const UserRegistrationController = require('./api/controller/userregistration-controller');
const MasterController = require('./api/controller/mastercontroller');
const routeJson = require('./config/route.js')
const DataEncryption = require('./utility/DataEncryption');
 


const app = express();
const port = process.env.port || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('trust proxy', true);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Dyanmic Route from JSON Array 
for (i = 0; i < routeJson.routeJsonList.length; i++) {
    if (routeJson.routeJsonList[i].Method === 'post') {
        if (routeJson.routeJsonList[i].tokenRequired === true) {
            app.post(routeJson.routeJsonList[i].MasterRoute, verifyToken, MasterController.MasterMethod);

        }
        else {
            app.post(routeJson.routeJsonList[i].MasterRoute, MasterController.MasterMethod);
        }
    }
}


// Token Process
app.post('/login', async function (req, res) {

    var user = req.body;
   
    if (user.userPassword === undefined || user.userName === undefined) {
        res.json({ message: "Please send user name and password" });
    }
    
    else {
        let pwd= await DataEncryption.encrypt(user.userPassword);
        user.userPassword=pwd.encrypt;
        var accountid = req.body.accountid;
                await UserRegistrationController.ValidateLogin(0, user).then((data) => {
            if (data.length > 0) {
                if (data[0].result.toString().toUpperCase() === "SUCCESS") {
                    jwt.sign({ user: user }, appConfig.SECRET_KEY, { expiresIn: appConfig.TOKEN_EXPIRY }, (err, token) => {
                        if (err) { res.json({ Result: 'fail', ErrorDescription: err }) }
                        else { res.json({ token: token, data: data[0] }) }
                    })
                }
                else { res.json({ data: data[0] }); }
            }
            else { res.json([{ result: 'Fail', errordescription: 'Unable to process your request please try again' }]) }

        }).catch(err => {
            res.status(404).send(err);
        })



    }

});
// End Login Process

//Format Of Token
// Authorization: Bearer <access_token>
//verify token
function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, appConfig.SECRET_KEY, (err, authData) => {
            if (err) {

                res.status(403).send(err);
            }
            else {
                next();
            }
        });

    }
    else {
        res.status(403).send('authorization is not definded');
    }

}
// End Token Process






 

// User Registration API
app.post('/RegisterUser', expressJoi(SchemaValidator.UserRegistrationSchema), UserRegistrationController.RegisterUser);
// End User Registration API

 
 

 
  

// User navigationmenu 

app.listen(port, () => {
    var datetime = new Date();
    var message = "Server is up on Port:- " + port + "Started at :- " + datetime;
    console.log(message);


});

