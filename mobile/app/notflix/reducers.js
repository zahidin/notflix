const initialState = {
    results: [],
    isLoading: false,
    isError: false ,
    data: {}
}
  
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_RELEASE_PENDING":
            return {...state, isLoading: true}       
        case "NEW_RELEASE_FULFILLED":
            return {...state, isLoading: false, results: action.payload.data}       
        case "NEW_RELEASE_REJECTED":
            return {...state, isLoading: false, isError: true}       
        // case 'NEW_RELEASE':
        //     return {...state, results: action.payload}
       
        default:
            return state
    }
}

export default categoryReducer