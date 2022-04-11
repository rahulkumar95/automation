const auditLogRouter = require('./audit_log.route');
const authRoute = require('./auth.route');
const employeeRoute = require('./employee.route');

module.exports = (router) => {
  auditLogRouter(router);
  authRoute(router);
  employeeRoute(router);
  return router;
};
