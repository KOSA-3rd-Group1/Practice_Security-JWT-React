import { useCustomLogout } from "hook/auth/useCustomLogout";

export const LogoutFormComponent = () => {

	const {
		moveToPath,
		removeUserInfo,
		removeAccessToken,
		removeRefreshToken
	} = useCustomLogout();

	const logoutHandler = () => {
		removeUserInfo();	//userInfo 초기화
		removeAccessToken();	//accessToken 초기화
		removeRefreshToken();	//refreshToken 제거
		moveToPath("/");
	}

	return (
		<div onClick={logoutHandler}>
			로그아웃
		</div>
	)
}