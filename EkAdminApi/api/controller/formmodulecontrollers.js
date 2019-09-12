const DynamicSqlHelper = require('../../utility/DynamicSqlHelper');
const RedisClient = require('../../utility/RedisCacheClient')
//const RedisCache=require('./');
const Getformfields = (async function (req, res) {
    if (req.body.domainname === undefined) { res.json({ result: 'Fail', errordescription: 'domainname is missing in request' }); }
    else if (req.body.accountid === undefined) { res.json({ result: 'Fail', errordescription: 'accountid is missing in request' }); }
    else if (req.body.formname === undefined) { res.json({ result: 'Fail', errordescription: 'formname is missing in request' }) }
    else if (req.body.language === undefined) { res.json({ result: 'Fail', errordescription: 'language is missing in request' }); }
    else {
        var accountid = req.body.accountid;
        var body = { formname: req.body.formname, language: req.body.language }
        var rediskey = { ...body, domainname: req.body.domainname,accountid:accountid };
        let formfielddata = null;
        await RedisClient.get_key(JSON.stringify(rediskey)).then(data => {
            formfielddata = data;
        }).catch(err => {
            formfielddata = null;
        })
       
        if (formfielddata === null || formfielddata === undefined || formfielddata.length === 0) {
            await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_get_formfields", body)
                .then(data => {
                    if (data.length > 0) { formfielddata = data; }
                    else { formfielddata = null; res.json({ result: "Fail", errordescription: 'No Record found' }); }
                })
                .catch(err => { formfielddata = null; res.status(404).send(err); })

            await RedisClient.createkey(JSON.stringify(rediskey), JSON.stringify(formfielddata), undefined).then(res => { }).catch(err => { })
        }
        if (formfielddata != null) { res.json(formfielddata); }
    }



});

module.exports = {
    Getformfields: Getformfields
}