import { useRecoilValue } from "recoil"
import { UserInfoAtom } from "recoil/UserInfoAtom"

export const UserInfoComponent = () => {

	const userInfo = useRecoilValue(UserInfoAtom);

	return (
		<>
			{userInfo.email === "" ? (
				<div>
					<hr />
					<div>로그인이 필요합니다.</div>
					<hr />
				</div>
			) : (
				<div>
					<hr />
					<div>유저 이메일 : {userInfo.email}</div>
					<div>유저 닉네임 : {userInfo.nickname}</div>
					<hr />
				</div>
			)}
		</>
	)
}