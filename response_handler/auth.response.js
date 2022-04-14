const newTokenResponse = (res, jwtDetailsData) => {
  res
    .status(201)
    .json(jwtDetailsData);
};

const saveUserResponse = (res, userData) => {
  res
    .status(201)
    .json(userData);
};

const listUserResponse = (res, userData) => {
  res
    .status(200)
    .json(userData);
};

const editUserResponse = (res, userData) => {
  res
    .status(201)
    .json(userData);
};

const deleteUserResponse = (res, userData) => {
  res
    .status(201)
    .json(userData);
};

exports.newTokenResponse = newTokenResponse;
exports.saveUserResponse = saveUserResponse;
exports.listUserResponse = listUserResponse;
exports.editUserResponse = editUserResponse;
exports.deleteUserResponse = deleteUserResponse;
