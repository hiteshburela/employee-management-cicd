CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    department VARCHAR(100),
    salary DECIMAL(10,2)
);

INSERT INTO employees
(name, email, department, salary)
VALUES
('Krishna', 'krishna44@gmail.com', 'IT', 50000.00),
('Ramesh', 'ramesh22@gmail.com', 'HR', 55000.00),
('hitesh', 'hitesh1@gmail.com', 'Finance', 60000.00);
