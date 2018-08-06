# bamazon

The purpose of this project is to construct an Amazon-like command line interface application, utilizing mySQL concepts learned in class.

The project utilizes Node.js, mySQL, and the following node modules:

    inquirer
    mysql
    console.table

Prior to use of the application, one must run the included schema.sql file on a properly connected local server. Servernames and passwords must then be updated on each of the .js files. npm install must also be run in the terminal, to install necessary node module files.


**bamazonCustomer**

This .js file provides the customer front-end experience. Customers can view the list of available products, and select a product and quantity to buy.

![Screen1](/images/screen1.jpg)

![Screen2](/images/screen2.png)

The program checks to make sure there is adequare inventory prior to accepting the purchase. The database is then updated to reflect the decreased quantity, as well as update the total sales data for the product.


**bamazonManager**

This .js file provides a platform for Bamazon managers to monitor and manage inventory. The user is able to select from a number of functions: View Products For Sale, View Low Inventory, Add to Inventory, Add New Product

![Screen3](/images/screen3.png)

If the user chooses View Products For Sale, the application generates an inventory report.

![Screen4](/images/screen4.png)

If the user chooses View Low Inventory, an inventory report is generated containing products with less than 5 units in stock.

![Screen5](/images/screen5.png)

If the user chooses Add To Inventory, the user is prompted for the product ID and quantity. The database is then updated.

![Screen6](/images/screen6.png)

If the user chooses Add New Product, the user is then prompted for product name, department, price, and quantity. The database is then updated.

![Screen7](/images/screen7.png)

**bamazonSupervisor**

This .js file allows for Bamazon supervisors to access information pertaining to particular departments.

![Screen8](/images/screen8.png)

If the user selects View Product Sales By Department, they are presented with a table with departmental sales.

![Screen9](/images/screen9.png)

If the user selects Create New Department, a new department is added to the department database.

![Screen10](/images/screen10.png)

