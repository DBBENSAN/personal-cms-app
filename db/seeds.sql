INSERT INTO department (name)
VALUES 
("Justice League"),
("Suicide Squad"),
("Teen Titans"),
("The Outsiders"),
("The Legion of Doom");

INSERT INTO role (title, salary, department_id)
VALUES
("Villain", 100000, 1),
("Hero", 150000, 1),
("Sidekick", 75000, 2),
("Extra", 50000, 3),
("Civilian", 35000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Clark", "Kent", 2, null),
("Bruce", "Wayne", 2, null),
("Diana", "Prince", 2, null),
("Barry", "Allen", 2, null),
("Arthur", "Curry", 2, null),
("Lex", "Luthor", 1, null),
("Joker", "", 1, null),
("Harley", "Quinn", 1, null),
("Deathstroke", "", 1, null),
("Edward", "Enigma", 1, null),
("Selina", "Kyle", 1, null),
("Raven", "", 3, 4),
("Starfire", "", 3, 5),
("Cyborg", "", 3, 3),
("Garfield", "Logan", 3, 4),
("Richard", "Grayson", 3, 7),
("Black Lightning", "", 4, 5),
("Hawkman", "", 4, 2),
("Metamorpho", "", 4, 3),
("Katana", "", 4, 2),
("Elongated Man", "", 4, 2),
("Jimmy", "Olsen", 5, 1),
("Lois", "Lane", 5, 1),
("Perry", "White", 5, 1);