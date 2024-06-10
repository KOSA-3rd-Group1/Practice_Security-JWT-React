//로그인 인터셉터 설정
//요청 전 Content-Type 타입을 'application/x-www-form-urlencoded'로 변경

export const LoginInterceptors = (instance) => {
	instance.interceptors.request.use(
		(config) => {
			config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			return config;
		}
	)
	return instance;
}