const DynamicSqlHelper = require('../../utility/DynamicSqlHelper');
const bcrypt = require('bcrypt');
const RedisClient = require('../../utility/RedisCacheClient')
const NavigationMenu = (async (req, res) => {
    if (req.body.accountid === undefined) { res.status(404).send("accountid is missing in request"); return; }
    var accountid = req.body.accountid;
    var userdata = { userid: req.body.userid, roletypeid: req.body.roletypeid };
    let menudata = null;
    var rediskey = { ...userdata, accountid: accountid };
    await RedisClient.get_key(JSON.stringify(rediskey)).then(data => { menudata = data; }).catch(err => { menudata = null; });
    if (menudata === null || menudata === undefined || menudata.length === 0) {
        await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_get_menu", userdata).then(data => { menudata = data; }).catch(err => { res.status(400).send(err); return })
        let menu = await CreateMenuTree(menudata, 0);
        if (menudata != null && menudata != undefined && menudata.length != 0) {
            await RedisClient.createkey(JSON.stringify(rediskey), JSON.stringify(menu), 3600).then(res => { }).catch(err => { })
        }
        res.json(menu);
    }
    else { res.json(menudata); }

});
const CreateMenuTree = (async (arr, parent) => {
    var out = []
    for (var i in arr) {
        if (arr[i].parentId == parent) {
            arr[i].encryptedurl = bcrypt.hashSync(arr[i].url, 1);
            var children = await CreateMenuTree(arr, arr[i].id)
            if (arr[i].id !== 1 && arr[i].parentId === 0)  // Excluding Dashboard from module display
            { out.push({ title: true, name: arr[i].name, }); }
            if (children.length) { arr[i].children = children }
            out.push(arr[i])
        }
    }
    return out
});

const GetDashboard = async (req, res) => {
    if (req.body.accountid === undefined) { res.status(404).send("accountid is missing in request"); return; }
    else if (req.body.roletypeid === undefined) { res.status(404).send("roletypeid is missing in request"); return; }
    else if (req.body.userid === undefined) { res.status(404).send("userid is missing in request"); return; }
    else if (req.body.sectioncode === undefined) { res.status(404).send("sectioncode is missing in request"); return; }
    else if (req.body.dashboardcode === undefined) { res.status(404).send("dashboardcode is missing in request"); return; }
    else if (req.body.customfilters === undefined) { res.status(404).send("customfilters is missing in request"); return; }
    else {
        var requestdata = {
            userid: req.body.userid,
            roletypeid: req.body.roletypeid,
            sectioncode: req.body.sectioncode,
            dashboardcode: req.body.dashboardcode,
            customfilters: req.body.customfilters
        };
        var accountid = req.body.accountid;
        if (requestdata.customfilters === null || requestdata.customfilters === undefined) { requestdata.customfilters = ""; }
        await DynamicSqlHelper.ExecuteProcWithPromise(accountid, "usp_get_dashboard", requestdata)
            .then(data => { res.json(data); })
            .catch(err => { res.status(400).send(err); })

    }


}

module.exports = {
    NavigationMenu: NavigationMenu,
    GetDashboard: GetDashboard
}