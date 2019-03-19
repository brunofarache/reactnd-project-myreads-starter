import React from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';

class Book extends React.Component {
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <BookCover thumbnail={this.props.thumbnail} />
                        <BookShelfChanger />
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    {this.props.authors.map((author) => <div key={author} className="book-authors">{author}</div>)}
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    thumbnail: PropTypes.string.isRequired
};

export default Book;