const Joi = require("@hapi/joi");

const registration = Joi.object().keys({
    companyName: Joi.string().required(),
    companyEmail: Joi.string().email().required(),
    companyPhone: Joi.string().required(),
    companyAddress: Joi.string().required(),
    pass: Joi.string().required()
});

module.exports = { registration };
