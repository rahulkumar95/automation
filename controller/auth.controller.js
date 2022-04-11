require('../auth/jwt.passport');

const passport = require('passport');
const authResponseHandler = require('../response_handler/auth.response');

const sendErrorMessage = require('../error_handler/error_handler');
const InvalidCredentialsError = require('../error_handler/error/InvalidCredentialsError');

const authService = require('../service/auth.service');

const login = async (req, res) => {
  await passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
      try {
        if (err || info || !user) {
          throw new InvalidCredentialsError();
        }
        authResponseHandler.newTokenResponse(
          res,
          await authService.loginService(user),
        );
      } catch (error) {
        sendErrorMessage(req, res, error);
      }
    },
  )(req, res);
};

const saveUser = async (req, res) => {
  const { body } = req;

  authResponseHandler.saveUserResponse(res, await authService.saveUserService(body));
};

const listuser = async (req, res) => {
  const { query } = req;

  authResponseHandler.listUserResponse(res, await authService.listUserService(query));
};

exports.login = login;
exports.saveUser = saveUser;
exports.listuser = listuser;
