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

exports.newTokenResponse = newTokenResponse;
exports.saveUserResponse = saveUserResponse;
