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
      //filter by row
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

function addEmployee() {
  try {
    // grab data for Roles
    const roleChoice = [];

    db.viewAllRoles().then(([rls]) => {
      let role = rls;

      role.forEach((rls) => {
        roleChoice.push({
          name: rls.title,
          value: rls.id,
        });
      });
    });
    console.log(roleChoice);
    // grab data for Managers

    const managerChoice = [
      {
        name: "No Manager",
        value: "NULL",
      },
    ];

    db.getManagers().then(([mgr]) => {
      let managers = mgr;

      managers.forEach((manager) => {
        managerChoice.push({
          name: manager.first_name + " " + manager.last_name,
          value: manager.id,
        });
      });
      console.log(managerChoice);
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
      prompt(addEmployee).then((emp) => {
        console.log(emp);
      });
    });

    const addEmp = [{}];
  } catch (e) {
    console.error(e);
  }
}

function updateEmployeeRole() {
  try {
    // grab names of employees from the employee database
    // const names as choices
    // prompt qs
    // grab role title
    // update role for employee
  } catch (e) {
    console.error(e);
  }
}

function addRole() {
  try {
    // Grab a list of departments
    // Q's on the role - title, salary, department
    // add role into db
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
