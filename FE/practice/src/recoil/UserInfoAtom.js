import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "userInfo",
	storage: localStorage,
});

export const UserInfoAtom = atom({
	key: "userInfoAtom",
	default: {
		email: "",
		nickname: "",
	},
	effects_UNSTABLE: [persistAtom],
})
