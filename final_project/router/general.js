const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


async function getBooks() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

function getBookDetails(isbn) {
  return new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  });
}

function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(books);
    const booksByAuthor = keys.filter(key => books[key].author === author).map(key => books[key]);

    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor);
    } else {
      reject('No books found by this author');
    }
  });
}

function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(books);
    const booksByTitle = keys.filter(key => books[key].title === title).map(key => books[key]);

    if (booksByTitle.length > 0) {
      resolve(booksByTitle);
    } else {
      reject('No books found with this title');
    }
  });
}


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: ("User successfully registred. Now you can login ")});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  getBooks().then((books) => {
    return res.send(JSON.stringify(books, null, 4));
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  getBookDetails(req.params.isbn).then((book) => {
    return res.send(book);
  }).catch((error) => {
    return res.status(404).send(error);
  });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  getBooksByAuthor(req.params.author).then((books) => {
    return res.send(books);
  }).catch((error) => {
    return res.status(404).send(error);
  });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  getBooksByTitle(req.params.title).then((books) => {
    return res.send(books);
  }).catch((error) => {
    return res.status(404).send(error);
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const book = books[req.params.isbn];

  // Step 3: If the book is found, send it as a response
  if (book) {
    return res.send(book.reviews);
  }

  return res.status(404).send('Book not found');
});

module.exports.general = public_users;
