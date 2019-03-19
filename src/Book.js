import React from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';
import BookCover from './BookCover';

class Book extends React.Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <BookCover width={128} height={193} url="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api" />
                    <BookShelfChanger />
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        );
    }
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
};

export default Book;