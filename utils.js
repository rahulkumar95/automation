const _ = require('lodash');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { PythonShell } = require('python-shell');
const path = require('path');
const fsExtra = require('fs-extra');

const constant = require('./constant/constant');

const isEmpty = (data) => _.isEmpty(data);

const pick = (data, values) => _.pick(data, values);

const constructJSONFromQueryResult = (result) => result.map((v) => ({ ...v }));

const checkInArray = (arr, value) => arr.includes(value);

const deleteUndefinedFields = (obj) => {
  const objectDetails = obj;
  Object.keys(obj).forEach((key) => {
    if (checkInArray(constant.FALSE_VALUES, obj[key])) {
      delete objectDetails[key];
    }
  });
  return objectDetails;
  // return _.pickBy(obj, _.identity)
};

const generateErrorMessage = (type, field, limit, valids, values, error) => ({
  type,
  field,
  limit,
  valids,
  values,
  error,
});

const processJoiError = (error) => {
  const errors = [];
  const error_list = error.details;
  Object.keys(error_list).forEach((key) => {
    const item = error_list[key];
    let errorDetail = generateErrorMessage(
      item.type,
      item.path.join('.'),
      item.context.limit,
      item.context.valids,
    );
    errorDetail = deleteUndefinedFields(errorDetail);
    errors.push(errorDetail);
  });
  return errors;
};

const generateErrorResponse = (errorDetails) => {
  const errors = [];
  errorDetails.forEach((obj) => {
    errors.push(deleteUndefinedFields(obj));
  });
  return deleteUndefinedFields({
    errors,
  });
};

const isPasswordValid = (password, salt, hash) => new Promise((resolve, reject) => {
  crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, verify) => {
    if (err) reject(err);
    const is_verified = verify.toString('hex') === hash;
    resolve(is_verified);
  });
});

const joiValidate = (data, schema) => {
  const { error } = schema.validate(data, { abortEarly: false });
  return error;
};
const generateJWTToken = async (tokenPayload, expiresIn) => {
  const tokenSubject = tokenPayload.email;
  const tokenExpiresIn = isEmpty(expiresIn)
    ? global.gConfig.jwt.jwt_expiration_time
    : expiresIn;

  const privateKey = fs.readFileSync(global.gConfig.jwt.jwt_private_key);
  const tokenOptions = {
    issuer: global.gConfig.jwt.jwt_issuer_name,
    subject: tokenSubject,
    expiresIn: tokenExpiresIn,
    algorithm: 'RS256',
  };
  return jwt.sign(tokenPayload, privateKey, tokenOptions);
};

const removeFieldsFromObject = (obj, except) => {
  const object = obj;
  except.forEach((element) => {
    object[element] = undefined;
  });
  return _.omit(object, except);
};

const generateSaltHash = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
  return [salt, hash];
};

const exportToExcel = async (
  tempExcelDocFolder,
  excelFileName,
  excelSheetName,
  jsonData,
  timeStamp,
  isTemplate,
) => {
  const outputJSONFileName = `${tempExcelDocFolder}${excelFileName}_${timeStamp}.json`;
  const outputExcelFileName = `${tempExcelDocFolder}${excelFileName}_${timeStamp}.xlsx`;

  try {
    fs.writeFileSync(outputJSONFileName, JSON.stringify(jsonData));
  } catch (e) {
    throw new Error(e);
  }

  const options = {
    pythonOptions: ['-u'],
    scriptPath: '',
    args: [outputExcelFileName, excelSheetName, outputJSONFileName],
  };
  if (isTemplate) {
    options.args.push(isTemplate);
  }

  await new Promise((resolve, reject) => {
    PythonShell.run('excelpy_write.py', options, (err, result) => {
      if (err) reject(err);
      else {
        resolve();
      }
    });
  }).catch((err) => {
    throw new Error(err);
  });

  return outputExcelFileName;
};

const createDirectory = async (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const getReportDirectory = async () => {
  const excelFolderLocation = 'reports';
  await createDirectory(excelFolderLocation);
  const excelFileLocation = `${excelFolderLocation}${path.sep}audit_log_${Date.now()}${path.sep}`;
  await createDirectory(excelFileLocation);
  return excelFileLocation;
};

const emptyDirectory = async (filePath) => {
  try {
    await fsExtra.emptyDir(filePath);
  } catch (e) {
    return false;
  }
  return true;
};

const removeDirectory = async (filePath, errorLogger) => {
  let status = false;
  if (await emptyDirectory(filePath)) {
    fs.rmdir(filePath, (err) => {
      if (err) {
        status = err;
      } else status = true;
    });
  }
  return status;
};

exports.processJoiError = processJoiError;
exports.isEmpty = isEmpty;
exports.constructJSONFromQueryResult = constructJSONFromQueryResult;
exports.generateErrorResponse = generateErrorResponse;
exports.generateErrorMessage = generateErrorMessage;
exports.pick = pick;
exports.checkInArray = checkInArray;
exports.isPasswordValid = isPasswordValid;
exports.joiValidate = joiValidate;
exports.generateJWTToken = generateJWTToken;
exports.removeFieldsFromObject = removeFieldsFromObject;
exports.generateSaltHash = generateSaltHash;
exports.exportToExcel = exportToExcel;
exports.getReportDirectory = getReportDirectory;
exports.emptyDirectory = emptyDirectory;
exports.removeDirectory = removeDirectory;
