var mysql = require("mysql");
var inquirer = require("inquirer");

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
        choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
    }
]).then(function(answer) {

    if (answer.mainMenu === "View Products For Sale") {
        var query = "SELECT * FROM products";
        connection.query(query, function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              console.log("ID: " + res[i].item_id +  " || Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: "+ res[i].stock_quantity);
              console.log("");
            }
            connection.end();
        });
    }
    if (answer.mainMenu === "View Low Inventory") {
        var query = "SELECT * FROM products WHERE stock_quantity < 5";
        connection.query(query, function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              console.log("ID: " + res[i].item_id +  " || Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quantity: "+ res[i].stock_quantity);
              console.log("");
            }
            connection.end();
        });
    }
    if (answer.mainMenu === "Add To Inventory") {
        inquirer.prompt([
            {
                name: "idInput",
                message: "What is the item ID of the product you would like to add?"
            },
            {
                name: "addQuantity",
                message: "What quantity would you like to add?"
            }
        ]).then(function(answer) {
            var query = "UPDATE products SET stock_quantity = stock_quantity + " + answer.addQuantity + " WHERE item_id = " + answer.idInput;
            connection.query(query, function(err, res) {
                if (err) throw err;
            });
            connection.end();
        })    
    }
    if (answer.mainMenu === "Add New Product") {
        inquirer.prompt([
            {
                name: "itemName",
                message: "Product Name:"
            },
            {
                name: "itemDepartment",
                message: "Product Department:"
            },
            {
                name: "itemPrice",
                message: "Product Price:"
            },
            {
                name: "itemQuantity",
                message: "Product Quantity:"
            }
        ]).then(function(answer) {
            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUE ('" + answer.itemName + "','" + answer.itemDepartment + "','" + answer.itemPrice + "','" + answer.itemQuantity + "',0)"
            connection.query(query, function(err, res) {
                if (err) throw err;
            })
            var query = "INSERT INTO departments (department_name, over_head_costs) VALUE ('" + answer.itemDepartment + "', 1000)"
            connection.query(query, function(err, res) {
                if (err) throw err;
                connection.end();

            })
        })
    }
})