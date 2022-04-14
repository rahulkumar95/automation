const utils = require('../../utils');
const Schema = require('./audit.validate.schema');

const validateListAuditLog = async (req, res, next) => {
  const data = req.body;
  const errors = await utils.joiValidate(data, Schema.listAuditLogValidationSchema);
  if (errors) throw errors;
  return next();
};

const validateSaveAuditLog = async (req, res, next) => {
  const data = req.body;
  const errors = await utils.joiValidate(
    data,
    Schema.saveAuditLogValidationSchema,
  );
  if (errors) throw errors;
  return next();
};

const validateGetAuditLog = async (req, res, next) => {
  const data = req.params;
  const errors = await utils.joiValidate(
    data,
    Schema.getAuditLogValidationSchema,
  );
  if (errors) throw errors;
  return next();
};

const validateExportAuditLog = async (req, res, next) => {
  const data = req.query;
  const errors = await utils.joiValidate(
    data,
    Schema.exportAuditLogValidationSchema,
  );
  if (errors) throw errors;
  return next();
};

exports.validateListAuditLog = validateListAuditLog;
exports.validateSaveAuditLog = validateSaveAuditLog;
exports.validateGetAuditLog = validateGetAuditLog;
exports.validateExportAuditLog = validateExportAuditLog;
