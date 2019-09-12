var nodemailer = require('nodemailer');
const SqlHelper = require('./SqlHelper');

var SendEmail = async function (emailConfig, mailOptions) {
    var smtpConfig = {
        host: emailConfig.ServiceType,
        port: emailConfig.SenderPort,
        secure: emailConfig.Secure, // use SSL
        auth: {
            user: emailConfig.SenderEmail,
            pass: emailConfig.SenderPassword
        }
    };

    var transporter = nodemailer.createTransport(smtpConfig);
    await transporter.sendMail(mailOptions).then((response) => {
        console.log("Email Log :", response);
    }).catch(err => {
        console.log("Email  err Log :", err);
        SqlHelper.CreateErrorLogs("Email error", JSON.stringify(err), function (err, data) { });
    });

};
const SendEmailWithCallback = async function (emailConfig, mailOptions, callback) {

    var smtpConfig = {
        host: emailConfig.ServiceType,
        port: emailConfig.SenderPort,
        secure: emailConfig.Secure, // use SSL
        auth: {
            user: emailConfig.SenderEmail,
            pass: emailConfig.SenderPassword
        }
    };

    var transporter = nodemailer.createTransport(smtpConfig);
    await transporter.sendMail(mailOptions).then((response) => {
        console.log("Email Log :", response);
        callback(null, response);
    }).catch(err => {
        SqlHelper.CreateErrorLogs("Email error", JSON.stringify(err), function (err, data) { });
        callback(err);
    });

};
const Send_Email = async function (emailConfig, mailOptions) {
    return new Promise((resolve, reject) => {
        var smtpConfig = {
            host: emailConfig.ServiceType,
            port: emailConfig.SenderPort,
            secure: emailConfig.Secure, // use SSL
            auth: {
                user: emailConfig.SenderEmail,
                pass: emailConfig.SenderPassword
            }
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        transporter.sendMail(mailOptions).then((response) => { resolve(response); })
            .catch(err => {
                SqlHelper.CreateErrorLogs("Email error", JSON.stringify(err), function (err, data) { });
                reject(err);
            });
    });

};
module.exports = {
    SendEmail: SendEmail,
    SendEmailWithCallback: SendEmailWithCallback,
    Send_Email: Send_Email
}