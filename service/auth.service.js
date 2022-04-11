const dbConnection = require('../dbConection');

const utils = require('../utils');
const ValidationError = require('../error_handler/error/ValidationError');

const getTokenService = async (currentUser) => {
  const user = currentUser;

  const accessToken = await utils.generateJWTToken(
    utils.pick(user, [
      '_id',
      'first_name',
      'last_name',
      'email',
      'active',
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
    console.log('\n\nresults ', results);
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

exports.loginService = loginService;
exports.saveUserService = saveUserService;
exports.checkExistingUser = checkExistingUser;