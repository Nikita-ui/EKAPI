const redisClient = require('../config/RedisCache');

const createkey = async function (key, value, timespan) {
    return new Promise((resolve, reject) => {
        try {
            redisClient.set(key, value);
            if(timespan!=undefined)
            {
                redisClient.expire(key, timespan);
            }
            
            //  redisClient.flushall();
            resolve({ Success: true, errordescription: 'Key Successfully Created' });

        } catch (error) {
            resolve({ Success: false, errordescription: error });
        }
    })
}
const get_key = async function (key) {
    return new Promise((resolve, reject) => {
        return redisClient.get(key, (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                resolve(resultJSON);
            } else {
                reject(err);
            }
        });
    })
}

const del_key = async function (key) {
    return new Promise((resolve, reject) => {
        return redisClient.del(key, (err, result) => {
            if (result) {
                const resultJSON = JSON.parse(result);
                resolve(resultJSON);
            } else {
                reject(err);
            }
        });
    })
}

module.exports = {
    get_key: get_key,
    createkey:createkey,
    del_key: del_key

}

