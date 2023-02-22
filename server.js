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

async function editEmployee() {
    // Get list of employees
    const employees = await getEmployees();

    // Prompt user to select employee to edit
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));
    const { employee_id } = await inquirer.prompt({
        type: 'list',
        name: 'employee_id',
        message: 'Which employee would you like to edit?',
        choices: employeeChoices,
    });

    // Get selected employee's current data
    const employeeSql = `
   SELECT
     e.id,
     e.first_name,
     e.last_name,
     e.role_id,
     e.manager_id
   FROM employee e
   WHERE e.id = ?;
 `;
    const [employee] = await db.promise().query(employeeSql, [employee_id]);

    // Get list of roles and prompt user to select new role
    const roles = await getRoles();
    const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
    const { role_id } = await inquirer.prompt({
        type: 'list',
        name: 'role_id',
        message: 'Which role would you like to assign to this employee?',
        choices: roleChoices,
        default: roles.findIndex((r) => r.id === employee.role_id),
    });

    // Get list of managers and prompt user to select new manager
    const managerChoices = [
        { name: 'None', value: null },
        ...employees
            .filter((e) => e.id !== employee_id)
            .map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
            })),
    ];
    const { manager_id } = await inquirer.prompt({
        type: 'list',
        name: 'manager_id',
        message: 'Which manager would you like to assign to this employee?',
        choices: managerChoices,
        default: managerChoices.findIndex((m) => m.value === employee.manager_id),
    });

    // Update employee data in database
    const updateSql = `
   UPDATE employee
   SET role_id = ?, manager_id = ?
   WHERE id = ?;
 `;
    await db.promise().query(updateSql, [role_id, manager_id, employee_id]);

    console.log(`
   =================
   Employee Updated!
   =================
 `);

    init();
}

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

async function getEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                 FROM employee e
                 LEFT JOIN role r ON e.role_id = r.id
                 LEFT JOIN department d ON r.department_id = d.id
                 LEFT JOIN employee m ON e.manager_id = m.id`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

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