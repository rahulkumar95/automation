const authController = require('../controller/auth.controller');
const authValidator = require('../validator/auth/auth.validate');

const auth = require('../auth/auth');

module.exports = (router) => {
  router.post(
    '/auth/login',
    authValidator.validateLogin,
    authController.login,
  );

  router.post(
    '/user/save',
    authValidator.validateSaveUser,
    authController.saveUser,
  );
};
