import { atom } from "recoil";

export const currentTrackIdState = atom<any>({
  key: "currentTrackIdState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const isPlayingState = atom<any>({
  key: "isPlayingState",
  default: false,
});
