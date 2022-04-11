const auditLogController = require('../controller/autid_log.controller');

const auth = require('../auth/auth');

module.exports = (router) => {
  router.get(
    '/audit/list/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('audit', 'read'),
    auditLogController.getAuditLog,
  );

  router.post(
    '/audit/save/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('audit', 'create'),
    auditLogController.saveAuditLog,
  );
};
