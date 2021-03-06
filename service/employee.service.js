const dbConnection = require('../dbConection');
const utils = require('../utils');
const email = require('../email');

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

    // const from = '';
    // const to = '';
    // const subject = '';
    // const text = '';
    // email.sendMail(from, to, subject, text);

    resolve(requestBody);
  });
});

const editEmployee = (requestBody) => new Promise((resolve, reject) => {
  const { id } = requestBody;
  let valuesToUpdate = '';
  Object.keys(requestBody).forEach((key) => {
    valuesToUpdate += `${key}='${requestBody[key]}' , `;
  });
  valuesToUpdate = valuesToUpdate.substring(0, valuesToUpdate.lastIndexOf(','));

  dbConnection.query(`update employee set ${valuesToUpdate} where id=${id};`, (error, result) => {
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

const deleteEmployee = (requestBody) => new Promise((resolve, reject) => {
  const { id } = requestBody;

  dbConnection.query(`delete from employee where id=${id};`, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(requestBody);
  });
});

exports.listEmployee = listEmployee;
exports.saveEmployee = saveEmployee;
exports.editEmployee = editEmployee;
exports.checkEmployeeUsername = checkEmployeeUsername;
exports.deleteEmployee = deleteEmployee;
