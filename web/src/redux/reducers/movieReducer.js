const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false
};

export default function movieReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_MOVIE_PENDING':
			return { ...state, isLoading: true };
		case 'GET_MOVIE_FULFILLED':
			return { ...state, isLoading: false, data: action.payload.data };
		case 'GET_MOVIE_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
