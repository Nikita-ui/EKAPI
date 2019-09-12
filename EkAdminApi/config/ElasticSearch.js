const es = require('elasticsearch');
const esClient = new es.Client({
    host: 'http://elastic.server.theaptsoftware.in',
    log: 'trace'
});
module.exports = esClient;