-- Create 'role' ENUM type
CREATE TYPE role AS ENUM ('admin', 'user');
CREATE TYPE task_status AS ENUM ('Backlog', 'Doing', 'Q&A', 'Production');

-- Create the 'users' table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       first_name VARCHAR(255),
                       last_name VARCHAR(255),
                       role VARCHAR(50) DEFAULT 'user'
);

-- Create the 'projects' table
CREATE TABLE projects (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          description TEXT
);

-- Create the 'columns' table
CREATE TABLE columns (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         project_id INT NOT NULL,
                         FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Create the 'labels' table
CREATE TABLE labels (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) UNIQUE NOT NULL,
                        color VARCHAR(7)
);

-- Create the 'tasks' table
CREATE TABLE tasks (
                       id SERIAL PRIMARY KEY,
                       project_id INT NOT NULL,
                       column_id INT NOT NULL,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       status VARCHAR(50) DEFAULT 'Backlog',
                       assigned_to INT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (project_id) REFERENCES projects(id),
                       FOREIGN KEY (column_id) REFERENCES columns(id),
                       FOREIGN KEY (assigned_to) REFERENCES users(id)
);
