const Joi = require('@hapi/joi');

const validationConstant = require('../validation_constant');

const loginValidationSchema = Joi.object().keys({
  email: validationConstant.EMAIL_VALIDATION.required(),
  password: validationConstant.PASSWORD_VALIDATION.required(),
});

const saveUserValidationSchema = Joi.object().keys({
  first_name: Joi.string().min(3).max(50).required(),
  last_name: Joi.string().min(1).max(50),
  email: validationConstant.EMAIL_VALIDATION.required(),
  password: validationConstant.PASSWORD_VALIDATION.required(),
  active: Joi.number().valid(1, 0),
});

exports.loginValidationSchema = loginValidationSchema;
exports.saveUserValidationSchema = saveUserValidationSchema;
