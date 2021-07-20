import React from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import "./BookPage.css"
function BookPage({handleBook}) {
        return (
            <div className="bookPage">
                <Link to='/'><button type="button" className="btn btn-success" > &lt;&lt; Назад</button></Link>
                <div className="card mb-3 bookPage__block" style={{width: 100+ '%'}}>
                    <div className="row no-gutters">
                        <div className="col-md-4 bookPage__img">
                        <img src={handleBook.volumeInfo.imageLinks.thumbnail} className="card-img" alt="..."/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text"><small className="text-muted">Категория: {handleBook.volumeInfo.categories}</small></p>
                            <h5 className="card-title">{handleBook.volumeInfo.title}</h5>
                            <p className="card-text"><small className="text-muted">Автор: {handleBook.volumeInfo.authors}</small></p>
                            <p className="card-text">{!handleBook.searchInfo? '' : handleBook.searchInfo.textSnippet}</p>
                        </div>
                        </div>
                    </div>
                </div>  
            </div>
            
        )
    }

const mapStateToProps = state => {
    return {
        handleBook: state.books.handleBook,   
        }
    }
export default connect(mapStateToProps, null)(BookPage)