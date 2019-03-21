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
		books: [],
		searchedBooks: []
	}

	onChangeShelf = (id, shelf) => {
		BooksAPI.update({id: id}, shelf).then(() => {
			const findByBookId = book => (book.id === id);
			let book = this.state.books.find(findByBookId);

			if (!book) {
				book = this.state.searchedBooks.find(findByBookId);
				this.state.books.push(book);
			}

			book.shelf = shelf;

			this.setState({
				books: this.state.books
			});
		});
	}

	onSearch = (query) => {
		query = query.trim();

		if (query === '') {
			return;
		}

        BooksAPI.search(query.trim()).then(searchedBooks => {
			if (searchedBooks.error) {
				searchedBooks = [];
			}

			this.setState({searchedBooks: searchedBooks});
		});
    }

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books: books});
		});
	}

	render() {
		const { searchedBooks } = this.state;
		const sort = (a, b) => a.title.localeCompare(b.title);

		const shelves = [
			{
				id: 'currentlyReading',
				title: 'Currently Reading',
				books: this.state.books.filter(book => (book.shelf === 'currentlyReading')).sort(sort)
			},
			{
				id: 'wantToRead',
				title: 'Want to Read',
				books: this.state.books.filter(book => (book.shelf === 'wantToRead')).sort(sort)
			},
			{
				id: 'read',
				title: 'Read',
				books: this.state.books.filter(book => (book.shelf === 'read')).sort(sort)
			}
		];

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
								<input type="text" placeholder="Search by title or author" onChange={(event) => this.onSearch(event.target.value)} />

							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid">
								{searchedBooks.map(book => (
									<Book
										key={book.id}
										onChangeShelf={this.onChangeShelf}
										{...book}
										thumbnail={book.imageLinks.thumbnail} />
								))}
							</ol>
						</div>
					</div>
				) : (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								{shelves.map(shelve => (
									<BookShelf key={shelve.id} title={shelve.title}>
										{shelve.books.map(book => (
											<Book
												key={book.id}
												onChangeShelf={this.onChangeShelf}
												{...book}
												thumbnail={book.imageLinks.thumbnail} />		
										))}
									</BookShelf>
								))}
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
