import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    searchBooks: []
  }

  handleSearch = (searchTerm) => {
    BooksAPI.search(searchTerm, 25).then((books) => {
      if (!books || books.error) {
        this.setState({ searchBooks: [] });
        return;
      };

      books.forEach(b => b.shelf = this.getBookShelf(b))
      this.setState({
        searchBooks: books
      })
    })
  }

  getBookShelf = (book) => {
    let found = this.props.books.find(b => b.id === book.id)
    return found ? found.shelf : 'None'
  }

  render() {
    const { searchBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={(e) => this.handleSearch(e.target.value)}
              type="text"
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                onChangeShelf={this.props.onChangeShelf}
                />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default SearchBooks
