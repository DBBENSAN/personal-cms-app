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
                "View all departments",
                "View all roles",
                "View all employees",
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
    if (value === "View all employees") {
        viewEmployees();
     }
    if (value === "View all roles") {
        viewRoles();
     }
    if (value === "View all departments") {
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
    const sql = `
    SELECT employee.id AS "Employee ID",
    employee.first_name AS "First Name",
    employee.last_name AS "Last Name",
    role.title AS "Job Title",
    department.name AS "Department",
    role.salary AS "Salary",
    COALESCE(manager.id, 0) AS "Manager ID"
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`

    db.query(sql, (err, res) => {
        if(err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
};

function viewRoles(){
    let sql = `
    SELECT *
    FROM role;`

    db.query(sql, (err, res) => {
        if(err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
};

function viewDepartments(){
    let sql = `
    SELECT *
    FROM department;`

    db.query(sql, (err, res) => {
        if(err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
};

async function addDepartment(){
    const prompt = [
        {
        name: "dept",
        message: "Please provide a department name",
        validate: (input) => {
            if(input.length > 30){
                console.log('\nDept. Names are limited to 30 Characters');
                return false;
            }
            return true;
        }
        }
    ];

    const res = await inquirer.prompt(prompt);
    console.log(res)
    const { "dept": params } = res;

    const sql = `INSERT INTO department (name) VALUES (?)`
    db.query(sql, params, (err, res) => {
        if(err) {
            console.log(err)
        }
        console.log(`
        =================
        Department Added!
        =================
        `);
        init();
    })
};

function addRole(){
    
    let query = ``

    db.query(query, (err, res) => {
        if(err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
};

function editEmployee(){

    let query = ``

    db.query(query, (err, res) => {
        if(err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
}





init()