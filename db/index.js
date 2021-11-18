const connection = require("./connection");

class Queries {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllEmployees() {
    return this.connection.promise().query("SELECT * FROM employees");
  }

  viewAllRoles() {
    return this.connection.promise().query("SELECT * FROM roleEmp");
  }

  viewAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  getManagers() {
    return this.connection
      .promise()
      .query(
        "SELECT e.id, e.first_name, e.last_name FROM employees e WHERE manager_id IS NULL"
      );
  }

  createEmployee(employee) {
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                    VALUES ("${employee.firstname}", "${employee.lastname}", ${employee.role}, ${employee.manager});`;
    return this.connection.promise().query(sql);
  }

  updateEmployeeRole(selectEmployee, selectRole) {
    let sql = `UPDATE employees
                    SET role_id=${selectRole.roleSelect}
                    WHERE id=${selectEmployee.employeeSelect}`;
    return this.connection.promise().query(sql);
  }

  addRole() {}

  addDepartment() {}
}

module.exports = new Queries(connection);
