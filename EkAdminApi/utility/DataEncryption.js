const crypto = require('crypto');
//const algorithm = 'aes-256-cbc';
const algorithm = require('../config/ÁppConfig');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = async function (text) {

    var mykey = crypto.createCipher('aes-128-cbc', 'aptkey!!!!!*&#&@^^#^#&@&@&@&@&@&@&@');
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return { encrypt: mystr };

    //      crypto.createDecipher('aes-128-cbc', 'mypassword')
    //     console.log('Key ',key);
    //     console.log('iv ',iv);

    //  let cipher = crypto.createCipheriv(algorithm.DATA_ENCRYPTION_ALGORITHM, Buffer.from(key), iv);
    //  let encrypted = cipher.update(text);
    //  encrypted = Buffer.concat([encrypted, cipher.final()]);
    //  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
const encrypt_data =  function (text) {
   
    var mykey = crypto.createCipher('aes-128-cbc', 'aptkey!!!!!*&#&@^^#^#&@&@&@&@&@&@&@');
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.final('hex');

    return mystr ;
    // return new Promise((resolve, reject) => {
    //     try {
    //         var mykey = crypto.createCipher('aes-128-cbc', 'aptkey!!!!!*&#&@^^#^#&@&@&@&@&@&@&@');
    //         var mystr = mykey.update(text, 'utf8', 'hex')
    //         mystr += mykey.final('hex');

    //         resolve({ encrypt: mystr });

    //     } catch (error) {
    //         reject(error);
    //     }

}


//      crypto.createDecipher('aes-128-cbc', 'mypassword')
//     console.log('Key ',key);
//     console.log('iv ',iv);

//  let cipher = crypto.createCipheriv(algorithm.DATA_ENCRYPTION_ALGORITHM, Buffer.from(key), iv);
//  let encrypted = cipher.update(text);
//  encrypted = Buffer.concat([encrypted, cipher.final()]);
//  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

const decrypt = async function (text) {

    return new Promise((resolve, reject) => {
        try {
            var mykey = crypto.createDecipher('aes-128-cbc', 'aptkey!!!!!*&#&@^^#^#&@&@&@&@&@&@&@');
            var mystr = mykey.update(text, 'hex', 'utf8')
            mystr += mykey.final('utf8');
            resolve({ decrypt: mystr });

        } catch (error) {
            reject(error);
        }

    })

    // let iv = Buffer.from(text.iv, 'hex');
    // let encryptedText = Buffer.from(text.encryptedData, 'hex');
    // let decipher = crypto.createDecipheriv(algorithm.DATA_ENCRYPTION_ALGORITHM, Buffer.from(key), iv);
    // let decrypted = decipher.update(encryptedText);
    // decrypted = Buffer.concat([decrypted, decipher.final()]);
    // return decrypted.toString();
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    encrypt_data: encrypt_data
}