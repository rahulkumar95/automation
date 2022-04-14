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

const editEmployeeValidationSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  username: Joi.string(),
  email: validationConstant.EMAIL_VALIDATION,
});

const checkEmployeeUsernameValidationSchema = Joi.object().keys({
  username: Joi.string().required(),
});

const deleteEmployeeValidationSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
});

exports.listEmployeeValidationSchema = listEmployeeValidationSchema;
exports.saveEmployeeValidationSchema = saveEmployeeValidationSchema;
exports.editEmployeeValidationSchema = editEmployeeValidationSchema;
exports.checkEmployeeUsernameValidationSchema = checkEmployeeUsernameValidationSchema;
exports.deleteEmployeeValidationSchema = deleteEmployeeValidationSchema;
