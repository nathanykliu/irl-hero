
-- delete a table
-- DROP TABLE authors;
-- DROP TABLE books;

-- create the users table
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     lastname VARCHAR(255),
--     firstname VARCHAR(255),
--     stage INTEGER
-- );

-- create teh goals table
-- CREATE TABLE goals (
--     id SERIAL PRIMARY KEY,
--     goals VARCHAR(255),
--     days INTEGER,
--     complete BOOLEAN,
--     user_id VARCHAR(255)
-- );

-- populate the table
-- INSERT INTO users (lastname, firstname, stage) VALUES
--     ('Liu', 'Nathan', 100),
--     ('Corleone', 'Vito', 5),
--     ('Corleone', 'Michael', 4),
--     ('Corleone', 'Sonny', 4),
--     ('Corleone', 'Fredo', 6),
--     ('Hagen', 'Tom', 2),
--     ('Tattaglia', 'Philip', 4),
--     ('Clemenza', 'Peter', 5),
--     ('Rizzi', 'Carlo', 9),
--     ('Brasi', 'Luca', 3),
--     ('Barzini', 'Emilio', 9);

-- populate goals
-- INSERT INTO goals (Goals, Days, Complete, User_id) VALUES
--     ('Become the top Dog', 365, false, 1),
--     ('Escape Full Stack Island', 30, false, 1),
--     ('Practice dog yoga daily', 90, true, 5),
--     ('Buy new Computer', 60, true, 9)