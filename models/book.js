// const booksData = require('../app');

// class Book {
//   constructor(data) {
//     this.name = data.name;
//     this.author = data.author;
//     this.id = data.id;
//   }

//   static get all() {
//     const books = booksData.map((book) => new Book(book));
//     return books;
//   }

//   static create(book) {
//     const newBookId = booksData.length + 1;
//     const newBook = new Book({ id: newBookId, ...book });
//     booksData.push(newBook);
//     return newBook;
//   }
// }

// module.exports = Book;
