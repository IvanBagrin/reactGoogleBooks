import {GET_BOOKS, FETCH_BOOKS, QUANTITY_BOOKS, LEARN_MORE, LEARN_MORE_IS, HANDLE_BOOK, SHOW_LOADER, HIDE_LOADER} from "./types"
const initialState = {
    books: [],
    fetchedBooks: [],
    quantityBooks: 0,
    learnMoreIs: false,
    handleBook: {},
    loader: false,
}

export const booksReducer = (state = initialState, action) =>{
    switch(action.type) {
        case GET_BOOKS : {
            return {...state, fetchedBooks: [...action.payload]}
        }
        case FETCH_BOOKS : {
            return {...state, fetchedBooks: [...action.payload], books: [...action.payload]}
        }
        case QUANTITY_BOOKS : {
            return {...state, quantityBooks: action.payload}
        }
        case LEARN_MORE : {
            return {...state, fetchedBooks: [...state.fetchedBooks,...action.payload], books: [...state.books,...action.payload]}
        }
        case LEARN_MORE_IS : {
            return {...state, learnMoreIs: action.payload}
        }
        case HANDLE_BOOK : {
            return {...state, handleBook: action.payload}
        }
        case SHOW_LOADER : {
            return {...state, loader: action.payload}
        }
        case HIDE_LOADER : {
            return {...state, loader: action.payload}
        }
    }
    return state
}