// Load dependancies
const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'movies_db'
    },
    console.log(`Connected to the employee_db database.`)
  );


  