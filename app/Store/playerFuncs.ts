import { create } from "zustand";

interface musicState {
    isRepeat: boolean;
    setIsRepeat: (input: boolean) => void;
    volumeMute: boolean;
    setMute: (input: boolean) => void
}

export const useFuncStore = create<musicState>((set, get) => ({
    isRepeat: false,
    setIsRepeat: (input) => {
        set({isRepeat: input})
    },
    volumeMute: false,
    setMute: (input) => {
        set({volumeMute: input})
    },
}))

