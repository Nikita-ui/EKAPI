const DynamicSqlHelper = require('../../utility/DynamicSqlHelper');
const EmailService = require('../../utility/EmailHelper');
const SMSService = require('../../utility/SMSHelper');
const DataEncryption = require('../../utility/DataEncryption');
const ElasticService = require('./elasticsearch-controller')
var phone = require('../../node_modules/phone-regex');

var Register_User = async function (req, res, next) {


    if (req.body.accountid === undefined) {
        res.json({ result: 'Fail', errordescription: 'accountid is missing in request' })
        return;
    }
    if (req.body.password != req.body.confirmpassword) {

        res.json({ result: 'Fail', errordescription: 'Confirm password is not matching with password' })
        return;
    }
    if (!phone({ exact: true }).test(req.body.phone)) {
        res.json({ result: 'Fail', errordescription: 'mobile number is invalid' })
        return;
    }
    var accountid = req.body.accountid;
    var pwd = await DataEncryption.encrypt(req.body.password)

    var userdata = {
        AccountID: "0",
        registrationsteps: {
            accountdata: {
                claimtype: "pro",
                accountname: "",
                domainname: req.body.domainname,
                domain: "theaptsoftware.com",
                consumerdomain: "",
                cdomain: "",
                prefix: "",
                firstname: "",
                lastname: "",
                username: req.body.email,
                password: pwd.encrypt,
                email: req.body.email,
                phone: req.body.phone,
                country: req.body.country,
                state: "",
                city: "",
                address1: "",
                address2: "",
                zipcode: "",
                validfrom: "2019/08/09",
                validto: "2020/08/09",
                noofusers: "5",
                logourl: "",
                confirmemail: req.body.email,
                confirmpassword: pwd.encrypt,
                isdomainvalid: "Yes",
                iscdomainvalid: "Yes",
                organizationtype: ""
            }
        },
        isApprove: "0"

    };

    DynamicSqlHelper.ExecuteProcWithJsonParam(accountid, "usp_Account_SaveDetail", "AccountJSON", JSON.stringify(userdata), function (err, data) {
        if (err) {
            DynamicSqlHelper.CreateErrorLogs(accountid, "usp_Account_SaveDetail", err, function (err, data) {
                next();
            });
            res.status(400).send("Error while inserting data3:" + err);
        }
        else {
            if (data.length > 0) {
                if (data[0].result.toString().toUpperCase() === "SUCCESS") {
                    // DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_elastic_get_account_data", { accountid: data[0].accountid })
                    //     .then(responsedata => {
                    //         if (responsedata.length > 0) {
                    //             // ElasticService.CreateIndex("adminaccounts", data[0].accountid, "accounts", responsedata)
                    //             //     .then(elasticresponse => {
                    //             //         console.log(elasticresponse);
                    //             //     })
                    //             //     .catch((err) => {
                    //             //     });
                    //         }
                    //     })
                    //     .catch(error => {

                    //     });
                    // Email Process
                    var emailObject = data[0];
                    var mailOptions = {
                        from: emailObject.smtp_email,
                        to: emailObject.ToEmail,
                        subject: emailObject.EmailSubject,
                        html: emailObject.EmailBody,
                        bcc: emailObject.BccEmail
                    }
                    var emailConfig = {
                        ServiceType: emailObject.smtp_server,
                        SenderEmail: emailObject.smtp_email,
                        SenderPassword: emailObject.smtp_password,
                        SenderPort: emailObject.smtp_port,
                        Secure: emailObject.smtp_secure

                    }
                    EmailService.Send_Email(emailConfig, mailOptions).then((response) => {
                    }).catch(err => { console.log("email error log:"); });
                    // Email Process End

                    // SMS Process
                    var SMSConfig = {
                        sms_api_url: emailObject.sms_api_url,
                        sms_api_user: emailObject.sms_api_user,
                        sms_api_password: emailObject.sms_api_password,
                        sms_api_senderID: emailObject.sms_api_senderID,
                        sms_mobile_no: emailObject.sms_mobile_no,
                        sms_content: emailObject.sms_content,
                        sms_log_id: emailObject.sms_log_id
                    }

                    SMSService.Send_SMS(accountid, SMSConfig).then(data => { }).catch(err => { });

                    res.json({ result: data[0].result, errordescription: null });
                }
                else {
                    res.json({ result: data[0].result, errordescription: data[0].errordescription });

                }
            }
            else { res.status(404).send("Unable to process request"); }

        }
    });
}
const Validate_SignUp_Otp = async function (req, res, next) {
    if (req.body.accountid === undefined) { res.json({ result: 'Fail', errordescription: "accountid is missing in request" }); return; }
    if (req.body.email === undefined) { res.json({ result: 'Fail', errordescription: "email is missing in request" }); return; }
    if (req.body.otp === undefined) { res.json({ result: 'Fail', errordescription: "otp is missing in request" }); return; }
    const userdata = { email: req.body.email, otp: req.body.otp };
    var accountid = req.body.accountid;
    await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_AccountVerify", userdata)
        .then(data => {
            if (data[0].result.toString().toUpperCase() === "SUCCESS") {
                var emailObject = data[0];
                var SMSConfig = {
                    sms_api_url: emailObject.sms_api_url,
                    sms_api_user: emailObject.sms_api_user,
                    sms_api_password: emailObject.sms_api_password,
                    sms_api_senderID: emailObject.sms_api_senderID,
                    sms_mobile_no: emailObject.sms_mobile_no,
                    sms_content: emailObject.sms_content,
                    sms_log_id: emailObject.sms_log_id,
                }
                SMSService.Send_SMS(accountid, SMSConfig).then(data => { }).catch(err => { });
                res.json({ result: data[0].result, errordescription: data[0].errordescription });
            }
            else { res.json({ result: data[0].result, errordescription: data[0].errordescription }); }
        })
        .catch(err => {
            res.json({ result: 'Fail', errordescription: err })


        });
}
const CreateLoginLogs = (async (accountid, user, callback) => {

    const userdata = {
        username: user.username,
        password: user.password
    };

    await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_AccountLogin", userdata).then(data => {
        callback(null, data);
    }).catch(err => {
        callback(err);
    });

});
const Validate_Login = async function (accountid, user) {

    return new Promise((resolve, reject) => {
        const userdata = { username: user.username, password: user.userPassword };
        DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_IsValidUser", userdata).then((data) => { resolve(data); }).catch((error) => { reject(error); })

    })
}
const Resend_Otp = async function (req, res) {
    if (req.body.accountid === undefined) { res.json({ result: 'Fail', errordescription: "accountid is missing in request" }); return; }
    if (req.body.email === undefined) { res.json({ result: 'Fail', errordescription: "email is missing in request" }); return; }
    const userdata = { emailid: req.body.email };
    var accountid = req.body.accountid;
    await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_resend_otp_account_verifiaction", userdata).then(data => {
        if (data[0].result.toString().toUpperCase() === "SUCCESS") {
            var SmsObject = data[0];
            var SMSConfig = {
                sms_api_url: SmsObject.sms_api_url,
                sms_api_user: SmsObject.sms_api_user,
                sms_api_password: SmsObject.sms_api_password,
                sms_api_senderID: SmsObject.sms_api_senderID,
                sms_mobile_no: SmsObject.sms_mobile_no,
                sms_content: SmsObject.sms_content,
                sms_log_id: SmsObject.sms_log_id
            }

            SMSService.SendSMS(accountid, SMSConfig, function (err, data) {
                if (err) { res.json({ result: 'Fail', errordescription: err }) }
                else { res.json({ result: 'Success', errordescription: 'Otp sent successfully on ' + SmsObject.sms_masked_mobile_no }) }
            });
        }
        else {
            if (data.length) { res.json(data[0]); }
            else { res.json("Unable to process your request"); }
        }
    }).catch(err => { res.json({ result: 'Fail', errordescription: err }) })

}
const Resend_Activation_Email = async function (req, res) {
    if (req.body.accountid === undefined) {
        res.status(404).send("accountid is missing in request");
    }
    if (req.body.email === undefined) {
        res.status(404).send("email is missing in request");
    }
    const userdata = {
        emailid: req.body.email

    };


    var accountid = req.body.accountid;
    await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_resend_account_activation_email", userdata)
        .then(data => {
            if (data[0].result.toString().toUpperCase() === "SUCCESS") {
                var emailObject = data[0];
                var mailOptions = {
                    from: emailObject.smtp_email,
                    to: emailObject.ToEmail,
                    subject: emailObject.EmailSubject,
                    html: emailObject.EmailBody,
                    bcc: emailObject.BccEmail
                }

                var emailConfig = {
                    ServiceType: emailObject.smtp_server,
                    SenderEmail: emailObject.smtp_email,
                    SenderPassword: emailObject.smtp_password,
                    SenderPort: emailObject.smtp_port,
                    Secure: emailObject.smtp_secure

                }
                EmailService.Send_Email(emailConfig, mailOptions)
                    .then(data => {
                        res.json({ result: 'Success', errordescription: 'Email sent successfully.' });
                    })
                    .catch(err => {
                        res.json({ result: 'Fail', errordescription: 'Email not sent.' + err });
                    })

            }
            else {
                if (data.length) {
                    res.json(data[0]);
                }
                else {
                    res.json("Unable to process your request");

                }

            }
        })
        .catch(err => {
            res.status(404).send(err);
        })



}
const Forgot_Password = async function (req, res) {
    if (req.body.accountid === undefined) {
        res.status(404).send("accountid is missing in request");
        return;
    }
    if (req.body.email === undefined) {
        res.status(404).send("email is missing in request");
        return;
    }
    const userdata = {
        email: req.body.email

    };


    var accountid = req.body.accountid;
    await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_account_password_reset_email", userdata)
        .then(data => {
            if (data[0].result.toString().toUpperCase() === "SUCCESS") {
                var emailObject = data[0];
                var mailOptions = {
                    from: emailObject.smtp_email,
                    to: emailObject.ToEmail,
                    subject: emailObject.EmailSubject,
                    html: emailObject.EmailBody,
                    bcc: emailObject.BccEmail
                }
                var emailConfig = {
                    ServiceType: emailObject.smtp_server,
                    SenderEmail: emailObject.smtp_email,
                    SenderPassword: emailObject.smtp_password,
                    SenderPort: emailObject.smtp_port,
                    Secure: emailObject.smtp_secure
                }
                EmailService.Send_Email(emailConfig, mailOptions)
                    .then(data => {
                        res.json({ result: 'Success', errordescription: 'Email sent successfully.' });
                    })
                    .catch(err => {
                        res.json({ result: 'Fail', errordescription: 'Email not sent.' + err });
                    })
            }
            else {
                if (data.length) {
                    res.json(data[0]);
                }
                else {
                    res.json("Unable to process your request");

                }

            }

        })
        .catch(err => {
            res.status(404).send(err);
        })



}
const Request_Code_Validate = async function (req, res) {
    if (req.body.accountid === undefined) {

        res.json({ result: 'Fail', errordescription: 'accountid is missing in request' })
        return;

    }
    if (req.body.requestcode === undefined) {
        res.json({ result: 'Fail', errordescription: 'requestcode is missing in request' })
        return;
    }
    const userdata = {
        requestcode: req.body.requestcode

    };
    var accountid = req.body.accountid;
    await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_validate_forgot_password_verificationkey", userdata)
        .then(data => {
            if (data.length > 0) {
                res.json(data[0]);
            }
            else {
                res.json({ result: "Fail", errordescription: 'unable to process' });
            }
        })
        .catch(err => {
            res.status(404).send(err);
        })



}
const Reset_Password = async function (req, res) {
    if (req.body.accountid === undefined) {
        res.json({ result: 'Fail', errordescription: 'accountid is missing in request' })
        return;

    }
    if (req.body.requestcode === undefined) {
        res.json({ result: 'Fail', errordescription: 'requestcode is missing in request' })
        return;
    }
    if (req.body.password === undefined) {
        res.json({ result: 'Fail', errordescription: 'password is missing in request' })
        return;
    }


    await DataEncryption.encrypt(req.body.password).then(data => {
        const userdata = {
            requestcode: req.body.requestcode,
            password: data.encrypt

        };
        var accountid = req.body.accountid;
        DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_change_password", userdata)
            .then(data => {
                if (data.length > 0) {
                    res.json(data[0]);
                }
                else {
                    res.json({ result: "Fail", errordescription: 'unable to process' });
                }
            })
            .catch(err => {
                res.status(404).send(err);
            })
    }).catch(err => {
        res.json({ result: 'Fail', errordescription: err })
        return;
    })

}

module.exports = {
    RegisterUser: Register_User,
    ValidateSignUpOtp: Validate_SignUp_Otp,
    ValidateLogin: Validate_Login,
    ResendOtp: Resend_Otp,
    ResendActivationEmail: Resend_Activation_Email,
    ForgotPassword: Forgot_Password,
    Requestcodevalidate: Request_Code_Validate,
    ResetPassword: Reset_Password

}