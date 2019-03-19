import React from 'react'
import PropTypes from 'prop-types';

class BookCover extends React.Component {
    render() {
        return (
            <div className="book-cover" style={{
                width: this.props.width,
                height: this.props.height,
                backgroundImage: "url(" + this.props.url + ")" 
            }}></div>
        );
    }
}

BookCover.propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default BookCover;