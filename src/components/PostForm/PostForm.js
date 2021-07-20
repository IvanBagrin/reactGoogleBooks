import React from 'react'
import {connect} from 'react-redux'
import {getBooks, fetchBooks} from '../../redux/actions'
import SortBook from '../SortBook/SortBook'
class PostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            sort: 'Relevance',
            sortDefaultCategory: 'all',
        }
    }
    submitHandler = (event) => {
        event.preventDefault()
        if (!this.state.title.trim()) {
            return
        }
        this.props.history.push('/')
        const {title} = this.state;
        this.props.fetchBooks(title)
        this.setState({
            sort: "Relevance",
            sortDefaultCategory: 'all'
        })
    }

    changeInputHandler = event => {
        event.persist()
        this.setState(prev =>( {...prev, ...{
            [event.target.name]: event.target.value
        }}))
    }

    handleSort = (event) => {
        this.setState({
            sort: event.target.value
        })
        const sortedBooks = this.props.syncBooks.sort((a, b) => {
            if (this.state.sort === 'Newest') {
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4))
            }
            else if (this.state.sort === 'Relevance') {
                return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4))
            }
        })
        this.props.getBooks(sortedBooks);
    }

    handleSortDefaultCategory = (event) => {
        this.setState({
            sortDefaultCategory: event.target.value
        })

        if(event.target.value === 'all') {
            const sortedBooks = this.props.books.sort((a, b) => {
                if (this.state.sort === 'Newest') {
                    return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4))
                }
                else if (this.state.sort === 'Relevance') {
                    return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4))
                }
            })
            this.props.getBooks(sortedBooks)
        }else {
            const sortedCategory = this.props.books.filter(item => {
                if(item.volumeInfo.categories){
                    let category = item.volumeInfo.categories[0].toLowerCase();
                    if (category.indexOf(event.target.value) != -1) {
                        return true;
                    }
                    return false
                    }
                }
            )
            const sortedBooks = sortedCategory.sort((a, b) => {
                if (this.state.sort === 'Newest') {
                    return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4))
                }
                else if (this.state.sort === 'Relevance') {
                    return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4))
                }
            })
           this.props.getBooks(sortedBooks);
        }
    }
    render() {
        return (
            <div className = "postForm">
                <form onSubmit = {this.submitHandler}>
                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Введите текст"
                            aria-label="Recipient's username" aria-describedby="button-addon2"
                            id="title"
                            value = {this.state.title}
                            name = "title"
                            onChange = {this.changeInputHandler}
                        />
                        <button 
                            className = "btn btn-outline-secondary" 
                            id="button-addon2"
                            type = 'submit'
                        >
                            Поиск
                        </button>
                    </div>
                </form>
            <SortBook 
                handleSort = {this.handleSort}
                handleSortDefaultCategory = {this.handleSortDefaultCategory}
                sortDefault = {this.state.sort}
                sortDefaultCategory = {this.state.sortDefaultCategory}
            />
        </div>
        )
    }
}

const mapDispatchToProps = {
        getBooks,
        fetchBooks
}

const mapStateToProps = state => {
    return {
        syncBooks: state.books.fetchedBooks,
        books: state.books.books
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostForm)