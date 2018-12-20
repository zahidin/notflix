import axios from 'axios';
import { ip } from '../../configip';
export function ALL_POPULARS() {
	return {
		type: 'ALL_POPULARS',
		payload: axios.get(`${ip}movies/cached/popular/10`)
	};
}
