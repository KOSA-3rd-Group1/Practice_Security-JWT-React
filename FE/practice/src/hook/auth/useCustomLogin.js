import { useNavigate } from "react-router-dom"
import { postMemberLogin } from "api/AuthApi";

import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";
import { UserInfoAtom } from "recoil/UserInfoAtom";

import { SetRefreshToken } from "hook/Cookie";

export const useCustomLogin = () => {

	const navigate = useNavigate();
	const setAccessToken = useSetRecoilState(TokenAtom);
	const setUserInfo = useSetRecoilState(UserInfoAtom);

	//서버로 비동기 요청
	const doLogin = (data) => {
		return postMemberLogin(data);
	}

	//userInfo 저장
	const saveUserInfo = (data) => {
		setUserInfo(data);
	}

	//refreshToken 저장
	const saveAccessToken = (accessToken) => {
		setAccessToken(accessToken);
	}

	//accessToken 저장
	const saveRefreshToken = (refreshToken) => {
		SetRefreshToken(refreshToken);
	}

	//페이지 이동
	const moveToPath = () => {
		const params = new URLSearchParams(window.location.search);
		const path = params.get("redirectURL") == null ? "/" : "/" + params.get("redirectURL");
		navigate({pathname: path});
	}	

	return {
		doLogin,
		saveUserInfo,
		saveAccessToken,
		saveRefreshToken,
		moveToPath
	}
}