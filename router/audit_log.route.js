const auditLogController = require('../controller/autid_log.controller');

module.exports = (router) => {
  router.get(
    '/audit/list/',
    auditLogController.getAuditLog,
  );

  router.post(
    '/audit/save/',
    auditLogController.saveAuditLog,
  );
};
