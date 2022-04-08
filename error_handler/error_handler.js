const debug = require('debug')('automation:ErrorHandler');
const utils = require('../utils');

const internalError = (res) => {
  res
    .status(500)
    .json({
      error: 'internal_server_error',
    });
};

const validationError = (res, error) => {
  let errorResponse = [];
  if (error.isJoi) {
    errorResponse = utils.processJoiError(error);
  } else if (Array.isArray(error.details)) {
    errorResponse = error.details;
  } else {
    errorResponse.push(error.details);
  }
  errorResponse = utils.generateErrorResponse(errorResponse);
  res
    .status(422)
    .json(errorResponse);
};

const urlNotFoundError = (res, error) => {
  let errorResponse = [];
  errorResponse.push(utils.generateErrorMessage(error.name));
  errorResponse = utils.generateErrorResponse(errorResponse);
  res
    .status(404)
    .json(errorResponse);
};

const invalidCredentialsError = (res, error) => {
  let errorResponse = [];
  errorResponse.push(utils.generateErrorMessage(error.name));
  errorResponse = utils.generateErrorResponse(errorResponse);
  res
    .status(401)
    .json(errorResponse);
};

const authorizationError = (res, error) => {
  let errorResponse = [];
  errorResponse.push(
    utils.pick(error, ['name', 'is_permission_denied', 'is_token_expired']),
  );
  errorResponse = utils.generateErrorResponse(errorResponse);
  res
    .status(403)
    .json(errorResponse);
};

const sendErrorMessage = (req, res, error) => {
  debug('Error Details : ', error);
  const error_name = error.name;
  switch (error_name) {
    case 'ValidationError':
      validationError(res, error);
      break;
    case 'InvalidCredentialsError':
      invalidCredentialsError(res, error);
      break;
    case 'AuthorizationError':
      authorizationError(res, error);
      break;
    case 'UrlNotFoundError':
      urlNotFoundError(res, error);
      break;
    default:
      internalError(res);
      break;
  }
};

module.exports = sendErrorMessage;
