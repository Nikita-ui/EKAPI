const DynamicSqlHelper = require('../../utility/DynamicSqlHelper');
const routeMasterJson = require('../../config/route.js')
const SMSService = require('../../utility/SMSHelper');
const EmailService = require('../../utility/EmailHelper');
var MasterMethod = (async function (req, res) {
    console.log("Master Controller");
    if (req.body.accountid === undefined) {
        res.status(404).send("accountid is missing in request");
    }
    var accountid = req.body.accountid;

    var FilteredSchema = routeMasterJson.routeJsonList.find(o => o.MasterRoute === req.url);
    if (FilteredSchema === undefined) {
        res.status(404).send("invalid url, use lowercase for url");
    }
    let requestedSchema = FilteredSchema.Schema;

    if (requestedSchema.StoreProc === false || (requestedSchema.StoreProc === true && requestedSchema.IsParamRequired === false)) {

        var Qry = requestedSchema.SqlQuery;
        if (requestedSchema.StoreProc === true) {
            Qry = requestedSchema.SqlProcName;
        }
        await DynamicSqlHelper.ExecuteQuery(accountid, Qry, function (err, data) {
            if (err) {

                res.status(404).send(err)
            }
            else {
                res.json(data);
            }
        })
    }
    else if (requestedSchema.StoreProc === true && requestedSchema.IsParamRequired === true && requestedSchema.IsOutPutParamRequired === false) {
        var param = req.body;
        var valid = true; var errormessage = "";

        for (let index = 0; index < requestedSchema.ParameterInfo.length; index++) {
            if (requestedSchema.ParameterInfo[index].required === true) {

                errormessage = requestedSchema.ParameterInfo[index].errormessage;

                if (param[requestedSchema.ParameterInfo[index].parameterName] === undefined) {
                    valid = false;
                    break;
                }
                else if (param[requestedSchema.ParameterInfo[index].parameterName].length < requestedSchema.ParameterInfo[index].minlength || param[requestedSchema.ParameterInfo[index].parameterName].length > requestedSchema.ParameterInfo[index].maxlength) {
                    errormessage = "Invalid length of " + requestedSchema.ParameterInfo[index].parameterName + " should be between (" + requestedSchema.ParameterInfo[index].minlength + " to " + requestedSchema.ParameterInfo[index].maxlength + ")";
                    valid = false;
                    break;
                }
            }
        }
        if (valid === false) {
            res.status(403).send(errormessage);
        }
        delete param["accountid"];

        await DynamicSqlHelper.ExecuteProc(accountid, requestedSchema.SqlProcName, param, function (err, data) {
            console.log(err, data);
            if (err) {
                res.status(404).send(err)
            }
            else {
                if (requestedSchema.smsEnabled === true || requestedSchema.emailEnabled === true) {
                    if (data.length > 0) {
                        if (requestedSchema.smsEnabled === true) {
                            var smsObject = data[0];
                            var SMSConfig = {
                                sms_api_url: smsObject.sms_api_url,
                                sms_api_user: smsObject.sms_api_user,
                                sms_api_password: smsObject.sms_api_password,
                                sms_api_senderID: smsObject.sms_api_senderID,
                                sms_mobile_no: smsObject.sms_mobile_no,
                                sms_content: smsObject.sms_content,
                                sms_log_id: smsObject.sms_log_id,
                            }
                            SMSService.SendSMS(accountid, SMSConfig, function (err, data) {
                                if (err) {
                                    res.json({ result: 'Fail', errordescription: err });
                                }
                                else {
                                    res.json({ result: 'Success', errordescription: "SMS Sent" });
                                }
                            });
                        }
                        if (requestedSchema.emailEnabled === true) {
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
                            EmailService.SendEmail(emailConfig, mailOptions).then((response) => {
                                res.json({ result: 'Success', errordescription: "Email Sent" });
                            }).catch(err => {
                                res.json({ result: 'Fail', errordescription: err });
                            });
                        }
                    }
                    else {
                        res.json({ result: 'Fail', errordescription: "unable to process request " });
                    }
                }
                else {
                    res.json(data);
                }
            }

        })
    }
    else if (requestedSchema.StoreProc === true && requestedSchema.IsParamRequired === true && requestedSchema.IsOutPutParamRequired === true) {
        var param = req.body;
        var valid = true; var errormessage = "";
        var Outparam = [];

        for (let index = 0; index < requestedSchema.ParameterInfo.length; index++) {
            if (requestedSchema.ParameterInfo[index].required === true) {

                errormessage = requestedSchema.ParameterInfo[index].errormessage;

                if (param[requestedSchema.ParameterInfo[index].parameterName] === undefined) {
                    valid = false;
                    break;
                }
                else if (param[requestedSchema.ParameterInfo[index].parameterName].length < requestedSchema.ParameterInfo[index].minlength || param[requestedSchema.ParameterInfo[index].parameterName].length > requestedSchema.ParameterInfo[index].maxlength) {
                    errormessage = "Invalid length of " + requestedSchema.ParameterInfo[index].parameterName + " should be between (" + requestedSchema.ParameterInfo[index].minlength + " to " + requestedSchema.ParameterInfo[index].maxlength + ")";
                    valid = false;
                    break;
                }
            }
            for (let index = 0; index < requestedSchema.OutParameterInfo.length; index++) {

                Outparam.push(
                    {
                        DataType: requestedSchema.OutParameterInfo[i].DataType,
                        ParamName: requestedSchema.OutParameterInfo[i].ParamName
                    }
                )

            }
            if (valid === false) {
                res.status(403).send(errormessage);
            }
            delete param["accountid"];

            await DynamicSqlHelper.ExecuteProcWithOutputParam(accountid, requestedSchema.SqlProcName, param, Outparam, function (err, data) {
                console.log(err, data);
                if (err) {
                    res.status(404).send(err)
                }
                else {
                    if (requestedSchema.smsEnabled === true || requestedSchema.emailEnabled === true) {
                        if (data.length > 0) {
                            if (requestedSchema.smsEnabled === true) {
                                var smsObject = data[0];
                                var SMSConfig = {
                                    sms_api_url: smsObject.sms_api_url,
                                    sms_api_user: smsObject.sms_api_user,
                                    sms_api_password: smsObject.sms_api_password,
                                    sms_api_senderID: smsObject.sms_api_senderID,
                                    sms_mobile_no: smsObject.sms_mobile_no,
                                    sms_content: smsObject.sms_content,
                                    sms_log_id: smsObject.sms_log_id,
                                }
                                SMSService.SendSMS(accountid, SMSConfig, function (err, data) {
                                    if (err) {
                                        res.json({ result: 'Fail', errordescription: err });
                                    }
                                    else {
                                        res.json({ result: 'Success', errordescription: "SMS Sent" });
                                    }
                                });
                            }
                            if (requestedSchema.emailEnabled === true) {
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
                                EmailService.SendEmail(emailConfig, mailOptions).then((response) => {
                                    res.json({ result: 'Success', errordescription: "Email Sent" });
                                }).catch(err => {
                                    res.json({ result: 'Fail', errordescription: err });
                                });
                            }
                        }
                        else {
                            res.json({ result: 'Fail', errordescription: "unable to process request " });
                        }
                    }
                    else {
                        res.json(data);
                    }
                }

            })
        }


    }
});

    module.exports = {
        MasterMethod
    }