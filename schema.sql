DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL auto_increment,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales DECIMAL(10,2),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUE 
("iPod", "Electronics", 250.00, 15, 0), 
("Flip Flops", "Clothing", 20.00, 25, 0),
("Toaster", "Home and Garden", 30.00, 30, 0),
("Laptop", "Electronics", 1000.00, 10, 0),
("T-Shirt", "Clothing", 20.00, 25, 0),
("Lamp", "Home and Garden", 50.00, 20, 0),
("TV", "Electronics", 300.00, 15, 0),
("Pants", "Clothing", 35.00, 25, 0),
("Pillow", "Home and Garden", 15.00, 40, 0),
("Speakers", "Electronics", 150.00, 15, 0);


CREATE TABLE departments (
	department_id INT NOT NULL auto_increment,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUE ("Electronics", 1000), ("Clothing", 2000), ("Home and Garden", 1500);

SELECT * FROM products 