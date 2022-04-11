const employeeResposneHandler = require('../response_handler/employee.response');
const employeeService = require('../service/employee.service');

const listEmployee = async (req, res) => {
  const { query } = req;

  employeeResposneHandler.listEmployeeResponse(res, await employeeService.listEmployee(query));
};

const saveEmployee = async (req, res) => {
  const { body } = req;

  employeeResposneHandler.saveEmployeeResponse(res, await employeeService.saveEmployee(body));
};

const checkEmployeeUsername = async (req, res) => {
  const { query } = req;

  employeeResposneHandler.checkEmployeeUsernameResponse(res, await employeeService.checkEmployeeUsername(query));
};

exports.listEmployee = listEmployee;
exports.saveEmployee = saveEmployee;
exports.checkEmployeeUsername = checkEmployeeUsername;
