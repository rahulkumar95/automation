require('./jwt.passport');

const passport = require('passport');
const AuthorizationError = require('../error_handler/error/AuthorizationError');

const constant = require('../constant/constant');
const utils = require('../utils');
const sendErrorMessage = require('../error_handler/error_handler');

const isAuthorized = async (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err, user, info) => {
      try {
        if (err || info || !user) {
          if (
            info
            && info.name
            && info.name === 'TokenExpiredError'
          ) {
            throw new AuthorizationError(false, true);
          }
          throw new AuthorizationError(true, false);
        } else {
          req.user = user;
          next();
        }
      } catch (error) {
        sendErrorMessage(req, res, error);
      }
    },
  )(req, res, next);
};

const isAuthorizedPermission = (module, permission) => async (
  req,
  res,
  next,
) => {
  const { user } = req;
  const { role } = user;

  try {
    const permissions = constant.PERMISSIONS_LOOKUP[role];

    if (
      utils.isEmpty(permissions)
      || utils.isEmpty(permissions[module])
      || !utils.checkInArray(permissions[module], permission)
    ) {
      throw new AuthorizationError(true, false);
    } else {
      next();
    }
  } catch (error) {
    sendErrorMessage(req, res, error);
  }
};

exports.isAuthorized = isAuthorized;
exports.isAuthorizedPermission = isAuthorizedPermission;
