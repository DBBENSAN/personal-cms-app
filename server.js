// Load dependancies
const { Router } = require('express');
const inquirer = require('inquirer')
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);


async function init() {
    let prompt = [{
        name: "action",
        type: "list",
        message: "Select an action",
        choices:
            [
                "View employees",
                "View roles",
                "View departments",
                "Add department",
                "Add role",
                "Add employee",
                "Edit employee",
                "Remove employee",
                "EXIT"
            ]
    }]

    let data = await inquirer.prompt(prompt);
    let { "action": answer } = data;

    helper(answer)
};

function helper(value) {
    if (value === "View employees") {
        viewEmployees();
     }
    if (value === "View roles") {
        viewRoles();
     }
    if (value === "View departments") {
        viewDepartments();
     }
    if (value === "Add department") {
        addDepartment();
     }
    if (value === "Add role") {
        addRole()
     }
    if (value === "Edit employee") {
        editEmployee()
     }
    if (value === "Remove employee") {
        removeEmployee()
     }
    if (value === "EXIT") {
        closeOut()
     }
};

function viewEmployees(){
    let query = `SELECT * FROM employees;`
    db.query(query, (err, res) => {
        if(err) {
            console.log(err)
        }
        console.table(res);
    })
};




init()

