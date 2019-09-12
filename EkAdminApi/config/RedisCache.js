const redis = require('redis');
const redisclient = redis.createClient(6379, 'localhost');

module.exports = redisclient;