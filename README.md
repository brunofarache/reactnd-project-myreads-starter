# MyReads Project

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Components

[`BookShelf.js`](src/BookShelf.js) books container, accepts [`Book.js`](src/Book.js) children nodes.
[`Book.js`](src/Book.js) represents a book. Required properties: `id` (string), `title` (string), `thumbnail` (string), `onChangeSelf` (callback function that will be called when the user change a book's shelf.
[`BookCover.js`](src/BookCover.js): displays book's thumbnail.
[`BookShelfChanger.js`](src/BookShelfChanger.js): renders select to move books to shelves.
