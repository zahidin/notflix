const initialState = {
    results: [],
    isLoading: false,
    isError: false ,
    data: {}
}
  
const popularReducers = (state = initialState, action) => {
    switch (action.type) {
        
        case "MOST_RATE_PENDING":
        return {...state, isLoading: true}       
        case "MOST_RATE_FULFILLED":
        return {...state, isLoading: false, results: action.payload.data}       
        case "MOST_RATE_REJECTED":
        return {...state, isLoading: false, isError: true}       
     
        
        default:
            return state
    }
}

export default popularReducers