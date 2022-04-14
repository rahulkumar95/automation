const auditLogController = require('../controller/autid_log.controller');
const auditLogValidator = require('../validator/audit/audit.validate');
const auth = require('../auth/auth');

module.exports = (router) => {
  router.get(
    '/audit/list/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('audit', 'read'),
    auditLogValidator.validateListAuditLog,
    auditLogController.listAuditLog,
  );

  router.post(
    '/audit/save/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('audit', 'create'),
    auditLogValidator.validateSaveAuditLog,
    auditLogController.saveAuditLog,
  );

  router.get(
    '/audit/get/:id',
    auth.isAuthorized,
    auth.isAuthorizedPermission('audit', 'read'),
    auditLogValidator.validateGetAuditLog,
    auditLogController.getAuditLog,
  );

  router.get(
    '/audit/export/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('audit', 'read'),
    auditLogValidator.validateExportAuditLog,
    auditLogController.exportAuditLog,
  );
};
