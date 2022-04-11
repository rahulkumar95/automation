const utils = require('../../utils');
const Schema = require('./employee.validate.schema');

const validateListEmployee = async (req, res, next) => {
  const data = req.body;
  const errors = await utils.joiValidate(data, Schema.listEmployeeValidationSchema);
  if (errors) throw errors;
  return next();
};

const validateSaveEmployee = async (req, res, next) => {
  const data = req.body;
  const errors = await utils.joiValidate(
    data,
    Schema.saveEmployeeValidationSchema,
  );
  if (errors) throw errors;
  return next();
};

const validateCheckEmployeeUsername = async (req, res, next) => {
  const data = req.query;
  const errors = await utils.joiValidate(
    data,
    Schema.checkEmployeeUsernameValidationSchema,
  );
  if (errors) throw errors;
  return next();
};

exports.validateListEmployee = validateListEmployee;
exports.validateSaveEmployee = validateSaveEmployee;
exports.validateCheckEmployeeUsername = validateCheckEmployeeUsername;
