INSERT INTO department (name)
VALUES 
("Justice League"),
("Suicide Squad"),
("Teen Titans"),
("The Outsiders"),
("The Legion of Doom");

INSERT INTO role (title, salary, department_id)
VALUES
("Hero", 150000, 1),
("Villain", 100000, 1),
("Sidekick", 75000, 3),
("Extra", 50000, 2),
("Civilian", 35000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Clark", "Kent", 1, null),
("Bruce", "Wayne", 1, null),
("Diana", "Prince", 1, null),
("Barry", "Allen", 1, null),
("Arthur", "Curry", 1, null),
("Lex", "Luthor", 2, null),
("Joker", "Unknown", 2, null),
("Harley", "Quinn", 2, null),
("Deathstroke", "Unknown", 2, null),
("Edward", "Enigma", 2, null),
("Selina", "Kyle", 2, null),
("Raven", "Unknown", 3, 4),
("Starfire", "Unknown", 3, 5),
("Cyborg", "Unknown", 3, 3),
("Garfield", "Logan", 3, 4),
("Richard", "Grayson", 3, 7),
("Black Lightning", "Unknown", 4, 5),
("Hawkman", "Unknown", 4, 2),
("Metamorpho", "Unknown", 4, 3),
("Katana", "Unknown", 4, 2),
("Elongated Man", "Unknown", 4, 2),
("Jimmy", "Olsen", 5, 1),
("Lois", "Lane", 5, 1),
("Perry", "White", 5, 1);