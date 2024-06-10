import { Link } from "react-router-dom";
import { LogoutFormComponent } from "components/logout/LogoutFormComponent";
import { UserInfoComponent } from "components/main/UserInfoComponent";

export const Main = () => {

	return (
		<div>
			<div>
				<Link to={'/login'}>로그인</Link>
			</div>
			<div>
				<Link to={'/inquiries'}>문의글</Link>
			</div>
			<div>
				<LogoutFormComponent />
			</div>
			<UserInfoComponent />
		</div>
	)
	
}