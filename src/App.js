import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  updateShelf = (book, shelf) => {
    let { books } = this.state;

    let found = books.find(b => b.id === book.id)
    if (found) {
      found.shelf = shelf
    } else {
      book.shelf = shelf
      books.push(book)
    }

    this.setState({
      books: books
    })
    BooksAPI.update(book, shelf);
  }

  render() {
    let { books } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
            onChangeShelf={this.updateShelf}
            />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            books={books}
            onChangeShelf={this.updateShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
