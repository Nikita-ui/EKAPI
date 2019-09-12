const SqlHelper = require('../../utility/SqlHelper');

var ValidateDomain = (async (req, res, next) => {
    const domaindata = {
        domain: req.body.domain,

    };
    await SqlHelper.ExecuteProc("usp_VerifyDomain", domaindata, function (err, data) {
        if (err) {
            res.status(404).send(err);
        }
        else {
            console.log(data);
            if (data.length > 0) {
                res.json(data[0]);

            }
            else {
                res.json(data);

            }
        }

    });
});

module.exports = {
    ValidateDomain: ValidateDomain
}
