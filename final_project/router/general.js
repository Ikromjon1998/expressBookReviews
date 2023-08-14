const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const book = books[req.params.isbn];

  // Step 3: If the book is found, send it as a response
  if (book) {
    return res.send(book);
  }

  return res.status(404).send('Book not found');
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const keys = Object.keys(books);
  const booksByAuthor = keys
      .filter(
          key => books[key].author === author
      ).map(key => books[key]);

  if (booksByAuthor.length > 0) {
    return res.send(booksByAuthor);
  }

  return res.status(404).send('No books found by this author');
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
//Write your code here
  const title = req.params.title;
  const keys = Object.keys(books);
  const booksByAuthor = keys
      .filter(
          key => books[key].title === title
      ).map(key => books[key]);

  if (booksByAuthor.length > 0) {
    return res.send(booksByAuthor);
  }

  return res.status(404).send('No books found by this title');
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
