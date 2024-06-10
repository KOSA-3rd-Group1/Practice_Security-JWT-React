import { BaseInstance } from "hook/axios/BaseInstance"
import { JwtAxiosInterceptors } from "hook/axios/JwtAxiosInterceptors"

export const getProtectedResource = async (accessToken) => {

	const { requestInterceptors } = JwtAxiosInterceptors();

	let instance = BaseInstance();
	instance = requestInterceptors(instance, accessToken);

	try {
		const responseData = await instance.get("/api/auth/protected-resource");
		console.log(responseData);
		return true;	//유효한 AccessToken
	} catch (error) {
		console.log(error);
		return false;	//유효하지 않은 AccessToken
	}
}

export const postRefresh = async (accessToken, refreshToken) => {
	const contentType = 'text/plain';
	const { requestInterceptors } = JwtAxiosInterceptors();

	let instance = BaseInstance();
	instance = requestInterceptors(instance, accessToken, contentType);

	try {
		const responseData = await instance.post('/api/member/refresh', refreshToken);
		//refreshToken이 유효한 경우, responseData{data {"accessToken": ..., "refreshToken":...}, ...}
		//refreshToken이 만료된 경우, responseData{data {"error": "Expired"}}
		console.log(responseData); 
		return responseData.data
	} catch (error) {
		console.log(error);
	}


}