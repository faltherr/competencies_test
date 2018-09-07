CREATE TABLE users_new (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password varchar(40),
  favNum integer,
  price decimal,
  class1 varchar(40),
  degree varchar(40),
  pie float,
  name VARCHAR,
  email VARCHAR
);

insert into users_new (
  id,
  username,
  password,
  favNum,
  price,
  class1,
  degree,
  pie,
  name,
  email
) VALUES(
1,
'faltherr',
'trees',
32,
1.00,
'bio1',
'biology',
3.14159,
'forest altherr',
'falther@goob.com'
);

insert into users_new (
  id,
  username,
  password,
  favNum,
  price,
  class1,
  degree,
  pie,
  name,
  email
) VALUES(
3,
'daphne',
'hairstyle',
11,
1.31,
'bio1',
'chemistry',
3.1,
'Daphne',
'MysterVan@goob.com'
);



-- create table backpack(
-- id serial,
-- backpackID VARCHAR(40),
-- item1 text,
-- item2 text
-- )

-- ALTER TABLE users_new ADD COLUMN packID INTEGER;
-- ALTER TABLE backpack ADD COLUMN uniquePack serial primary key

-- ALTER TABLE users_new 
--   ADD CONSTRAINT fk_backpack
--   FOREIGN KEY (packID)
--   REFERENCES backpack(uniquePack);

-- select * from backpack





-- create table instructors (
-- id serial primary key,
-- subject varchar(20),
-- experience integer
-- )

-- insert into instructors(id, subject, experience) VALUES(1, 'math', 7);
-- insert into instructors(id, subject, experience) VALUES(2, 'science', 7);
-- insert into instructors(id, subject, experience) VALUES(3, 'english', 6);
-- insert into instructors(id, subject, experience) VALUES(4, 'math', 7);
-- insert into instructors(id, subject, experience) VALUES(5, 'biology', 6);


-- MANY TO MANY

-- create table student_teacher_junction
-- (
--   student_id int,
--   instructor_id int,
--   CONSTRAINT stdnt_prof_pk PRIMARY KEY (student_id, instructor_id),
--   CONSTRAINT FK_student
--       FOREIGN KEY (student_id) REFERENCES users_new (id),
--   CONSTRAINT FK_instructor 
--       FOREIGN KEY (instructor_id) REFERENCES instructors (id)
-- );

-- insert into student_teacher_junction VALUES (1,1), (2,3), (1,2)



-- Select from many to many

-- SELECT *
-- FROM users_new as s
-- INNER JOIN student_teacher_junction as j
--     ON s.id = j.student_id
-- INNER JOIN instructors as i


-- Subquerrry competency

-- SELECT sub.*
-- FROM( SELECT *
-- FROM users_new
-- WHERE class1 = 'bio1'
-- )sub 
-- WHERE degree = 'math'