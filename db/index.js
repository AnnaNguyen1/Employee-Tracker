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
}

module.exports = new Queries(connection);
