const initialState = {
    results: [],
    isLoading: false,
    isError: false ,
    data: {}
}
  
const getCategoriesreducers = (state = initialState, action) => {
    switch (action.type) {
        
        case "GET_CATEGORY_PENDING":
        return {...state, isLoading: true}       
        case "GET_CATEGORY_FULFILLED":
        return {...state, isLoading: false, results: action.payload.data}       
        case "GET_CATEGORY_REJECTED":
        return {...state, isLoading: false, isError: true}       
     
        
        default:
            return state
    }
}

export default getCategoriesreducers