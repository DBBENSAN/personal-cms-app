
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

async function addRole(){
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
        }
    ];

    const res = await inquirer.prompt(prompt);
    console.log(res);
    const { role, salary } = res;

    const sql = `INSERT INTO roles (role_name, salary) VALUES (?, ?)`;
    db.query(sql, [role, salary], (err, res) => {
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

function editEmployee(){
    const prompt = [
        {
            name: "employee_id",
            message: "Please provide the ID of the employee you want to edit",
            validate: (input) => {
                if (isNaN(input)) {
                    console.log('\nPlease enter a valid ID');
                    return false;
                }
                return true;
            }
        },
        {
            name: "new_salary",
            message: "Please provide the new salary for this employee",
            validate: (input) => {
                if (isNaN(input)) {
                    console.log('\nPlease enter a valid salary');
                    return false;
                }
                return true;
            }
        }
    ];

    inquirer.prompt(prompt).then((res) => {
        console.log(res);
        const { employee_id, new_salary } = res;

        const sql = `UPDATE employees SET salary = ? WHERE id = ?`;
        db.query(sql, [new_salary, employee_id], (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(`
            =================
            Employee Updated!
            =================
            `);
            init();
        });
    });
}





init()