
// components
import { InquiriesComponent } from "components/inquiry/InquiriesComponent";
import useAuthentication from "hook/auth/useAuthentication";
import { Link } from "react-router-dom";


// 문의글 전체 데이터 가져오기
export const Inquiry = () => {
	useAuthentication();

	return (
		<div>
			<p>로그인이 필요한 페이지</p>
			<div>
				<Link to="/inquiries/create">문의글 작성</Link>
			</div>
			<div>
				<Link to="/">메인으로 이동</Link>
			</div>
			<>
				<hr />
				<InquiriesComponent />
			</>
		</div>
	)
	
}