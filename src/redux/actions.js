import { GET_BOOKS, FETCH_BOOKS, QUANTITY_BOOKS, LEARN_MORE, LEARN_MORE_IS, HANDLE_BOOK} from "./types";

export function getBooks(book) {
    return {
        type: GET_BOOKS,
        payload: book
    }
}
export function fetchBooks(title) {
    const url = 'https://www.googleapis.com/books/v1/volumes?q='+title+':keyes&key=AIzaSyAQ0rDaUXa-QIl9ufw0C5aXTtukkO5aRpE'+'&startIndex=0&maxResults=30'
    return async dispatch => {
        const response = await fetch(url)
        const json = await response.json()
        if (json.totalItems<1) {
            dispatch({type: FETCH_BOOKS, payload: []})
            dispatch({type: QUANTITY_BOOKS, payload: 0})
            return
        }
        const items = json.totalItems;
        const clean = cleanData(json.items)
        dispatch({type: FETCH_BOOKS, payload: clean})
        dispatch({type: QUANTITY_BOOKS, payload: items})
        dispatch({type: LEARN_MORE_IS, payload: true})

        function cleanData(data) {
            const cleanData = data.map(book => {
                if(book.volumeInfo.hasOwnProperty('publishedDate') === false) {
                    book.volumeInfo['publishedDate'] = '0000'
                }
                if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                    book.volumeInfo['imageLinks'] = {thumbnail: 'https://prikolnye-kartinki.ru/img/picture/Sep/23/9d857169c84422fdaa28df62667a1467/5.jpg'}
                }
                return book
            })
            const sort = cleanData.sort((a,b) => {
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4))
            })
            return sort;
        }
    }
}


export function learnMore(event, title) {
    let startIndex = (event * 30) + 1
    const url = 'https://www.googleapis.com/books/v1/volumes?q='+title+':keyes&key=AIzaSyAQ0rDaUXa-QIl9ufw0C5aXTtukkO5aRpE'+'&startIndex='+startIndex+'&maxResults=30'
    
    return async dispatch => {
        
        const response = await fetch(url)
        const json = await response.json()
        if (json.totalItems<0 || !json.items) {
            dispatch({type: LEARN_MORE_IS, payload: false})
            return 
        }
        
        const clean = cleanData(json.items)
        dispatch({type: LEARN_MORE, payload: clean})
            
        function cleanData(data) {
        const cleanData = data.map(book => {
                if(book.volumeInfo.hasOwnProperty('publishedDate') === false) {
                    book.volumeInfo['publishedDate'] = '0000'
                }
                if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                    book.volumeInfo['imageLinks'] = {thumbnail: 'https://prikolnye-kartinki.ru/img/picture/Sep/23/9d857169c84422fdaa28df62667a1467/5.jpg'}
                }
                return book
            })
            const sort = cleanData.sort((a,b) => {
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4))
            })
            return sort;
        }
       
    }
    
}

export function handleBook(data) {
    return {
        type: HANDLE_BOOK,
        payload: data
    }
}

