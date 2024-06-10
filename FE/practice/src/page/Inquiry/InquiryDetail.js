
// components
import { getInquiryById } from "api/InquiryApi";
import { ListItemComponent } from "components/inquiry/ListItemComponent";
import useAuthentication from "hook/auth/useAuthentication";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


// 문의글 전체 데이터 가져오기
export const InquiryDetail = () => {
	useAuthentication();
	const params = useParams();
	const [item, setItem] = useState({id:"", title:"", content:""})

	useEffect(() => {
		const getData = async() => {
			const responseData = await getInquiryById(params.id);
			setItem(() => ({...responseData}))
		}
		getData();
	}, [])

	return (
		<div>
			<p>로그인이 필요한 페이지</p>
			<Link to="/inquiries">목록으로 이동</Link>
			<hr />
			<>
				<ListItemComponent
					inquiryId={item.id}
					inquiryTitle={item.content}
				/>
			</>
		</div>
	)
	
}