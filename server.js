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
                "Add Employee",
                "Edit employee",
                // "Remove employee",
                "EXIT"
            ]
    }]

    let data = await inquirer.prompt(prompt);
    let { "action": answer } = data;

    helper(answer)
};

function helper(value) {
    if (value === "View all employees") {
        getAllEmployees();
    }
    if (value === "View all roles") {
        getAllRoles();
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
    if (value === "Add Employee") {
        addEmployee()
    }
    if (value === "EXIT") {
        closeOut()
    }
};

function getAllEmployees() {
    const sql = `
    SELECT emp.id AS "Employee ID",
    emp.first_name AS "First Name",
    emp.last_name AS "Last Name",
    role.title AS "Job Title",
    dept.name AS "Department",
    role.salary AS "Salary",
    COALESCE(manager.id, 0) AS "Manager ID"
    FROM employee emp
    JOIN role ON emp.role_id = role.id
    JOIN department dept ON role.department_id = dept.id
    LEFT JOIN employee manager ON emp.manager_id = manager.id
    ORDER BY emp.id ASC;`

    db.query(sql, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
};

function getAllRoles() {
    let sql = `
    SELECT *
    FROM role;`

    db.query(sql, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
};

function viewDepartments() {
    let sql = `
    SELECT *
    FROM department;`

    db.query(sql, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.table(res);
        init();
    })
};

async function addDepartment() {
    const prompt = [
        {
            name: "dept",
            message: "Please provide a department name",
            validate: (input) => {
                if (input.length > 30) {
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
        if (err) {
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

async function addRole() {
    const prompt = [
        {
            name: "role",
            message: "Please provide a role name",
            validate: (input) => {
                if (input.length > 30) {
                    console.log('\nRole names are limited to 30 characters');
                    return false;
                }
                return true;
            }
        },
        {
            name: "salary",
            message: "Please provide a salary for this role",
            validate: (input) => {
                if (isNaN(input)) {
                    console.log('\nPlease enter a valid salary');
                    return false;
                }
                return true;
            }
        },
        {
            name: "department_id",
            message: "Please provide the department ID for this role",
            validate: (input) => {
                if (isNaN(input)) {
                    console.log('\nPlease enter a valid department ID');
                    return false;
                }
                return true;
            }
        }
    ];

    const res = await inquirer.prompt(prompt);
    console.log(res);
    const { role, salary, department_id } = res;

    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    db.query(sql, [role, salary, department_id], (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(`
        =================
        Role Added!
        =================
        `);
        init();
    });
};




async function addEmployee() {
    const roles = await getRoles();
    const managers = await getManagers();
    const prompt = [
        {
            name: "first_name",
            message: "Please provide the employee's first name",
            validate: (input) => {
                if (input.length > 30) {
                    console.log('\nEmployee names are limited to 30 characters');
                    return false;
                }
                return true;
            }
        },
        {
            name: "last_name",
            message: "Please provide the employee's last name",
            validate: (input) => {
                if (input.length > 30) {
                    console.log('\nEmployee names are limited to 30 characters');
                    return false;
                }
                return true;
            }
        },
        {
            name: "role_id",
            type: "list",
            message: "Please select the employee's role",
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            name: "manager_id",
            type: "list",
            message: "Please select the employee's manager",
            choices: managers.map(manager => ({
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }))
        }
    ];

    const res = await inquirer.prompt(prompt);
    console.log(res);
    const { first_name, last_name, role_id, manager_id } = res;

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    db.query(sql, [first_name, last_name, role_id, manager_id], (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(`
        =================
        Employee Added!
        =================
        `);
        init();
    });
};

async function getRoles() {
    const sql = `SELECT * FROM role;`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

async function getManagers() {
    const sql = `SELECT * FROM employee WHERE manager_id IS NULL;`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}

function closeOut() {
    console.log(`
.▀█▀.█▄█.█▀█.█▄.█.█▄▀　█▄█.█▀█.█─█
─.█.─█▀█.█▀█.█.▀█.█▀▄　─█.─█▄█.█▄█
    
    `)
}




init()