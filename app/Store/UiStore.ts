import { create } from "zustand";

interface uiState {
    bgUrl: string | undefined;
    setBgUrl: (input: string) => void;
    toggleMobNav: boolean;
    setToggle: (input: boolean) => void
}

export const useUiStore = create<uiState>((set, get) => ({
    bgUrl: undefined,
    setBgUrl: (input) => {
        set({bgUrl: input})
    },
    toggleMobNav: false,
    setToggle: (input) => {
        set({ toggleMobNav: input })
    }
}))
