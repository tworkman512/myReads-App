import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import * as BooksAPI from '../utils/BooksAPI'

class Search extends Component {
	static propTypes = {
    books: PropTypes.array.isRequired
  }

	state = {
		query: "",
		books: "",
		bookResults: []
	}

	updateQuery = (query) => {
		this.setState({ query: query })
	}

	// searchBooks(query) {
	// 	this.setState({ query: query })
	// 	if (query === undefined || query === "") {
	// 		return this.setState({ query: "", bookResults: [] })
	// 	}
	//
	// 	BooksAPI.search(query).then((res) => {
	// 		if (res === undefined || res.error === 'empty search') {
	// 			return this.setState({ bookResults: [] })
	// 		}
	// 		return this.setState({ bookResults: res })
	// 	})
	// }

	render() {
		const { books } = this.props
    const { query } = this.state

		// Show only the books that match book title
		let showingBooks
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			showingBooks = books.filter((book) => match.test(book.title))
		} else {
			showingBooks = books
		}

		// Sort books by the title
		showingBooks.sort(sortBy('title'))

		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>

					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{showingBooks.map((book) => (
							<li key={book.id}>
								<div className="book">
									<div className="book-top">
										<div className="book-cover"
											style={{
												width: 128,
												height: 193,
												backgroundImage: `url(${book.imageLinks.thumbnail})`
											}}>
										</div>
										<div className="book-shelf-changer">
											<select>
												<option value="none" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</div>
									<div className="book-title">{book.title}</div>
								<div className="book-authors">{book.authors}</div>
								</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search
