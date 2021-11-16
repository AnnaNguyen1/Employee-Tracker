const inquirer = require("inquirer");
const cTable = require("console.table");
const ListPrompt = require("inquirer/lib/prompts/list");

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

userMenu();
