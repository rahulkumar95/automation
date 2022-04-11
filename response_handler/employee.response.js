const listEmployeeResponse = (res, response) => {
  res
    .status(200)
    .json(response);
};

const saveEmployeeResponse = (res, response) => {
  res
    .status(201)
    .json(response);
};

const checkEmployeeUsernameResponse = (res, response) => {
  res
    .status(200)
    .json(response);
};

exports.listEmployeeResponse = listEmployeeResponse;
exports.saveEmployeeResponse = saveEmployeeResponse;
exports.checkEmployeeUsernameResponse = checkEmployeeUsernameResponse;
