import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book.js';
import BookShelf from './BookShelf';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
	state = {
		books: [],
		searchedBooks: []
	}

	findByBookId = (books, id) => {
		return books.find(book => (book.id === id));
	}

	onChangeShelf = (id, shelf) => {
		BooksAPI.update({id: id}, shelf).then(() => {
			let book = this.findByBookId(this.state.books, id);

			if (!book) {
				book = this.findByBookId(this.state.searchedBooks, id);
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
			this.setState({searchedBooks: []});
			return;
		}

        BooksAPI.search(query.trim()).then(searchedBooks => {
			if (searchedBooks.error) {
				searchedBooks = [];
			}

			searchedBooks = searchedBooks.filter(searchedBook => {
				if (searchedBook.imageLinks && searchedBook.imageLinks.thumbnail) {
					const book = this.findByBookId(this.state.books, searchedBook.id);

					if (book) {
						searchedBook.shelf = book.shelf;
					}

					return true;
				}
				else {
					return false;
				}
				
			});

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
				<Route path='/search' render={() => (
					<div className="search-books">
						<div className="search-books-bar">
							<Link to='/'><button className="close-search" onClick={() => this.setState({ searchedBooks: [] })}>Close</button></Link>
							<div className="search-books-input-wrapper">
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
				)} />

				<Route exact path='/' render={() => (
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
							<Link to='/search'><button>Search</button></Link>
						</div>
					</div>
				)} />
			</div>
		)
	}
}

export default BooksApp
