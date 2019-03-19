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
                        <BookCover width={this.props.cover.width} height={this.props.cover.height} url={this.props.cover.url} />
                        <BookShelfChanger />
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.authors}</div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    cover: PropTypes.object.isRequired
};

export default Book;