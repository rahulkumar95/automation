const dbConnection = require('../dbConection');
const utils = require('../utils');

const listAuditLog = (requestQuery) => new Promise((resolve, reject) => {
  let query = '';
  Object.keys(requestQuery).forEach((key) => {
    query += `${key}='${requestQuery[key]}' and `;
  });

  query = query.substring(0, query.lastIndexOf('and'));
  if (!utils.isEmpty(query)) {
    query = `where ${query}`;
  }

  dbConnection.query(`select * from audit_log ${query}`, (error, result) => {
    if (error) {
      reject(error);
    }
    let results = [];
    if (!utils.isEmpty(result)) {
      results = utils.constructJSONFromQueryResult(result);
    }
    resolve(results);
  });
});

const saveAuditLog = (requestBody) => new Promise((resolve, reject) => {
  const columns = Object.keys(requestBody);
  let values = Object.values(requestBody);
  values = values.map((ele) => `"${ele}"`);

  const query = `insert into audit_log (${columns}) values (${values})`;

  dbConnection.query(query, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(requestBody);
  });
});

const getAuditLog = (requestParams) => new Promise((resolve, reject) => {
  dbConnection.query(`select * from audit_log where id='${requestParams.id}'`, (error, result) => {
    if (error) {
      reject(error);
    }
    let results = [];
    if (!utils.isEmpty(result)) {
      results = utils.constructJSONFromQueryResult(result);
    }
    resolve(results);
  });
});

const exportAuditLog = (requestQuery) => new Promise((resolve, reject) => {
  listAuditLog(requestQuery).then(async (auditLogResults) => {
    const timeStamp = Date.now();
    const reportDirectory = await utils.getReportDirectory();
    try {
      const generatedDocFilelocation = await utils.exportToExcel(
        reportDirectory,
        'AuditLog',
        'Data',
        auditLogResults,
        timeStamp,
        false,
      );
      resolve([reportDirectory, generatedDocFilelocation]);
    } catch (err) {
      utils.removeDirectory(reportDirectory); // removes the entire directory at temp folder
      reject(err);
    }
  }).catch((error) => reject(error));
});

exports.listAuditLog = listAuditLog;
exports.saveAuditLog = saveAuditLog;
exports.getAuditLog = getAuditLog;
exports.exportAuditLog = exportAuditLog;
