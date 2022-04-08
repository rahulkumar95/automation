const _ = require('lodash');
const constant = require('./constant/constant');

const isEmpty = (data) => _.isEmpty(data);

const pick = (data, values) => _.pick(data, values);

const constructJSONFromQueryResult = (result) => result.map((v) => ({ ...v }));

const checkInArray = (arr, value) => arr.includes(value);

const deleteUndefinedFields = (obj) => {
  const objectDetails = obj;
  Object.keys(obj).forEach((key) => {
    if (checkInArray(constant.FALSE_VALUES, obj[key])) {
      delete objectDetails[key];
    }
  });
  return objectDetails;
  // return _.pickBy(obj, _.identity)
};

const generateErrorMessage = (type, field, limit, valids, values, error) => ({
  type,
  field,
  limit,
  valids,
  values,
  error,
});

const processJoiError = (error) => {
  const errors = [];
  const error_list = error.details;
  Object.keys(error_list).forEach((key) => {
    const item = error_list[key];
    let errorDetail = generateErrorMessage(
      item.type,
      item.path.join('.'),
      item.context.limit,
      item.context.valids,
    );
    errorDetail = deleteUndefinedFields(errorDetail);
    errors.push(errorDetail);
  });
  return errors;
};

const generateErrorResponse = (errorDetails) => {
  const errors = [];
  errorDetails.forEach((obj) => {
    errors.push(deleteUndefinedFields(obj));
  });
  return deleteUndefinedFields({
    errors,
  });
};

exports.processJoiError = processJoiError;
exports.isEmpty = isEmpty;
exports.constructJSONFromQueryResult = constructJSONFromQueryResult;
exports.generateErrorResponse = generateErrorResponse;
exports.generateErrorMessage = generateErrorMessage;
exports.pick = pick;
