const validator = require("../validators/inputs");
const { formatErrorJoi } = require('../helpers/errorJoiFormat');
const { INVALID_DATA } = require('../helpers/constants');
const companyModel = require('../models/companyModel');

function registerValidator(req, res, next) {
  const { error } = validator.registration.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({
      status: 400,
      msg: INVALID_DATA,
      data: formatErrorJoi(error),
    });
  }
  next();
}

async function isEmailExist(req, res, next) {
  const { companyEmail = "" } = req.body;
  const result = await companyModel.searchCompany(companyEmail);
  if (result) {
    const error = {
      companyEmail: {
        code: 'invalid data',
        message: 'Email already exist'
      }
    }
    return res.status(400).json({
      status: 400,
      msg: INVALID_DATA,
      data: error,
    });
  }
  next();
}

module.exports = { registerValidator, isEmailExist }