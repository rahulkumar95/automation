const auditLogResposneHandler = require('../response_handler/audit_log.response');
const auditLogService = require('../service/audit_log.service');

const getAuditLog = async (req, res) => {
  const { query } = req;

  auditLogResposneHandler.getAuditLogResponse(res, await auditLogService.getAuditLog(query));
};

const saveAuditLog = async (req, res) => {
  const { body } = req;

  auditLogResposneHandler.saveAuditLogResponse(res, await auditLogService.saveAuditLog(body));
};

exports.getAuditLog = getAuditLog;
exports.saveAuditLog = saveAuditLog;
