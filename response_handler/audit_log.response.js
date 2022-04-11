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

exports.listAuditLogResponse = listAuditLogResponse;
exports.saveAuditLogResponse = saveAuditLogResponse;
exports.getAuditLogResponse = getAuditLogResponse;
