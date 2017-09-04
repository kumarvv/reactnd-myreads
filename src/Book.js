import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  handleOnChangeShelf(shelf) {
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(this.props.book, shelf)
    }
  }

  getRating = (book) => {
    if (book && book.averageRating > 0) {
      return (
        <div>
        {[...Array(book.averageRating ? Math.floor(book.averageRating) : 0).keys()].map((i)=> (
          <span key={i} className="star"/>
        ))}
        {book.averageRating !== Math.floor(book.averageRating) && (
          <span key="half" className="half-star"/>
        )}
        <span className="rating-count">({book.ratingsCount})</span>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    const { book } = this.props;

    let authors = Array.isArray(book.authors) ? book.authors.join(', ') : ''

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={(e) => this.handleOnChangeShelf(e.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors}</div>
          <div className="book-rating">
            {this.getRating(book)}
          </div>
        </div>
      </li>
    )
  }
}

Book.propType = {
  book: PropTypes.object.isRequired
}

export default Book
