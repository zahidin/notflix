const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false
};

export default function popularReducer(state = initialState, action) {
	switch (action.type) {
		case 'ALL_POPULARS_PENDING':
			return { ...state, isLoading: true, isError: false };
		case 'ALL_POPULARS_FULFILLED':
			return { ...state, isLoading: false, results: action.payload.data, isError: false };
		case 'ALL_POPULARS_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
