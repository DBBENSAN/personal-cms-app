USE employee_db;

INSERT INTO department (department_name)
VALUES('Electronics'),
('Food'),
('Security'),
('Transportation');

INSERT INTO roles (title, salary, department_id)
VALUES('Werewolf', 5000, 1),
('Vampire', 5000, 1),
('Goblin', 5000, 2),
('Mummy', 5000, 3),
('Ghost', 5000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('Joe','Dumar', 2, 1),
('Mike','Tyson', 3, 1),
('Michael','Jackson', 43, 1),
('Severus','Snape', 56, 2),
('Dumble','Dore', 78, 2);