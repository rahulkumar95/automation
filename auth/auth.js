require('./jwt.passport');

const passport = require('passport');
const AuthorizationError = require('../error_handler/error/AuthorizationError');

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

exports.isAuthorized = isAuthorized;
