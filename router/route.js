const auditLogRouter = require('./audit_log.route');

module.exports = (router) => {
  auditLogRouter(router);
  return router;
};
