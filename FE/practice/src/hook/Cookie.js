import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const SetRefreshToken = (value, options = {}) => {
	const expires = new Date();
	expires.setMinutes(expires.getMinutes() + 10);

	return cookies.set('refreshToken', value, {
		path: '/',
		expires,
		...options
	});
}

export const GetRefreshToken = () => {
	return cookies.get('refreshToken');
}

export const RemoveRefreshToken = () => {
	return cookies.remove('refreshToken');
}
