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
}

module.exports = new Queries(connection);
