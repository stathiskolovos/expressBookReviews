# Final Project: Book Review Application (Node.js/Express)

In this project you will assume the role of a back-end developer working for an online retailer selling books. You have been tasked with developing a server-side application that stores, retrieves and manages book ratings and reviews.

Your server-side application is required to provide the following features and capabilities to allow users to:

1. Retrieve a list of all books available in the bookshop
2. Search for specific books and retrieve their details based on the book’s ISBN code, author names and titles
3. Retrieve reviews/comments for specified books
4. Register as a new user of the application
5. Login to the application
6. Add a new review for a book (logged in users only)
7. Modify a book review (logged in users can modify only their own reviews)
8. Delete a book review (logged in users can delete only their own reviews)
9. (Multiple users) Access the application at the same time to view and manage different book reviews simultaneously

As is the case with most software development projects, different people in the team work on different parts of the application. Another front-end developer in your team is working on the web-based client-side application that will communicate with your server-side application using REST. Therefore your job is to implement your server-side application as a RESTful web service. A software architect on your team has written the skeleton code for your server-side application using Node.js and Express.js.

To complete the project you will fork the skeleton code into your own repo, clone it locally into your development environment, and develop the code further to implement the CRUD capabilities listed above as HTTP methods in your Express server and test them using Postman. You will also implement Session and JWT authentication to allow only logged in users to perform certain operations. For your reference, this application comes preloaded with all of the book information.

Furthermore you will need to enhance your code using Promises, Callbacks or Async/Await functions to allow multiple users to interact with the application simultaneously and not have to wait for each other’s operations to complete.
