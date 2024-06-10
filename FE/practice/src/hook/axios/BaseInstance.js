import axios from 'axios';

export const BaseInstance = (option = {}) => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_BACKEND_URL,
		headers: {
			'Content-Type': 'application/json',
		},
		...option
	})
	return instance;
}
