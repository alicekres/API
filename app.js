const express = require('express');
const app = express();
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('Hello Everybody!');
});

app.use(express.json());
app.use(cors());

const books = [
  { id: 1, name: 'Dracula', author: 'Bram Stoker' },
  { id: 2, name: '1984', author: 'George Orwell' },
  { id: 3, name: 'Fahrenheit 451', author: 'Ray Bradbury' },
];

app.get('/', (req, res) => {
  res.send('Morning!');
});

app.get('/cats', (req, res) => {
  res.json(cats);
});

app.get('/cats/:id', (req, res) => {
  try {
    const catId = parseInt(req.params.id);
    const cat = cats[catId - 1];
    if (!cat) {
      throw new Error('This cat does not exist');
    } else {
      res.send(cat);
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

app.post('/cats', (req, res) => {
  const lastId = cats.length;
  const newCatId = cats.length + 1;
  const newCat = { ...req.body, adopted: false, id: newCatId };
  cats.push(newCat);
  res.status(201).send(newCat);
});

app.delete('/cats', (req, res) => {
  res.status(204).end();
});

module.exports = app;
