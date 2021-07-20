import React from 'react'
import Book from '../Book/Book'
import './Books.css'
import { connect } from 'react-redux'
import {handleBook} from '../../redux/actions'
import {Link} from "react-router-dom";


class Books extends React.Component {
    constructor(props) {
        super(props)
    }

    handleCardBook = (e) => {
        let arr = this.props.syncBooks.filter(item => item.id === e)
        this.props.handleBook(arr[0])
    }

    render(){
        return(
            <div className = "booksBody">
                {!this.props.syncBooks.length ? <p>Нет данных</p> : '' }

                {this.props.syncBooks.map(item => { 
                    return <Link key = {item.id + Math.random()} to = {`/book/${item.id}`}>
                                <Book 
                                    title ={item.volumeInfo.title} 
                                    id = {item.id}
                                    img ={item.volumeInfo.imageLinks.thumbnail} 
                                    categories = {item.volumeInfo.categories}
                                    publishedDate = {item.volumeInfo.publishedDate}
                                    authors = {item.volumeInfo.authors}
                                    handleCardBook = {this.handleCardBook}

                                />
                                </Link>})}
            </div>
        )
    }
    }

const mapDispatchToProps = {
        handleBook
      }

const mapStateToProps = state => {
    return {
        syncBooks: state.books.fetchedBooks,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
