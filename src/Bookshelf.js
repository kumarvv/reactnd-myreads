import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  render() {
    const { name, title, books } = this.props;

    let shelfBooks = books.filter((book) => book.shelf === name)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <ol className="books-grid">
          {shelfBooks.map((book) => (
            <Book
              key={book.id}
              book={book}
              onChangeShelf={this.props.onChangeShelf}
              />
          ))}
        </ol>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func
}

export default Bookshelf
