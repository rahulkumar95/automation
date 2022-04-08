const dbConnection = require('../dbConection');
const utils = require('../utils');

const getAuditLog = (requestQuery) => new Promise((resolve, reject) => {
  dbConnection.query(`select * from audit_log where activity_type='${requestQuery.type}'`, (error, result) => {
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

exports.getAuditLog = getAuditLog;
exports.saveAuditLog = saveAuditLog;
