import React, { Component } from 'react'
import Book from './Book'

class Library extends Component {
	render() {
		return(
			<div className="search-books-results">
					<ol className="books-grid">
						{this.props.bookResults.map((book) => (
							<Book
								key={book.id}
								book={book}
								updateBook={this.props.updateBook}
							/>
						))}
					</ol>
			</div>
		)
	}
}

export default Library
