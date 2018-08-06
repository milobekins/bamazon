var mysql = require("mysql");
var inquirer = require("inquirer");
var ctable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

inquirer.prompt([
    {
        name: "mainMenu",
        type: "list",
        choices: ["View Product Sales By Department", "Create New Department"]
    }
]).then(function(answer) {
    if (answer.mainMenu === "View Product Sales By Department") {
        var query = "SELECT department_name, SUM(product_sales) AS product_sales FROM products GROUP BY department_name;"
        connection.query(query, function(err, res) {
            console.table(res);
            connection.end();
        })
    }
    if (answer.mainMenu === "Create New Department") {
        inquirer.prompt([
            {
                name: "departmentName",
                message: "What is the department name?"
            }
        ]).then(function(answer) { 
            console.log(answer.departmentName)
            var query = "INSERT INTO departments (department_name, over_head_costs) VALUE ('" + answer.departmentName + "', 1000)";
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log("department added");
                connection.end();
            })
        });  
       
    }
});