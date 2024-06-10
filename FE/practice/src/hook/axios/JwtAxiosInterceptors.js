

export const JwtAxiosInterceptors = () => {

	//요청 전에 Authorization 헤더를 추가한다. (ex: 쿠키에서 토큰을 읽어서 추가)
	const requestInterceptors = (instance, accessToken, contentType='application/json') => {
		instance.interceptors.request.use(
			(config) => {
				config.headers['Content-Type'] = contentType
				config.headers.Authorization = `Bearer ${accessToken}`;
				return config;
			},
			(error) => {
				console.log("request error......");
				Promise.reject(error.response);
			}
		)
		return instance;
	}

	return {requestInterceptors}
}