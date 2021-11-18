const inquirer = require("inquirer");
const cTable = require("console.table");
const ListPrompt = require("inquirer/lib/prompts/list");
const { prompt } = require("inquirer");

const db = require("./db");
const PORT = process.env.PORT || 3001;

const userMenu = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Done",
        ],
      },
    ])
    .then(function (ans) {
      switch (ans.menu) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        default:
          console.clear();
          console.log("Cheerio!");
          return;
      }
    });
};

function viewAllEmployees() {
  db.viewAllEmployees()
    .then(([rows]) => {
      let emp = rows;

      console.log("\n");
      console.table(emp);
    })
    .then(() => userMenu());
}

function viewAllRoles() {
  db.viewAllRoles()
    .then(([rows]) => {
      let role = rows;

      console.log("\n");
      console.table(role);
    })
    .then(() => userMenu());
}

function viewAllDepartments() {
  db.viewAllDepartments()
    .then(([rows]) => {
      let department = rows;

      console.log("\n");
      console.table(department);
    })
    .then(() => userMenu());
}

async function addEmployee() {
  try {
    const roleChoice = [];
    const [roleList] = await db.viewAllRoles();
    const singleRole = roleList;
    singleRole.forEach((rls) => {
      roleChoice.push({
        name: rls.title,
        value: rls.id,
      });
    });
    // console.log(roleChoice);

    const managerChoice = [
      {
        name: "No Manager",
        value: "NULL",
      },
    ];
    const [managerList] = await db.getManagers();
    const singleManager = managerList;
    singleManager.forEach((mng) => {
      managerChoice.push({
        name: mng.first_name + " " + mng.last_name,
        value: mng.id,
      });
    });
    // console.log(managerChoice);

    const addEmp = [
      {
        type: "input",
        name: "firstname",
        message: "Employee First Name:",
      },
      {
        type: "input",
        name: "lastname",
        message: "Employee Last Name:",
      },
      {
        type: "list",
        name: "role",
        message: "Role of new Employee",
        choices: roleChoice,
      },
      {
        type: "list",
        name: "manager",
        message: "Select employee's manager",
        choices: managerChoice,
      },
    ];

    const selectedValue = await inquirer.prompt(addEmp);
    // console.log(selectedValue);
    db.createEmployee(selectedValue)
      .then(() => {
        console.log(
          `${selectedValue.firstname} ${selectedValue.lastname} added!`
        );
      })
      .then(() => viewAllEmployees());
  } catch (e) {
    console.error(e);
  }
}

async function updateEmployeeRole() {
  try {
    // grab names of employees from the employee database
    const employeeChoice = [];
    const [employeeList] = await db.viewAllEmployees();
    const singleEmp = employeeList;
    singleEmp.forEach((emp) => {
      employeeChoice.push({
        name: emp.first_name + " " + emp.last_name,
        value: emp.id,
      });
    });

    const roleChoice = [];
    const [roles] = await db.viewAllRoles();
    const singleRole = roles;
    singleRole.forEach((rle) => {
      roleChoice.push({
        name: rle.title,
        value: rle.id,
      });
    });

    const selectEmployee = await prompt([
      {
        type: "list",
        name: "employeeSelect",
        message: "Which Employee's role would you like to update?",
        choices: employeeChoice,
      },
    ]);

    const selectRole = await prompt([
      {
        type: "list",
        name: "roleSelect",
        message: "Select new Role:",
        choices: roleChoice,
      },
    ]);

    await db.updateEmployeeRole(selectEmployee, selectRole);
    console.log("\n");
    console.log(`Employee's role has been updated!`);
    console.log("\n");
    await userMenu();
  } catch (e) {
    console.error(e);
  }
}

async function addRole() {
  try {
    const depChoice = [];
    const [depList] = await db.viewAllDepartments();
    const singleDep = depList;
    singleDep.forEach((dep) => {
      depChoice.push({
        name: dep.department_name,
        value: dep.id,
      });
    });

    const addRole = [
      {
        type: "input",
        name: "title",
        message: "What title is the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary for the new role:",
      },
      {
        type: "list",
        name: "department",
        message: "What department does this role fall under?",
        choices: depChoice,
      },
    ];

    const newRole = await inquirer.prompt(addRole);
    db.addRole(newRole)
      .then(() => {
        console.log(`${newRole.title} added!`);
      })
      .then(() => viewAllEmployees());
  } catch (e) {
    console.error(e);
  }
}

function adddepartment() {
  try {
    // 1 q
    // add department into db
  } catch (e) {
    console.error(e);
  }
}

userMenu();
