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
    let managerChoice = []
    // grab data for Roles
    // grab data for Managers
    // Prompts
  }
}

function updateEmployeeRole() {
  try {
    // grab names of employees from the employee database
    // const names as choices
    // prompt qs
    // grab role title
    // update role for employee
  }
}

function addRole() {
  try {
    // Grab a list of departments
    // Q's on the role - title, salary, department
    // add role into db
  }
}

function add department() {
  try {
    // 1 q
    // add department into db
  }
}


userMenu();
