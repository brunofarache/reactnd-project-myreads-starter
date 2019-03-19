import React from 'react'
import PropTypes from 'prop-types';

class BookCover extends React.Component {
    render() {
        return (
            <div className="book-cover" style={{
                width: 128,
                height: 192,
                backgroundImage: "url(" + this.props.thumbnail + ")" 
            }}></div>
        );
    }
}

BookCover.propTypes = {
    thumbnail: PropTypes.string.isRequired,
};

export default BookCover;