import { useNavigate } from "react-router-dom"

import { useSetRecoilState } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";
import { UserInfoAtom } from "recoil/UserInfoAtom";

import { RemoveRefreshToken } from "hook/Cookie";

export const useCustomLogout = () => {

	const navigate = useNavigate();
	const setAccessToken = useSetRecoilState(TokenAtom);
	const setUserInfo = useSetRecoilState(UserInfoAtom);

	//recoil - userInfo 초기화
	const removeUserInfo = () => {
		setUserInfo({email: "", nickname: ""});
	}

	//recoil - accessToken 초기화
	const removeAccessToken = () => {
		setAccessToken("");
	}

	//쿠키 제거 - refreshToken 제거
	const removeRefreshToken = () => {
		RemoveRefreshToken();
	}

	//페이지 이동
	const moveToPath = (path) => {
		navigate({pathname: path});
	}

	return {
		removeUserInfo,
		removeAccessToken,
		removeRefreshToken,
		moveToPath
	}
}