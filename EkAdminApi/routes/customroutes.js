const express=require('express');
const CaptchaController = require('../controller/apiadmin/CountryStateController');

const router=express.Router();

router.get('/Captcha',CaptchaController.CaptchaController);


module.exports=router;

