USE employee_db;


INSERT INTO department(department_name)
VALUES
('tester'),
('tester2'),
('tester3');

INSERT INTO role(title, salary, department_id)
VALUES
('Good', 1000, 1),
('Evil', 4000, 1),
('Good', 2100, 2),
('Evil', 9000, 3),
('Neutral', 1500, 3);

INSERT INTO employee(first_name,last_name,role_id,)
VALUES
('Joe','Dumar', 2, 1),
('Mike','Tyson', 3, 1),
('Michael','Jackson', 43,3),
('Severus','Snape', 56, 2),
('Dumble','Dore', 78, 2);






