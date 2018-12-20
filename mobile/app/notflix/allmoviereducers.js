const initialState = {
    results: [],
    isLoading: true,
    isError: false ,
    data: {}
}
  
const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_MOVIES':
            return {...state, results: action.payload}
        case "GET_MOVIE_PENDING":
            return {...state, isLoading: true, data: action.payload}       
        case "GET_MOVIE_FULFILLED":
            return {...state, isLoading: false, data: action.payload.data}       
        case "GET_MOVIE_REJECTED":
            return {...state, isLoading: false, isError: true}  
        default:
            return state
    }
}

export default moviesReducer