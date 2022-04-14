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

  router.post(
    '/employee/edit/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('employee', 'update'),
    employeeValidator.validateEditEmployee,
    employeeController.editEmployee,
  );

  router.get(
    '/employee/check/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('employee', 'read'),
    employeeValidator.validateCheckEmployeeUsername,
    employeeController.checkEmployeeUsername,
  );

  router.post(
    '/employee/delete/',
    auth.isAuthorized,
    auth.isAuthorizedPermission('employee', 'delete'),
    employeeValidator.validateDeleteEmployee,
    employeeController.deleteEmployee,
  );
};
