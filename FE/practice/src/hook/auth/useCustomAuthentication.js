import { useNavigate } from "react-router-dom"
import { getProtectedResource, postRefresh } from "api/AuthCheckApi";

import { useRecoilState } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";
import { GetRefreshToken, SetRefreshToken } from "hook/Cookie";

export const useCustomAuthentication = () => {
	const navigate = useNavigate();

	// access token
	const [accessToken, setAccessToken] = useRecoilState(TokenAtom);
	
	// refresh token
	const refreshToken = GetRefreshToken();

	// 토큰 여부 확인
	const isNotExistToken = (token) => {
		return (null, undefined, "").includes(token);
	}

	//서버 비동기 통신 - access token 유효성 확인
	const doAuthCheck = (token) => {
		return getProtectedResource(token);
	}

	//서버 비동기 통신
	const doRefresh = (accessToken, refreshToken) => {
		return postRefresh(accessToken, refreshToken);
	}

	//access token 저장
	const updateAccessToken = (accessToken) => {
		setAccessToken(accessToken);
		console.log("엑세스 업데이트 된다.");
	}

	//refresh token 비교 후 저장
	const updateRefreshToken = (refreshToken, newRefreshToken) => {
		if (refreshToken !== newRefreshToken) {
			console.log("리프레시 업데이트 된다.");
			SetRefreshToken(newRefreshToken);
		} else {
			console.log("리프레시는 업데이트 안된다.");
		}
	}

	//페이지 이동
	const moveToPath = (path, redirectURL="") => {
		path = redirectURL === "" ? path : path + `?redirectURL=${redirectURL}`;
		navigate(path);
	}

	return {
		accessToken, 
		refreshToken, 
		isNotExistToken,
		doAuthCheck, 
		doRefresh, 
		updateAccessToken, 
		updateRefreshToken, 
		moveToPath
	};
}