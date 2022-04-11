const dbConnection = require('../dbConection');
const utils = require('../utils');

const listEmployee = (requestQuery) => new Promise((resolve, reject) => {
  let query = '';
  Object.keys(requestQuery).forEach((key) => {
    query += `${key}='${requestQuery[key]}' and `;
  });

  query = query.substring(0, query.lastIndexOf('and'));
  if (!utils.isEmpty(query)) {
    query = `where ${query}`;
  }

  dbConnection.query(`select * from employee ${query}`, (error, result) => {
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

const saveEmployee = (requestBody) => new Promise((resolve, reject) => {
  const columns = Object.keys(requestBody);
  let values = Object.values(requestBody);
  values = values.map((ele) => `"${ele}"`);

  const query = `insert into employee (${columns}) values (${values})`;

  dbConnection.query(query, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(requestBody);
  });
});

const checkEmployeeUsername = (requestQuery) => new Promise((resolve, reject) => {
  dbConnection.query(`select * from employee where username='${requestQuery.username}'`, (error, result) => {
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

exports.listEmployee = listEmployee;
exports.saveEmployee = saveEmployee;
exports.checkEmployeeUsername = checkEmployeeUsername;
