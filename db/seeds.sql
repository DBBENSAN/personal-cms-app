USE employee_db;

INSERT INTO department (dept_name) 
VALUES 
("Police Department"), 
("Wayne Enterprises"), 
("Batcave"), 
("Gotham City Mayor"), 
("Parks and Recreation");

INSERT INTO roles (title, salary, department_id) 
VALUES 
("Batman", 1000000, 3), 
("Commissioner Gordon", 75000, 1), 
("Alfred", 50000, 3), 
("Mayor", 80000, 4), 
("Parks and Recreation Director", 65000, 5), 
("Detective", 65000, 1), 
("Engineer", 75000, 2), 
("Accountant", 55000, 2), 
("Legal Advisor", 70000, 2), 
("Public Relations Specialist", 60000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
("Bruce", "Wayne", 1, NULL), 
("Jim", "Gordon", 2, 1), 
("Alfred", "Pennyworth", 5, 1), 
("Harvey", "Dent", 2, 1), 
("Barbara", "Gordon", 3, 1), 
("Oliver", "Queen", 3, 1), 
("Dinah", "Lance", 4, 1), 
("Helena", "Bertinelli", 5, 1), 
("Tim", "Drake", 3, 1), 
("Cassandra", "Cain", 5, 1), 
("Stephanie", "Brown", 1, 1), 
("Carrie", "Kelley", 2, 1), 
("Harleen", "Quinzel", 1, 1), 
("Julie", "Madison", 5, 1), 
("Vicki", "Vale", 4, 1), 
("Rene", "Montoya", 4, 1), 
("Detective", "Chase", 2, 1), 
("Katana", "", 1, 1), 
("Eduardo", "Dorian", 1, 1), 
("Thomas", "Wayne Jr.", 5, 1);


