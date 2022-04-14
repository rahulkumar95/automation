const Joi = require('@hapi/joi');

const validationConstant = require('../validation_constant');

const loginValidationSchema = Joi.object().keys({
  email: validationConstant.EMAIL_VALIDATION.required(),
  password: validationConstant.PASSWORD_VALIDATION.required(),
});

const saveUserValidationSchema = Joi.object().keys({
  first_name: Joi.string().min(3).max(50).required(),
  last_name: Joi.string().min(1).max(50).required(),
  email: validationConstant.EMAIL_VALIDATION.required(),
  password: validationConstant.PASSWORD_VALIDATION.required(),
  active: Joi.number().valid(1, 0),
  role: Joi.string().required(),
});

const listUserValidationSchema = Joi.object().keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: validationConstant.EMAIL_VALIDATION,
  active: Joi.number().valid(1, 0),
  role: Joi.string(),
  id: Joi.number().integer().positive(),
});

const editUserValidationSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
  first_name: Joi.string().min(3).max(50),
  last_name: Joi.string().min(1).max(50),
  email: validationConstant.EMAIL_VALIDATION,
  active: Joi.number().valid(1, 0),
  role: Joi.string(),
});

const deleteUserValidationSchema = Joi.object().keys({
  id: Joi.number().integer().positive().required(),
});

exports.loginValidationSchema = loginValidationSchema;
exports.saveUserValidationSchema = saveUserValidationSchema;
exports.listUserValidationSchema = listUserValidationSchema;
exports.editUserValidationSchema = editUserValidationSchema;
exports.deleteUserValidationSchema = deleteUserValidationSchema;
