const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false
};

export default function trendingReducer(state = initialState, action) {
	switch (action.type) {
		case 'ALL_TRENDINGS_PENDING':
			return { ...state, isLoading: true, isError: false };
		case 'ALL_TRENDINGS_FULFILLED':
			return { ...state, isLoading: false, results: action.payload.data, isError: false };
		case 'ALL_TRENDINGS_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
