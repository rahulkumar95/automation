const utils = require('../../utils');
const Schema = require('./auth.validate.schema');

const validateLogin = async (req, res, next) => {
  const data = req.body;
  const errors = await utils.joiValidate(data, Schema.loginValidationSchema);
  if (errors) throw errors;
  return next();
};

const validateSaveUser = async (req, res, next) => {
  const data = req.body;
  const errors = await utils.joiValidate(
    data,
    Schema.saveUserValidationSchema,
  );
  if (errors) throw errors;
  return next();
};

const validateListUser = async (req, res, next) => {
  const data = req.query;
  const errors = await utils.joiValidate(
    data,
    Schema.listUserValidationSchema,
  );
  if (errors) throw errors;
  return next();
};

exports.validateLogin = validateLogin;
exports.validateSaveUser = validateSaveUser;
exports.validateListUser = validateListUser;
