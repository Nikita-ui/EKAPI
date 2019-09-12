const esClient = require('../../config/ElasticSearch');
esClient.ping({ requestTimeout: Infinity }).then(() => {
    console.log('Elastic is up!.');

}).catch(err => {
    console.trace('elasticsearch cluster is down!');

})

const searchDocument = (async function (req, res) {
    let formfieldsdata = [];

    if (req.body.domainname === undefined) {
        res.json("domainname is missing");
        return;
    }
    if (req.body.accountid === undefined) {
        res.json("accountid is missing");
        return;
    }
    if (req.body.formname === undefined) {
        res.json("formname is missing");
        return;
    }
    if (req.body.language === undefined) {
        res.json("language is missing");
        return;
    }

    var payload = {
        query: {
            bool: {
                must: [
                    { match: { FormName: req.body.formname } },
                    { match: { LanguageCode: req.body.language } }

                ]
            }
        }
    }

    await esClient.search({
        index: req.body.domainname,
        type: "formfields",
        body: payload
    }).then((data) => {
        for (let index = 0; index < data.hits.hits.length; index++) {
            formfieldsdata.push(data.hits.hits[index]._source)
        }
        res.json(formfieldsdata);

    }).catch(err => {
        res.json(err);

    });
});
const CreateDomainIndex = async function (indexName) {
    return new Promise((resolve, reject) => {
        esClient.indices.create({
            index: indexName.toLowerCase()
        }).then(resp => {
            resolve(resp);
        })
            .catch(err => {
                console.log(err);
                reject({ acknowledged: false, err: err });
            })
    });

}
const CreateIndex = async function (indexName, id, type, data) {
    return new Promise((resolve, reject) => {
        bulkIndex(indexName, type, data).then(elasticresponse => {
            resolve(elasticresponse);
        }).catch(err => {
            reject(err);
        });
    });
}
const bulkIndex = async function bulkIndex(index, type, data) {
    return new Promise((resolve, reject) => {
        let bulkBody = [];
        let errordata = [];
        data.forEach(item => {
            bulkBody.push({
                index: {
                    _index: index,
                    _type: type,
                    _id: item.id
                }
            });
            bulkBody.push(item);
        });
        esClient.bulk({ body: bulkBody })
            .then(response => {
                let errorCount = 0;
                response.items.forEach(item => {
                    if (item.index && item.index.error) {
                        errordata.push({ index: item.index, error: item.index.error });
                    }
                });
                if (errorCount > 0) {
                    reject({ errorCount: errorCount, errordata: errordata });
                }
                else {
                    resolve({ errorCount: errorCount });
                }
            })
            .catch((err) => {
                reject(err);
            });
    })
}

module.exports = {
    searchDocument: searchDocument,
    CreateDomainIndex: CreateDomainIndex,
    CreateIndex: CreateIndex
}



