import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  /**
   * render bookselves
   */
  render() {
    const { books } = this.props;
    const shelves = [
      {
        "name": "currentlyReading",
        "title": "Currently Reading"
      },
      {
        "name": "wantToRead",
        "title": "Want To Read"
      },
      {
        "name": "read",
        "title": "Read"
      }
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map(shelf => (
            <Bookshelf
              key={shelf.name}
              name={shelf.name}
              title={shelf.title}
              books={books}
              onChangeShelf={this.props.onChangeShelf}
              />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func
}

export default ListBooks
