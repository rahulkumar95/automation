const getAuditLogResponse = (res, response) => {
  res
    .status(200)
    .json(response);
};

const saveAuditLogResponse = (res, response) => {
  res
    .status(201)
    .json(response);
};

exports.getAuditLogResponse = getAuditLogResponse;
exports.saveAuditLogResponse = saveAuditLogResponse;
