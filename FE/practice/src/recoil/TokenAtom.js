import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "token",
	storage: localStorage,
});

export const TokenAtom = atom({
	key: "accessToken",
	default: "",
	effects_UNSTABLE: [persistAtom],
})
