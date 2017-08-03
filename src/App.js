import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

import Search from './components/Search'
import ListBooks from './components/ListBooks'

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

  render() {
    return (
      <div className="app">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" render={() => (
							<div className="list-books">
								<div className="list-books-title">
									<h1>MyReads</h1>
								</div>
								<div className="list-books-content">
									<ListBooks />
								</div>
							</div>
							)}/>
						<Route path="/search" render={() => (
							<Search
								books={this.state.books}
							/>
						)}/>
					</Switch>
				</BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
