
-- delete a table
-- DROP TABLE authors;
-- DROP TABLE books;

-- create the users
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     lastname VARCHAR(255),
--     firstname VARCHAR(255),
--     stage INTEGER
-- );

-- create teh goals
-- CREATE TABLE goals (
--     id SERIAL PRIMARY KEY,
--     goals VARCHAR(255),
--     days INTEGER,
--     complete BOOLEAN,
--     user_id VARCHAR(255)
-- );

-- populate the table
INSERT INTO users (lastname, firstname, stage) VALUES
    ('Liu, Nathan', 1),
    ('Calhoun', 'Katie', 9),
    ('Smith', 'Diana', 4),
    ('Mata', 'Michael', 4),
    ('Lopez', 'Stephanie', 6),
    ('Wright', 'William', 2),
    ('Gallagher', 'Melissa', 4),
    ('Perez', 'Kristen', 5),
    ('Mendoza', 'Jason', 9),
    ('Francis', 'Crystal', 3),
    ('Evans', 'Johnathan', 9);

-- INSERT INTO books (title, year, author_id) VALUES
-- ('The Great Gatsby', 1925, 1),
-- ('This Side of Paradise', 1920, 1),
-- ('Hamlet', 1603, 2),
-- ('Macbeth', 1606, 2),
-- ('Adventures of Huckleberry Finn', 1884, 3),
-- ('The Adventures of Tom Sawyer', 1876, 3),
-- ('The Old Man and the Sea', 1952, 4),
-- ('For Whom the Bell Tolls', 1940, 4),
-- ('1984', 1949, 5),
-- ('Animal Farm', 1945, 5),
-- ('Great Expectations', 1861, 6),
-- ('David Copperfield', 1850, 6),
-- ('War and Peace', 1869, 7),
-- ('Anna Karenina', 1877, 7),
-- ('Pride and Prejudice', 1813, 8),
-- ('Sense and Sensibility', 1811, 8),
-- ('Jane Eyre', 1847, 9),
-- ('Villette', 1853, 9),
-- ('Crime and Punishment', 1866, 10),
-- ('The Brothers Karamazov', 1880, 10),
-- ('The Picture of Dorian Gray', 1890, 11),
-- ('The Canterville Ghost', 1887, 11),
-- ('Les Miserables', 1862, 12),
-- ('The Hunchback of Notre-Dame', 1831, 12),
-- ('The War of the Worlds', 1898, 13),
-- ('The Time Machine', 1895, 13),
-- ('Twenty Thousand Leagues Under the Sea', 1870, 14),
-- ('Journey to the Center of the Earth', 1864, 14),
-- ('Dracula', 1897, 15),
-- ('The Lair of the White Worm', 1911, 15),
-- ('The Adventures of Sherlock Holmes', 1892, 16),
-- ('The Hound of the Baskervilles', 1902, 16),
-- ('Mrs. Dalloway', 1925, 17),
-- ('To the Lighthouse', 1927, 17),
-- ('Alice Adventures in Wonderland', 1865, 18),
-- ('Through the Looking-Glass', 1871, 18),
-- ('Treasure Island', 1883, 19),
-- ('Kidnapped', 1886, 19);
