import React from 'react'
import './Book.css'
const Book = ({title, img, categories, publishedDate, authors, id, handleCardBook}) =>  {
   
    if(title) {
        if(title.length>60) {
            title = title.slice(0,59) + '...';
        }
    }

    if(authors) {
        if(authors.join(',').length>60) {
            authors = title.slice(0,59) + '...';
        }
    }
    
        return (
            <div id = {id}  className = "card__item" onClick = {() => handleCardBook(id)}>
                <div className = "card__img">
                    <img src={img} className='card__img-top' alt="..."/>
                </div>
                <div className="card__body">
                    <div className = "card__bottom">
                        <div>Категория: {categories ? categories[0].split(',')[0] : ''}</div>
                        <h6 className="card__title">{title }</h6>
                        <div>Дата: {publishedDate === "0000" ? '': publishedDate.substring(0, 4)}</div>
                        <div>Автор: {authors}</div>
                    </div>
                </div> 
            </div>  
        )
    }
export default Book
