import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book.js'
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
		shelves: {
			'currentlyReading': {
				title: 'Currently Reading',
				books: []
			},
			'wantToRead': {
				title: 'Want to Read',
				books: []
			},
			'read': {
				title: 'Read',
				books: []
			}
		}
	}

	componentDidMount() {
		const { shelves } = this.state;

		BooksAPI.getAll().then((books) => {
			books.forEach(book => {
				const {id, title, authors, imageLinks} = book;

				shelves[book.shelf].books.push({
					id,
					title,
					authors,
					imageLinks
				});
			});

			this.setState(shelves);
		});
	}

	render() {
		const { shelves } = this.state;
		const { currentlyReading, wantToRead, read} = shelves;

		return (
			<div className="app">
				{this.state.showSearchPage ? (
					<div className="search-books">
						<div className="search-books-bar">
							<button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
							<div className="search-books-input-wrapper">
								{/*
									NOTES: The search from BooksAPI is limited to a particular set of search terms.
									You can find these search terms here:
									https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

									However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
									you don't find a specific author or title. Every search is limited by search terms.
								*/}
								<input type="text" placeholder="Search by title or author"/>

							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid"></ol>
						</div>
					</div>
				) : (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<BookShelf key={currentlyReading.id} title={currentlyReading.title}>
									{currentlyReading.books.map(book => (
										<Book
											key={book.id}
											title={book.title}
											authors={book.authors}
											thumbnail={book.imageLinks.thumbnail} />		
									))}
								</BookShelf>

								<BookShelf key={wantToRead.id} title={wantToRead.title}>
									{wantToRead.books.map(book => (
										<Book
											key={book.id}
											title={book.title}
											authors={book.authors}
											thumbnail={book.imageLinks.thumbnail} />		
									))}
								</BookShelf>

								<BookShelf key={read.id} title={read.title}>
									{read.books.map(book => (
										<Book
											key={book.id}
											title={book.title}
											authors={book.authors}
											thumbnail={book.imageLinks.thumbnail} />		
									))}
								</BookShelf>
							</div>
						</div>
						<div className="open-search">
							<button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default BooksApp
