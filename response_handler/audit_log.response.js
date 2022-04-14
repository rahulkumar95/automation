const utils = require('../utils');

const listAuditLogResponse = (res, response) => {
  res
    .status(200)
    .json(response);
};

const saveAuditLogResponse = (res, response) => {
  res
    .status(201)
    .json(response);
};

const getAuditLogResponse = (res, response) => {
  res
    .status(200)
    .json(response);
};

const exportAuditLogResponse = (res, reportDetail) => {
  const reportDirectory = reportDetail[0];
  const fileLocation = reportDetail[1];
  res.sendFile(fileLocation, { root: '.' });
  utils.removeDirectory(reportDirectory);
};

exports.listAuditLogResponse = listAuditLogResponse;
exports.saveAuditLogResponse = saveAuditLogResponse;
exports.getAuditLogResponse = getAuditLogResponse;
exports.exportAuditLogResponse = exportAuditLogResponse;
