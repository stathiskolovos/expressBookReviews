const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //task 6 Register a new user
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Task10
// Get book lists
const getBookList = () => {
  return new Promise((resolve, reject) => {
      resolve(books);
  });
};

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Task 1: get list of books available in store
//   res.send(JSON.stringify(books,null,4));
//   //return res.status(300).json({message: "Yet to be implemented"});
// });
public_users.get('/',async function (req, res) {
  try {
    const bookList = await getBookList(); 
    res.json(bookList); // Neatly format JSON output
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Task 2: get book details based on ISBN
//   const isbn = parseInt(req.params.isbn);
//   res.send(books[isbn]);
//   //return res.status(300).json({message: "Yet to be implemented"});
//  });
// Task 11 using promise
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
      let isbnNum = parseInt(isbn);
      if (books[isbnNum]) {
          resolve(books[isbnNum]);
      } else {
          reject({ status: 404, message: `ISBN ${isbn} not found` });
      }
  });
};

public_users.get('/isbn/:isbn',function (req, res) {
  getBookByISBN(req.params.isbn)
  .then(
      result => res.send(result),
      error => res.status(error.status).json({message: error.message})
  );
});
  
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Task 3: get book details based on author
//   // filter result by given author
//   const author = req.params.author;

//   // filter books to find matches
//   let matches = Object.values(books).filter((each) => each.author === author);

//   //respond with the matches if any
//   res.send(matches);
//   //Write your code here
//   //return res.status(300).json({message: "Yet to be implemented"});
// });
//  Task 3 & Task 12
//  Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  getBookList()
    .then(res.send(Object.values(books).filter((each) => each.author === author)));
});

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Task 4 get book details based on title
//   // filter result by given author
//   const title = req.params.title;

//   // filter books to find matches
//   let matches = Object.values(books).filter((each) => each.title === title);

//   //respond with the matches if any
//   res.send(matches);
//   //Write your code here
//   //return res.status(300).json({message: "Yet to be implemented"});
// });
//task 13
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  getBookList()
    .then(res.send(Object.values(books).filter((each) => each.title === title)));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Task 5 get book reviews based on isbn
  // get isbn as int
  const isbn = parseInt(req.params.isbn);

  // return only the reviews of the book
  res.send(books[isbn].reviews);

  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
