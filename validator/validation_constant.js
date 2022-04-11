const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = Object.freeze({
  OBJECT_ID_VALIDATION: Joi.objectId(),
  EMAIL_VALIDATION: Joi.string().email().lowercase().strict(),
  DATE_VALIDATION: Joi.date(),
  PASSWORD_VALIDATION: Joi.string().min(6).max(15),
});
