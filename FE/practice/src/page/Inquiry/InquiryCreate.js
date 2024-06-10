
// components
import { createInquiry } from "api/InquiryApi";
import useAuthentication from "hook/auth/useAuthentication";
import { useState } from "react";
import { Link } from "react-router-dom";

export const InquiryCreate = () => {
	// useAuthentication();

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("")

	const createBtnHandler = () => {
		const data = {title, content}
		createInquiry(data)
	}

	return (
		<div>
			<p>로그인이 필요한 페이지</p>
			<div>문의글 작성</div>
			<Link to="/inquiries">목록으로 이동</Link>
			<>
				<div>
					<lable>제목</lable>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
				</div>
				<div>
					<label>내용</label>
					<textarea  type="text" onChange={(e) => setContent(e.target.value)} required/>
				</div>
				<div onClick={createBtnHandler}>글 등록</div>
			</>
		</div>
	)
	
}