SELECT *
FROM department
JOIN employees ON department.employees_id = employees_id
ORDER BY employees.employee_name

SELECT *
FROM department
JOIN role ON department.id = role.department_id
JOIN employee ON role.id = employee.role_id
ORDER BY employee.first_name