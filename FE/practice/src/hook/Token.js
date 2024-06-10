import { useSetRecoilState, useRecoilValue } from "recoil";
import { TokenAtom } from "recoil/TokenAtom";

export const GetAccessToken = () => {
	return useRecoilValue(TokenAtom); 
}

export const SetAccessToken = () => {
	return useSetRecoilState(TokenAtom);
}