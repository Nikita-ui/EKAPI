var svgCaptcha = require('../../node_modules/svg-captcha');
var GetCaptcha = async function (req, res) {
  try {
    
    var text = await svgCaptcha.randomText(10);
    var captcha =  await svgCaptcha.create(text);
   
    res.status(200).send(captcha);
  } catch (error) { res.status(404).send(error); }
  // try {

   
  //   let attributes = { fill: 'red', stroke: 'black' };
  //   let options = { x: 0, y: 0, fontSize: 20, anchor: 'top', attributes: attributes };
  //   let randomstring = await makeid(6);
  //   let svg = textToSVG.getSVG(randomstring, options);
  //   var obj = {
  //     text: randomstring,
  //     data: svg
  //   }
  //   res.status(200).send(obj)
  // }
  // catch (error) { res.status(404).send(error); }


};
async function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports = {
  GetCaptcha: GetCaptcha
}

