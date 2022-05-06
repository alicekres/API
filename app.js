const express = require('express');
const app = express();
const cors = require('cors');
// const Book = require('../models/book');

app.use(express.json());
app.use(cors());

const books = [
  { id: 1, name: 'Dracula', author: 'Bram Stoker' },
  { id: 2, name: '1984', author: 'George Orwell' },
  { id: 3, name: 'Fahrenheit 451', author: 'Ray Bradbury' },
];

app.get('/', (req, res) => {
  res.send('Welcome to your library!');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = books[bookId - 1];
    if (!book) {
      throw new Error('This book does not exist');
    } else {
      res.send(book);
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

app.post('/books', (req, res) => {
  const lastId = books.length;
  const newBookId = lastId + 1;
  const newBook = { ...req.body, id: newBookId };
  books.push(newBook);
  res.status(201).send(newBook);
});

app.delete('/books', (req, res) => {
  res.status(204).end();
});

module.exports = app;
