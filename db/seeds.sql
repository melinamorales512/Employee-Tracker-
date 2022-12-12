USE employees_db

INSERT INTO department(department_name)
VALUES (1,"sales"),
       (2,"Engineering"),
       (3,"Finance"),
       (4,"legal")

INSERT INTO roles (title, salary, department_id,)
VALUES (1,"Sales Lead",10000),
       (1,"Salesperson",8000),
       (2,"Lead Engineer",15000),
       (2,"Software Engineer",12000),
       (3,"Account Manager",16000),
       (3,"Accountant",12500),
       (4,"Legal Team Lead"25000),
       (5,"Lawyer",19000);

       INSERT INTO employee (first_name, last_name, role_id, manager_id) 
       VALUES (John,Doe,1,null),
       VALUES (Mike,Chan,1,John Doe),
       VALUES (Ashley,Rodriguez,2,null),
       VALUES (Kevin,Tupik,2,Ashley Rodriguez),
       VALUES (Kunal,Singh,3,null),
       VALUES (Malia,Brown,3,Kunal Singh),
       VALUES (Sarah,Lourd,4,null),
       VALUES (Tom,Allen,4,Sarah Lourd),

       