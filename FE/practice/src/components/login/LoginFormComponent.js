import { useState } from "react";
import { useCustomLogin } from "hook/auth/useCustomLogin";

import style from 'components/login/LoginFormComponent.module.css';

export const LoginFormComponent = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const {
		doLogin,
		moveToPath,
		saveUserInfo,
		saveAccessToken,
		saveRefreshToken
	} = useCustomLogin();

	const loginHandler = async () => {
		//서버로 비동기 요청
		const responseData = await doLogin({username, password})
		if (responseData.error) {
			alert("이메일과 패스워드를 다시 확인하세요.")
		} else {
			saveUserInfo({ email: responseData.email, nickname: responseData.nickname }) //recoil에 userInfo 저장	
			saveAccessToken(responseData.accessToken)	//recoil에 accessToken 저장
			saveRefreshToken(responseData.refreshToken)	//cookie에 represhToken 저장
			moveToPath();	//페이지 이동
		}
	}

	return (
		<div className={style.login_box}>
			<h2>Login</h2>
			<div>
				<div className={style.user_box}>
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
					<label>Username</label>
				</div>
				<div className={style.user_box}>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
					<label>Password</label>
				</div>
			</div>
			<div className={style.wrap}>
				<div className={style.btn_box} onClick={loginHandler}>SUBMIT</div>
			</div>
		</div>
	)
}