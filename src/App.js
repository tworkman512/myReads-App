import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'

import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: [],
		bookResults: []
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books})
		})
	}
	// Get all books for when updates are made to shelves
	getAllBooks = () => {
		BooksAPI.getAll().then((books) => {
			this.setState({books})
		})
	}

	updateBook = (book, shelf) => {
		BooksAPI.update(book, shelf).then(res => {
			this.getAllBooks()
		})
	}

	searchSomeBooks = (query, maxResults) => {
		// if nothing is searched then remove the book thumbnails
		query.length === 0 && this.setState({bookResults: []})

		query.length > 0 && BooksAPI.search(query, maxResults).then(bookSearched => {
			if (!bookSearched.error) {
				bookSearched.map((bookSearch) => {

					let unmatched = this.state.books.filter(book => book.id !== bookSearch.id)
					let match = this.state.books.filter(book => book.id === bookSearch.id)

					if (match.length > 0) {
						return bookSearch.shelf = match[0].shelf
					}
					if (unmatched.length > 0) {
						return bookSearch.shelf = 'none'
					}
				})
			}

			// don't display book results if nothing is available
			// otherwise show book results in library
			bookSearched.error || bookSearched === undefined ? (this.setState({bookResults: []})) : (this.setState({bookResults: bookSearched}))
		})
	}

  render() {
		const { books, bookResults } = this.state
    return (
      <div className="app">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" render={() => (
							<div className="list-books-content">
								<Header />
								<div>
								<BookShelf
										title='Currently Reading'
										books={books.filter((book) => book.shelf === 'currentlyReading')}
										updateBook={this.updateBook}
									/>
								<BookShelf
										title='Wants To Read'
										books={books.filter((book) => book.shelf === 'wantToRead')}
										updateBook={this.updateBook}
									/>
								<BookShelf
										title='Read'
										books={books.filter((book) => book.shelf === 'read')}
										updateBook={this.updateBook}
									/>
								</div>
								<div className="open-search">
									<Link to="/search">Add a book</Link>
								</div>
							</div>
							)}/>
						<Route path="/search" render={() => (
							<BookSearch
								books={books}
								bookResults={bookResults}
								updateBook={this.updateBook}
								searchSomeBooks={this.searchSomeBooks}
							/>
						)}/>
					</Switch>
				</BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
