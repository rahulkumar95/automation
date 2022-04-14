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

const editEmployee = async (req, res) => {
  const { body } = req;

  employeeResposneHandler.editEmployeeResponse(res, await employeeService.editEmployee(body));
};

const checkEmployeeUsername = async (req, res) => {
  const { query } = req;

  employeeResposneHandler.checkEmployeeUsernameResponse(res, await employeeService.checkEmployeeUsername(query));
};

const deleteEmployee = async (req, res) => {
  const { body } = req;

  employeeResposneHandler.deleteEmployeeResponse(res, await employeeService.deleteEmployee(body));
};

exports.listEmployee = listEmployee;
exports.saveEmployee = saveEmployee;
exports.editEmployee = editEmployee;
exports.checkEmployeeUsername = checkEmployeeUsername;
exports.deleteEmployee = deleteEmployee;
