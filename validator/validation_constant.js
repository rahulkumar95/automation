const Joi = require('@hapi/joi');

module.exports = Object.freeze({
  EMAIL_VALIDATION: Joi.string().email().lowercase().strict(),
  DATE_VALIDATION: Joi.date(),
  PASSWORD_VALIDATION: Joi.string().min(6).max(15),
});
