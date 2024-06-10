import { useEffect, useRef, useState } from "react";
import { useCustomAuthentication } from "hook/auth/useCustomAuthentication";

const useAuthentication = () => {
    const {
        accessToken,
        refreshToken,
		isNotExistToken,
        doAuthCheck,
        doRefresh,
        updateAccessToken,
        updateRefreshToken,
        moveToPath
    } = useCustomAuthentication();

	useEffect(() => {
		const checkAuthentication = async() => {
			console.log("accessToken", accessToken)
			console.log("refreshToken", refreshToken)

			//access token, refresh token 존재 여부 확인
			if (isNotExistToken(accessToken) || isNotExistToken(refreshToken)) {
				alert("로그인이 필요합니다.");
				moveToPath("/login");
				return
			}

			//access token 유효성 검사
			const isValidAccessToken = await doAuthCheck(accessToken);
			if (isValidAccessToken) return;	//access token이 유효한 경우 종료

			//refresh token을 통한 access token 재발급
			const responseData = await doRefresh(accessToken, refreshToken);
			if (responseData.error) {
				//refresh token이 만료된 경우, 로그인 페이지로 이동
				alert("refresh token이 만료되었습니다.")
				moveToPath("/login", "inquiries");
				return
			} else {
				//refresh token이 유효한 경우, 재발급된 토큰 정보 업데이트
				updateAccessToken(responseData.accessToken);
				updateRefreshToken(refreshToken, responseData.refreshToken);
			}
		}

		checkAuthentication();
	}, [])
};

export default useAuthentication;