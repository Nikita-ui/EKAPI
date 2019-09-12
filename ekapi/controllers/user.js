const config = require('../config/app');
const jwt = require('jsonwebtoken')

const { db_write } = require('../config/db');
const Hash = require('crypto-js/pbkdf2');

function createUser(req, res) {
    let name = req.body.user.f_name;
    let email = req.body.user.email;
    let mobile = req.body.user.mobile;
    let company = req.body.user.company;
    let user_type = req.body.user.user_type;
    let defaultPass = "cloudconnect"; 
    let password = Hash(defaultPass, config.appSecret).toString();
    let created_by = req.body.user.user_id;
    let sql = 'INSERT into User (name, email, mobile, password, company_name, role, created_by)\
        values ("'+ name + '","' + email + '","' + mobile + '", "'+password+'", "'+company+'", "'+user_type+'", , "'+created_by+'")';
       
        db_write.query(sql, (err, resp, fields) => {
                if (!err) {
                    resp.json({
                        response
                    });
                }else {
                    resp.status(401).send({ error: 'error', message: 'DB Error: ' +err.message, sql });
                }
            });
       
}