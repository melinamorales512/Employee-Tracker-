//Importing modules

const inquirer = require("inquirer");
const mysql = require('mysql2');

require('console.table')

//created connection
const connection = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: 'Momena@76',

  database: "employees_db",

});

// Connect to MySQL and data_base

connection.connect(function (err) {
  if (err) throw err;
});


//Prompt // Create an array of questions for user input

firstPrompt();

function firstPrompt() {

  inquirer
    .prompt([{
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Add Department",
        "Update Employee Role",
        "Add Role",
        "End"
        ]
    }]).then(({task}) => {
      console.log(task)
      switch (task) {
        case "View Employees":
          console.log("View Employees")
          viewEmployee();
          break;

        case "View Departments":
          viewDepartments();
          break;
      
        // case "Add Employee":
        //   addEmployee();
        //   break;

        // case "Remove Employees":
        //   removeEmployees();
        //   break;

        // case "Update Employee Role":
        //   updateEmployeeRole();

        //   break;

        // case "Add Role":
        //   addRole();
        //   break;

        // case "End":
        //   console.log("end");
        //   connection.end();
        //   break;
        default:
          connection.end();
      }
    });
}

//choose employee by name,last name.id role,manager id

function viewEmployee() {
  console.log(`Viewing employees\n`);

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees viewed!\n");

    firstPrompt();
 });

}

//choose employee by department 

 function viewDepartments() 
 {
    console.log("Viewingdepartments\n");

  const query = connection.query
  ("SELECT * FROM departments", function (err, res){
    if (err) throw err


  


  //   `SELECT d.id, d.name, r.salary AS budget
  // FROM employee e
  // JOIN role r
	// ON e.role_id = r.id
  // JOIN department d
  // ON d.id = r.department_id
  // GROUP BY d.id, d.name`

  

    // const departmentChoices = res.map(data => ({
    //   value: data.id, name: data.name
    //}));

    console.table(res);
    console.log("Department view succeed!\n");
    firstPrompt();

  //   promptDepartment(departmentChoices);
  });
}

//name of different departmets

// function promptDepartment(departmentChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "departmentId",
//         message: "What is the name of the department?",
//         choices: departmentChoices
//       }
//     ])
//     .then(function (answer) {
//       console.log("answer ", answer.departmentId);

//       var query =
//         `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
//   FROM employee e
//   JOIN role r
// 	ON e.role_id = r.id
//   JOIN department d
//   ON d.id = r.department_id
//   WHERE d.id = ?`

//       connection.query(query, answer.departmentId, function (err, res) {
//         if (err) throw err;

//         console.table("response ", res);
//         console.log(res.affectedRows + "Employees are viewed!\n");

//         firstPrompt();
//       });
//     });
// }

//employee list

// function addEmployee() {
//   console.log("Inserting an employee!")

//   var query =
//     `SELECT r.id, r.title, r.salary 
//       FROM role r`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     const roleChoices = res.map(({ id, title, salary }) => ({
//       value: id, title: `${title}`, salary: `${salary}`
//     }));

//     console.table(res);
//     console.log("RoleToInsert!");

//     promptInsert(roleChoices);
//   });
// }

// function promptInsert(roleChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "first_name",
//         message: "What is the employee's first name?"
//       },
//       {
//         type: "input",
//         name: "last_name",
//         message: "What is the employee's last name?"
//       },
//       {
//         type: "list",
//         name: "roleId",
//         message: "What is the employee's role?",
//         choices: roleChoices
//       },
//     ])
//     .then(function (answer) {
//       console.log(answer);

//       var query = `INSERT INTO employee SET ?`
//       // insert a new employee to the database
//       connection.query(query,
//         {
//           first_name: answer.first_name,
//           last_name: answer.last_name,
//           role_id: answer.roleId,
//           manager_id: answer.managerId,
//         },
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
//           console.log(res.insertedRows + "Inserted successfully!\n");

//           firstPrompt();
//         });
//     });
// }


//delete employee

// function removeEmployees() {
//   console.log("Deleting an employee");

