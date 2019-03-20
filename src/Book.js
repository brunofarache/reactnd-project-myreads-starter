import React from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';

class Book extends React.Component {
    onChangeShelf = (e) => {
        const shelf = e.target.value;
        this.props.onChangeShelf(this.props.id, shelf);
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <BookCover thumbnail={this.props.thumbnail} />
                        <BookShelfChanger shelf={this.props.shelf} onChangeShelf={this.onChangeShelf} />
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    {this.props.authors.map((author) => <div key={author} className="book-authors">{author}</div>)}
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    thumbnail: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default Book;