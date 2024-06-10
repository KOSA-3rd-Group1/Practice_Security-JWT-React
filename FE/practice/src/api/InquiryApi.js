import { BaseInstance } from "hook/axios/BaseInstance";

const API_URL = '/api/inquiries';

//전체 문의글 조회
export const getAllInquiry = async () => {
	let responseData = null;

	let instance = BaseInstance();

	await instance.get(API_URL)
	.then(response => responseData = response.data)
	.catch(error => console.log(error))

	return responseData;
}

//문의글 상세 조회(ID) 
export const getInquiryById = async (id) => {
	let responseData = null;

	const url = `${API_URL}/${id}`;
	let instance = BaseInstance();

	await instance.get(url)
	.then(response => responseData = response.data)
	.catch(error => console.log(error))
	
	return responseData;
}

//문의글 작성
export const createInquiry = async (data) => {
	const requestBodyJSON = JSON.stringify(data);
	
	let instance = BaseInstance();

	await instance.post(API_URL, requestBodyJSON)
	.then((response) => {
		console.log(response);
		// window.location.href = '/'; 생성된 문의글로 이동
		//또는 navigate로 이동
	})
	.catch(error => console.log(error))
}

//문의글 수정
export const updateInquiry = async (id, data) => {
	const url = `${API_URL}/${id}`
	const requestBodyJSON = JSON.stringify(data);

	let instance = BaseInstance();

	await instance.patch(url, requestBodyJSON)
	.then((response) => {
		console.log(response);
		// 수정한 문의글로 이동
	})
	.catch(error => console.log(error))
}

//문의글 삭제
export const deleteInquiry = async (id) => {
	const url = `${API_URL}/${id}`
	let instance = BaseInstance();

	await instance.delete(url)
	.then((response) => {
		console.log(response);
		// 전체 문의글로 이동
	})
	.catch(error => console.log(error))
}