//   var query =
//     `SELECT e.id, e.first_name, e.last_name
//       FROM employee e`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
//       value: id, name: `${id} ${first_name} ${last_name}`
//     }));

//     console.table(res);
//     console.log("ArrayToDelete!\n");

//     promptDelete(deleteEmployeeChoices);
//   });
// }

// User choose the employee list, then employee is deleted
// function promptDelete(deleteEmployeeChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "employeeId",
//         message: "Which employee'name do you want to delete?",
//         choices: deleteEmployeeChoices
//       }
//     ])
//     .then(function (answer) {

//       var query = `DELETE FROM employee WHERE ?`;
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(query, { id: answer.employeeId }, function (err, res) {
//         if (err) throw err;

//         console.table(res);
//         console.log(res.affectedRows + "Deleted!\n");

//         firstPrompt();
//       });
//     });
// }

//update role

// function updateEmployeeRole() { 
//   employeeArray();

// }

// function employeeArray() {
//   console.log("Updating an employee");

//   var query =
//     `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
//   FROM employee e
//   JOIN role r
// 	ON e.role_id = r.id
//   JOIN department d
//   ON d.id = r.department_id
//   JOIN employee m
// 	ON m.id = e.manager_id`

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     const employeeChoices = res.map(({ id, first_name, last_name }) => ({
//       value: id, name: `${first_name} ${last_name}`      
//     }));

//     console.table(res);
//     console.log("employeeArray To Update!\n")

//     roleArray(employeeChoices);
//   });
// }

// function roleArray(employeeChoices) {
//   console.log("Updating an role");

//   var query =
//     `SELECT r.id, r.title, r.salary 
//   FROM role r`
//   let roleChoices;

//   connection.query(query, function (err, res) {
//     if (err) throw err;

//     roleChoices = res.map(({ id, title, salary }) => ({
//       value: id, title: `${title}`, salary: `${salary}`      
//     }));

//     console.table(res);
//     console.log("roleArray to Update!\n")

//     promptEmployeeRole(employeeChoices, roleChoices);
//   });
// }

// function promptEmployeeRole(employeeChoices, roleChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "employeeId",
//         message: "Which role do you want to assign the selected employee?",
//         choices: employeeChoices
//       },
//       {
//         type: "list",
//         name: "roleId",
//         message: "Which role do you want to update?",
//         choices: roleChoices
//       },
//     ])
//     .then(function (answer) {

//       var query = `UPDATE employee SET role_id = ? WHERE id = ?`
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(query,
//         [ answer.roleId,  
//           answer.employeeId
//         ],
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
//           console.log(res.affectedRows + "Updated successfully!");

//           firstPrompt();
//         });
//     });
// }


//add name of role for new employee

// function addRole() {

//   var query =
//     `SELECT d.id, d.name, r.salary AS budget
//     FROM employee e
//     JOIN role r
//     ON e.role_id = r.id
//     JOIN department d
//     ON d.id = r.department_id
//     GROUP BY d.id, d.name`

//   connection.query(query, function (err, res) {
//     if (err) throw err;
//     const departmentChoices = res.map(({ id, name }) => ({
//       value: id, name: `${id} ${name}`
//     }));

//     console.table(res);
//     console.log("Department array!");

//     promptAddRole(departmentChoices);
//   });
// }

// function promptAddRole(departmentChoices) {

//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "roleTitle",
//         message: "Role title?"
//       },
//       {
//         type: "input",
//         name: "roleSalary",
//         message: "Role Salary"
//       },
//       {
//         type: "list",
//         name: "departmentId",
//         message: "Department?",
//         choices: departmentChoices
//       },
//     ])
//     .then(function (answer) {

//       var query = `INSERT INTO role SET ?`

//       connection.query(query, {
//         title: answer.title,
//         salary: answer.salary,
//         department_id: answer.departmentId
//       },
//         function (err, res) {
//           if (err) throw err;

//           console.table(res);
//           console.log("Role Inserted!");

//           firstPrompt();
//         });

//     });
// }