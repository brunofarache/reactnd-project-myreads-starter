import React from 'react'
import PropTypes from 'prop-types';

class BookShelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">{this.props.children}</ol>
                </div>
            </div>
        );
    }
}

// TODO: add children type to array of Books
BookShelf.propTypes = {
    title: PropTypes.string.isRequired
};

export default BookShelf;