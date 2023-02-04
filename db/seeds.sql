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
("Riddler", "", 1, null),
("Catwoman", "", 1, null),
("Raven", "", 3, 2),
("Starfire", "", 3, 2),
("Cyborg", "", 3, 2),
("Beast Boy", "", 3, 2),
("Nightwing", "", 3, 2),
("Black Lightning", "", 4, 2),
("Hawkman", "", 4, 2),
("Metamorpho", "", 4, 2),
("Katana", "", 4, 2),
("Elongated Man", "", 4, 2),
("Jimmy", "Olsen", 5, 2),
("Lois", "Lane", 5, 2),
("Perry", "White", 5, 2);