import { BaseInstance } from "hook/axios/BaseInstance";
import { LoginInterceptors } from "hook/axios/LoginInterceptors";

const API_URL = '/api/member';

export const postMemberLogin = async (data) => {
	let responseData = null;

	const url = API_URL + '/login';

	let instance = BaseInstance();
	instance = LoginInterceptors(instance);

	data = {
		"username" : "user1@test.com",
		"password" : 1111
	};
	// axios는 자동 형변환을 지원하기 때문에 따로 변환하지 않아도 괜찮다.
	// const requestBodyData = new URLSearchParams(data).toString();

	await instance.post(url, data)
	.then(response => responseData = response.data)
	.catch(error => console.log(error))
	return responseData;

}