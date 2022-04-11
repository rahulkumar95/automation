const employeeController = require('../controller/employee.controller');
const employeeValidator = require('../validator/employee/empoyee.validate');
const auth = require('../auth/auth');

module.exports = (router) => {
  router.get(
    '/employee/list/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('employee', 'read'),
    employeeValidator.validateListEmployee,
    employeeController.listEmployee,
  );

  router.post(
    '/employee/save/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('employee', 'create'),
    employeeValidator.validateSaveEmployee,
    employeeController.saveEmployee,
  );

  router.get(
    '/employee/check/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('employee', 'read'),
    employeeValidator.validateCheckEmployeeUsername,
    employeeController.checkEmployeeUsername,
  );
};
