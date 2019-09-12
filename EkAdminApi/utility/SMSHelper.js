const axios = require('axios');
const replaceString = require('replace-string');
const DynamicSqlHelper = require('./DynamicSqlHelper');
exports.SendSMS = (async function (AccountID, smsConfig, callback) {
    var url = smsConfig.sms_api_url;
    url = replaceString(url, '@UserName', smsConfig.sms_api_user);
    url = replaceString(url, '@Password', smsConfig.sms_api_password);
    url = replaceString(url, '@SenderID', smsConfig.sms_api_senderID);
    url = replaceString(url, '@MobileNumber', smsConfig.sms_mobile_no);
    url = replaceString(url, '@Message', replaceString(smsConfig.sms_content, '', ''));
    let result = {
        Result: false,
        ErrorDescription: null
    };
    await axios.get(url)
        .then((response) => {
            result.Result = true;
            result.ErrorDescription = response.data
            const smsLogdata = {
                ID: smsConfig.sms_log_id,
                Response: JSON.stringify(result),
                Success: 1
            };
            DynamicSqlHelper.ExecuteProc(AccountID, "usp_create_smsLog", smsLogdata, function (err, data) {
            });

            callback(null, result);
        })
        .catch(error => {

            result.ErrorDescription = error
            const smsLogdata = {
                ID: smsConfig.sms_log_id,
                Response: JSON.stringify(result),
                Success: 0
            };
            DynamicSqlHelper.ExecuteProc(AccountID, "usp_create_smsLog", smsLogdata, function (err, data) {
            });
            DynamicSqlHelper.CreateErrorLogs(AccountID, "SMS error", JSON.stringify(error), function (err, data) {
            });
            callback(result);
        });
});
exports.Send_SMS = async function (AccountID, smsConfig) {
    return new Promise((resolve, reject) => {
        var url = smsConfig.sms_api_url;
        url = replaceString(url, '@UserName', smsConfig.sms_api_user);
        url = replaceString(url, '@Password', smsConfig.sms_api_password);
        url = replaceString(url, '@SenderID', smsConfig.sms_api_senderID);
        url = replaceString(url, '@MobileNumber', smsConfig.sms_mobile_no);
        url = replaceString(url, '@Message', replaceString(smsConfig.sms_content, '', ''));
        let result = {
            Result: false,
            ErrorDescription: null
        };
         axios.get(url)
            .then((response) => {
                result.Result = true;
                result.ErrorDescription = response.data
                const smsLogdata = {
                    ID: smsConfig.sms_log_id,
                    Response: JSON.stringify(result),
                    Success: 1
                };
                DynamicSqlHelper.ExecuteProc(AccountID, "usp_create_smsLog", smsLogdata, function (err, data) {
                });

                resolve(result);
            })
            .catch(error => {

                result.ErrorDescription = error
                const smsLogdata = {
                    ID: smsConfig.sms_log_id,
                    Response: JSON.stringify(result),
                    Success: 0
                };
                DynamicSqlHelper.ExecuteProc(AccountID, "usp_create_smsLog", smsLogdata, function (err, data) {
                });
                DynamicSqlHelper.CreateErrorLogs(AccountID, "SMS error", JSON.stringify(error), function (err, data) {
                });
                reject(result);
            });
    });


}

