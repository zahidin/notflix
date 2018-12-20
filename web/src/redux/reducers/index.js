import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import movieReducer from './movieReducer';
import trendingReducer from './trendingReducer';
import popularReducer from './popularReducer';

const reducers = combineReducers({
	categoryReducer,
	movieReducer,
	trendingReducer,
	popularReducer
});

export default reducers;
