const auditLogResposneHandler = require('../response_handler/audit_log.response');
const auditLogService = require('../service/audit_log.service');

const listAuditLog = async (req, res) => {
  const { query } = req;

  auditLogResposneHandler.listAuditLogResponse(res, await auditLogService.listAuditLog(query));
};

const saveAuditLog = async (req, res) => {
  const { body } = req;

  auditLogResposneHandler.saveAuditLogResponse(res, await auditLogService.saveAuditLog(body));
};

const getAuditLog = async (req, res) => {
  const { params } = req;

  auditLogResposneHandler.getAuditLogResponse(res, await auditLogService.getAuditLog(params));
};

const exportAuditLog = async (req, res) => {
  const { query } = req;

  auditLogResposneHandler.exportAuditLogResponse(res, await auditLogService.exportAuditLog(query));
};

exports.listAuditLog = listAuditLog;
exports.saveAuditLog = saveAuditLog;
exports.getAuditLog = getAuditLog;
exports.exportAuditLog = exportAuditLog;
