USE employees_db;

INSERT INTO department(name)
VALUES ("sales"),
       ("Engineering"),
       ("Finance"),
       ("legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Sales Lead",10000,1),
       ("Salesperson",8000,1),
       ("Lead Engineer",15000,2),
       ("Software Engineer",12000,2),
       ("Account Manager",16000,3),
       ("Accountant",12500,3),
       ("Legal Team Lead",25000,4),
       ("Lawyer",19000,4);

       INSERT INTO employee (first_name, last_name, role_id, manager_id) 
       VALUES ("John","Doe",1,null),
        ("Mike","Chan",1,1),
        ("Ashley","Rodriguez",2,null),
        ("Kevin","Tupik",2,2),
        ("Kunal","Singh",3,null),
        ("Malia","Brown",3,3),
        ("Sarah","Lourd",4,null),
        ("Tom","Allen",4,4);

       