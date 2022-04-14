const dbConnection = require('../dbConection');

const utils = require('../utils');
const ValidationError = require('../error_handler/error/ValidationError');

const getTokenService = async (currentUser) => {
  const user = currentUser;

  const accessToken = await utils.generateJWTToken(
    utils.pick(user, [
      'id',
      'first_name',
      'last_name',
      'email',
      'active',
      'role',
    ]),
    null,
  );
  return { access_token: accessToken };
};

const loginService = async (user) => getTokenService(user);

const checkExistingUser = async (email) => new Promise((resolve, reject) => {
  dbConnection.query(`select * from user where email='${email}' and active=1`, (error, result) => {
    if (error) {
      reject(error);
    }
    let results = [];
    if (!utils.isEmpty(result)) {
      results = utils.constructJSONFromQueryResult(result)[[0]];
    }
    resolve(results);
  });
});

const saveUserService = async (requestBody) => new Promise((resolve, reject) => {
  const userDetails = requestBody;

  const { password } = userDetails;
  delete userDetails.password;

  const { email } = userDetails;
  checkExistingUser(email).then((existingUser) => {
    if (!utils.isEmpty(existingUser)) {
      reject(new ValidationError(
        utils.generateErrorMessage(
          'exist',
          'email',
        ),
      ));
    }
  });
  let columns = Object.keys(userDetails);
  let values = Object.values(userDetails);
  values = values.map((ele) => `"${ele}"`);

  columns = columns.concat(['salt', 'hash']);

  const saltHash = utils.generateSaltHash(password);
  values = values.concat(saltHash.map((ele) => `"${ele}"`));

  const query = `insert into user (${columns}) values (${values})`;

  dbConnection.query(query, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(utils.removeFieldsFromObject(userDetails, ['passeord']));
  });
});

const listUserService = (requestQuery) => new Promise((resolve, reject) => {
  let query = '';
  Object.keys(requestQuery).forEach((key) => {
    query += `${key}='${requestQuery[key]}' and `;
  });

  query = query.substring(0, query.lastIndexOf('and'));
  if (!utils.isEmpty(query)) {
    query = `where ${query}`;
  }

  const columns = ['id',
    'first_name',
    'last_name',
    'email',
    'active',
    'role'];

  dbConnection.query(`select ${columns} from user ${query}`, (error, result) => {
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

const editUserService = (requestBody) => new Promise((resolve, reject) => {
  const { id } = requestBody;

  if (!utils.isEmpty(requestBody.email)) {
    const { email } = requestBody;
    checkExistingUser(email).then((existingUser) => {
      if (!utils.isEmpty(existingUser)) {
        reject(new ValidationError(
          utils.generateErrorMessage(
            'exist',
            'email',
          ),
        ));
      }
    });
  }

  let valuesToUpdate = '';
  Object.keys(requestBody).forEach((key) => {
    valuesToUpdate += `${key}='${requestBody[key]}' , `;
  });
  valuesToUpdate = valuesToUpdate.substring(0, valuesToUpdate.lastIndexOf(','));

  dbConnection.query(`update user set ${valuesToUpdate} where id=${id};`, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(requestBody);
  });
});

const deleteUserService = (requestBody) => new Promise((resolve, reject) => {
  const { id } = requestBody;

  dbConnection.query(`delete from user where id=${id};`, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(requestBody);
  });
});

exports.loginService = loginService;
exports.saveUserService = saveUserService;
exports.checkExistingUser = checkExistingUser;
exports.listUserService = listUserService;
exports.editUserService = editUserService;
exports.deleteUserService = deleteUserService;
