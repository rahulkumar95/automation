const Joi = require('@hapi/joi');

const validationConstant = require('../validation_constant');

const listAuditLogValidationSchema = Joi.object().keys({
  activity_type: Joi.string().required(),
});

const saveAuditLogValidationSchema = Joi.object().keys({
  activity_type: Joi.string().required(),
  sap_id: Joi.string().required(),
  username: Joi.string().required(),
  email: validationConstant.EMAIL_VALIDATION.required(),
  status: Joi.string().required(),
  commands: Joi.string().required(),
  created_at: Joi.string().required(),
});

const getAuditLogValidationSchema = Joi.object().keys({
  id: Joi.number().integer().positive(),
});

const exportAuditLogValidationSchema = Joi.object().keys({
  id: Joi.number().integer().positive(),
  activity_type: Joi.string(),
  sap_id: Joi.string(),
  username: Joi.string(),
  email: validationConstant.EMAIL_VALIDATION,
  status: Joi.string(),
  commands: Joi.string(),
  created_at: Joi.string(),
});

exports.listAuditLogValidationSchema = listAuditLogValidationSchema;
exports.saveAuditLogValidationSchema = saveAuditLogValidationSchema;
exports.getAuditLogValidationSchema = getAuditLogValidationSchema;
exports.exportAuditLogValidationSchema = exportAuditLogValidationSchema;
