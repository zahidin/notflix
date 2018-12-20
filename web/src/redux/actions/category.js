import axios from 'axios';
import { ip } from '../../configip';
export function ALL_CATEGORIES() {
	return {
		type: 'ALL_CATEGORIES',
		payload: axios.get(`${ip}movies/categories`)
	};
}

export function GET_CATEGORY(category, limit) {
	return {
		type: 'GET_CATEGORY',
		payload: axios.get(`${ip}movies/${category}/${limit}`)
	};
}
