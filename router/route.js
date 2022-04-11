const auditLogRouter = require('./audit_log.route');
const authRoute = require('./auth.route');

module.exports = (router) => {
  auditLogRouter(router);
  authRoute(router);
  return router;
};
