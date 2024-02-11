# Hybr1d_Assignment

This assignment is entirely backend-focused, leveraging robust frameworks, JS-libraries, and SQL database to create a platform facilitating interaction between buyers and sellers. It encompasses functionalities such as user registration, authentication, catalog management, and order processing etc..

# Features

<ul>User Registration and Authentication </ul>
<li>Buyers and sellers can easily create accounts to access the platform's features. </li>
<li>Passwords are encrypted using Bcrypt, providing an extra layer of security to safeguard user data.</li>
<li>Additional password validation is implemented using the password-validator library.</li>
<li>Registered users can securely log in to their accounts, ensuring a safe and personalized experience through tokens.</li>
<li>JWT tokens are generated upon successful login for both authentication and authorization purposes.</li>
<br>
<ul>Seller Features</ul>
<li>Sellers have the capability to create catalogs of items.</li>
<li>Each item featured in the catalog is characterized by its name, price, and optional details such as item description, category, cover image, etc., empowering sellers to proficiently showcase their products to prospective buyers.</li>
<li>Sellers have access to a list of orders they have received.</li>
<br>
<ul>Buyer Features</ul>
<li>Can access a list of all registered sellers on the platform.</li>
<li>Have the capability to retrieve a list of available items offered by each seller.</li>
<li>Can create orders by selecting items from a different seller's catalog.</li>

# Access Postman Collection

<ul>Detailed API documentation is accessible through Postman. Simply import the following URL into Postman to gain access to the Postman collection for this assignment:</ul>
<li><a href="https://api.postman.com/collections/20520271-294e56e6-2bf9-4fa6-9dd5-8263b54bde8d?access_key=PMAT-01HPCVRJVKNCNK1QQEN6HAEEG3">Postman Collection URL</a></li>


# API Documentation
<ul>Ensure that all the following APIs include a Bearer token specific to the route, with distinct tokens required for seller and buyer routes</ul>
<li> POST : /api/auth/register - To register user with userName, mobileNo, password, role ( All fields are essential )</li>
<li>  POST : /api/auth/login - To Login by passing userName, mobileNo, password ( All fields are essential )</li>
<li>  POST : /api/seller/create-catalog - To create new catalog with itemName, price and optional details such as description, category, coverImage.</li>
<li>  GET  : /api/seller/orders - To get list of orders from different users with item list, total order pricing, buyer details, addresss etc.</li>
<li>  GET  : /api/buyer/list-of-sellers - To retrive list of all available active sellers.</li>
<li>  GET  : /api/buyer/seller-catalog/:seller_id  - To retrive list of all available items against specific seller.</li>
<li>  POST : /api/buyer/create-order - To create order from all available items by every seller, by passing itemId and its required qty and other optional details like buyer address, city, pincode etc.</li>


# Technologies Used
<li>Node.js: Backend server environment.</li>
<li>Express.js: Web application framework for Node.js.</li>
<li>Bcrypt: Library for password hashing.</li>
<li>JWT (JSON Web Tokens): Authentication and authorization mechanism./li>
<li>MySQL: Relational database management system.</li>
<li>Sequelize: ORM for MySQL</li>
<li>express-validator : express middleware for better error handling</li>



# Getting Started
To run the application locally, follow these steps:

Clone this repository to your local machine.
Install the necessary dependencies using npm install and here I am using port no 3018.
Run the server using npm run start:watch.
