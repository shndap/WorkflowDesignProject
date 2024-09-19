-- Insert dummy data into the 'users' table
INSERT INTO users (username, password, email, first_name, last_name, role)
VALUES ('jdoe', 'password123', 'jdoe@example.com', 'John', 'Doe', 'user'),
       ('asmith', 'password456', 'asmith@example.com', 'Alice', 'Smith', 'admin'),
       ('bwayne', 'password789', 'bwayne@example.com', 'Bruce', 'Wayne', 'user'),
       ('clane', 'password321', 'clane@example.com', 'Clark', 'Lane', 'user'),
       ('dprince', 'password654', 'dprince@example.com', 'Diana', 'Prince', 'user');

-- Insert dummy data into the 'projects' table
INSERT INTO projects (name, description)
VALUES ('Project Alpha', 'Description for Project Alpha'),
       ('Project Beta', 'Description for Project Beta'),
       ('Project Gamma', 'Description for Project Gamma'),
       ('Project Delta', 'Description for Project Delta'),
       ('Project Epsilon', 'Description for Project Epsilon');

-- Insert dummy data into the 'columns' table
INSERT INTO columns (name, project_id)
VALUES ('To Do', 1),
       ('In Progress', 1),
       ('Done', 1),
       ('To Do', 2),
       ('In Progress', 2),
       ('Done', 2),
       ('Backlog', 3),
       ('In Review', 3),
       ('Complete', 3);

-- Insert dummy data into the 'labels' table
INSERT INTO labels (name, color)
VALUES ('Urgent', '#FF0000'),
       ('Bug', '#FFA500'),
       ('Feature', '#008000'),
       ('Enhancement', '#0000FF'),
       ('Documentation', '#FFFF00');

-- Insert dummy data into the 'tasks' table
INSERT INTO tasks (project_id, column_id, title, description, status, assigned_to)
VALUES (1, 1, 'Task 1', 'Description for Task 1', 'Backlog', 1),
       (1, 1, 'Task 2', 'Description for Task 2', 'Backlog', 2),
       (1, 2, 'Task 3', 'Description for Task 3', 'In Progress', 3),
       (1, 3, 'Task 4', 'Description for Task 4', 'Done', 4),
       (2, 4, 'Task 5', 'Description for Task 5', 'Backlog', 5),
       (2, 5, 'Task 6', 'Description for Task 6', 'In Progress', 1),
       (2, 6, 'Task 7', 'Description for Task 7', 'Done', 2),
       (3, 7, 'Task 8', 'Description for Task 8', 'Backlog', 3),
       (3, 8, 'Task 9', 'Description for Task 9', 'In Review', 4),
       (3, 9, 'Task 10', 'Description for Task 10', 'Complete', 5);
