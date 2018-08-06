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

var price;

var displayProd = function() {
    console.log("");
    console.log("WELCOME TO BAMAZON");
    console.log("--------------------------");
    console.log("");

    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].item_id +  " || Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price);
          console.log("");
        }
        buyProd();
    });
}

var buyProd = function() {
    inquirer.prompt([
        {
            name: "idInput",
            message: "What is the ID of product desired?"
        },
        {
            name: "quantityInput",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer, err) {
        if (err) throw err;
        
        var query = "SELECT stock_quantity, price FROM products WHERE item_id = " + answer.idInput;
        connection.query(query, function(err, res) {
            price = res[0].price * answer.quantityInput;

            if (err) throw err;

            if (res[0].stock_quantity === 0) {
                console.log("I'm sorry, that item is out of stock.")
                buyProd();
            }
            
            else if (answer.quantityInput > res[0].stock_quantity) {
                console.log("I'm sorry, we do not have that quantity in stock.")
                buyProd();

            }
            else {
                var query = "UPDATE products SET stock_quantity = stock_quantity - " + answer.quantityInput + " WHERE item_id = " +answer.idInput;
                connection.query(query, function(err, res) {
                    if (err) throw err;
                    console.log("Your Order Has Been Placed!")
                    console.log("Grand Total: " + price);
                    console.log(price);
                    var query = "UPDATE products SET product_sales = product_sales + " + price + " WHERE item_id = " +answer.idInput;
                    connection.query(query, function(err, res) {
                        if (err) throw err;
                        console.log(res);
                    });
                    connection.end();
                });
               
            }
        });
        
        
    });
};

connection.connect(function(err) {
    if (err) throw err;
    displayProd();
}); 
