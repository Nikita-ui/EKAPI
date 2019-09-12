const DyanmicSqlHelper = require('../../utility/DynamicSqlHelper');

var CountiresList =  (req, res, next) => {
     if (req.body.accountid === undefined) {
        res.status(404).send("AccountID is missing in request");
        
    }
    var Qry = "Select * from Country order by CountryName";
    var accountid=req.body.accountid 
    DyanmicSqlHelper.ExecuteQuery(accountid,Qry, function (err, data) {
        
        if (err) {
            DyanmicSqlHelper.CreateErrorLogs(accountid,Qry, err, function (err, data1) {
                next();
            });
            res.status(400).send("Error while inserting data3:" + err);
        }
        else { res.json(data) }
    });
}
var StateList = function (req, res, next) {
     
    if (req.body.accountid === undefined) {
        res.status(404).send("AccountID is missing in request");
    }
    if (req.body.CountryName === undefined) {
        res.status(404).send("CountryName is missing in request");
    }
    var accountid=req.body.accountid 
    
    var Qry = "Select S.* from State S inner Join Country C on C.ID=S.CountryID where C.CountryName='" + req.body.CountryName + "' order by S.StateName";
    DyanmicSqlHelper.ExecuteQuery(accountid,Qry, function (err, data) {
        if (err) {

            DyanmicSqlHelper.CreateErrorLogs(AccountID,Qry, err, function (err, data) {
                next();
            });
            res.status(404).send("Error while inserting data3:" + err);
        }
        else { res.json(data) }
    });
}
var CurrencyList = (req, res, next) => {
    if (req.body.accountid === undefined) {
        res.status(404).send("AccountID is missing in request");
    }
    if (req.body.CountryName === undefined) {
        res.status(404).send("CountryName is missing in request");
    }
    var accountid=req.body.accountid 
    var Qry = "SELECT ID,CurrencyCode,CurrencyName,CurrencySymbol FROM Currency  where Country='" + req.body.CountryName + "' order by CurrencyCode";
    DyanmicSqlHelper.ExecuteQuery(accountid,Qry, function (err, data) {
        if (err) {
            DyanmicSqlHelper.CreateErrorLogs(Qry, err, function (err, data) {
                next();
            });
            res.status(404).send("Error while inserting data3:" + err);
        }
        else { res.json(data) }
    });
}
var SalutationList = (req, res, next) => {
    if (req.body.accountid === undefined) {
        res.status(404).send("accountid is missing in request");
    }
    var accountid=req.body.accountid 
    DyanmicSqlHelper.ExecuteQuery(accountid,"Select ID,TypeCode,TypeName from LookUpGroup  where TYPEGroup ='SALUTATION' and IsActive=1 Order by  TypeName", function (err, data) {
        if (err) { res.status(404).send("Error while inserting data3:" + err); }
        else { res.json(data) }
    });
}

var DomainAvailability = (req, res, next) => {
    if (req.body.DomainName === null || req.body.DomainName === undefined) {
        res.status(404).send("DomainName is missing in request");
    }
    if (req.body.DomainName.length < 3) {
        res.json({ available: false, message: 'Minimun 3 characters required for domain' });
    }
    if (req.body.accountid === undefined) {
        res.status(404).send("AccountID is missing in request");
    }
    var Qry = "select ID from Account where Domain='" + req.body.DomainName + "'";
    var accountid=req.body.accountid 
    DyanmicSqlHelper.ExecuteQuery(accountid,Qry, function (err, data) {
        if (err) {

            DyanmicSqlHelper.CreateErrorLogs(accountid,Qry, err, function (err, data) {
                next();
            });
            res.status(404).send("Error while inserting data3:" + err);
        }
        else {
            if (data.length === 0) {
                res.json({ available: true, message: 'domain is available' });
            }
            else {
                res.json({ available: false, message: 'This domain is already taken' });
            }
        }
    });
}

module.exports = {
    CountiresList: CountiresList,
    StateList: StateList,
    CurrencyList: CurrencyList,
    SalutationList: SalutationList,
    DomainAvailability: DomainAvailability
}