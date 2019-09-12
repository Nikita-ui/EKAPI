const Joi = require('../../node_modules/joi');

const DomainValidateSchema = {
    body: {
        domain: Joi.string().required(),
    }
};
const UserRegistrationSchema = {
    body: {
        domainname: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        country: Joi.string().required(),
        confirmpassword: Joi.string().required(),
        accountid: Joi.number().required(),
    }
}
const SignUpOTPSchema = {
    body: {
        otp: Joi.string().required(),
        email: Joi.string().email().required(),
        accountid: Joi.number().required()
    }
}
module.exports = {
    UserRegistrationSchema: UserRegistrationSchema,
    SignUpOTPSchema: SignUpOTPSchema,
    DomainValidateSchema: DomainValidateSchema
}