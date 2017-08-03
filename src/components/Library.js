import React from 'react'
import Book from './Book'

const Library = (props) => {
	<div className="search-books-results">
		<ol className="books-grid">
			{props.bookResults.map((book) => (
				<Book
					key={book.id}
					book={book}
					updateBook={props.updateBook}
				/>
			))}
		</ol>
	</div>
}

export default Library
