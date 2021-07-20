import React from 'react'
import PostForm from './components/PostForm/PostForm'
import Books from './components/Books/Books'
import './App.css'
import { connect } from 'react-redux'
import {learnMore} from './redux/actions'
import BookPage from './components/BookPage/BookPage'
import {Route} from "react-router-dom";

let itemLearn = 0
function App({totalItems, learnMore, title, fetchedBooks, learnMoreIs, handleBook, loader, history}) {
  function learnMoreAdd() {
    itemLearn += 1
    learnMore(itemLearn, title)
  }
  return (
    <div className="container">
      <div className = "row search">
        <div className = "col">
          <Route history={history} path='/' component={PostForm} />
        </div>
      </div>
        <Route exact path='/'>{totalItems<1 ? '' : 'Найдено: ' + totalItems}</Route>
        {loader === true ? <div className = "loader">
          <div className="lds-ripple"><div></div><div></div></div>
        </div> 
        : ''}
        <Route  exact path='/'><Books /></Route>
        <Route exact path='/'>
          {!learnMoreIs || fetchedBooks.length<30 
            ? '' 
            : <button 
                type="button" 
                className="btn btn-primary btn__learnmore" 
                onClick = {() => learnMoreAdd()}
                >Learn More
                </button>}
        </Route>
        <Route path={`/book/${handleBook.id}`}><BookPage /></Route>
    </div>
  );
}

const mapDispatchToProps = {
        learnMore
}

const mapStateToProps = state => {
  return {
      totalItems: state.books.quantityBooks,
      fetchedBooks: state.books.fetchedBooks,
      learnMoreIs: state.books.learnMoreIs,
      handleBook: state.books.handleBook,
      loader: state.books.loader,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
