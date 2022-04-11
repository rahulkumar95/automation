const Joi = require('@hapi/joi');

const validationConstant = require('../validation_constant');

const listEmployeeValidationSchema = Joi.object().keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  username: Joi.string(),
  email: validationConstant.EMAIL_VALIDATION,
});

const saveEmployeeValidationSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  email: validationConstant.EMAIL_VALIDATION.required(),
});

const checkEmployeeUsernameValidationSchema = Joi.object().keys({
  username: Joi.string().required(),
});

exports.listEmployeeValidationSchema = listEmployeeValidationSchema;
exports.saveEmployeeValidationSchema = saveEmployeeValidationSchema;
exports.checkEmployeeUsernameValidationSchema = checkEmployeeUsernameValidationSchema;
