DROP DATABASE IF EXISTS management_db;
CREATE DATABASE management_db;

USE management_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roleEmp (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(20,2) NOT NULL, 
    department_id INT, 
    FOREIGN KEY (department_id)
            REFERENCES department(id)
            ON DELETE CASCADE 
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT, 
    FOREIGN KEY (role_id)
        REFERENCES roleEmp(id)
        ON DELETE CASCADE, 
    manager_id INT,
    FOREIGN KEY (manager_id) 
        REFERENCES employees(id)
        ON DELETE SET NULL
);