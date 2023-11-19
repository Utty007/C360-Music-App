import { create } from "zustand";
import { albums } from "../album/[album_id]/page";
import { items } from "./musicStore";

interface musicState {
    isRepeat: boolean;
    setIsRepeat: (input: boolean) => void;
    shuffle: boolean;
    setShuffle: (input: boolean) => void
    volumeMute: boolean;
    setMute: (input: boolean) => void;
    isPlaying: boolean;
    setIsPlaying: (input: boolean) => void;
    currentSongIndex: number;
    setCurrentSongIndex: (input: number, plus?: boolean, minus?: boolean) => void;
    getAlbums: (id: string, token: string) => void;
    getAlbsError: boolean;
    albumData: albums[];
    songs: items[];
    setSongs: (songs: items[]) => void;
    isLoading: boolean;
    setIsLoading: (input: boolean) => void;
}

export const useFuncStore = create<musicState>((set, get) => (
    {
    isRepeat: false,
    setIsRepeat: (input) => {
        set({isRepeat: input})
    },
    volumeMute: false,
    setMute: (input) => {
        set({volumeMute: input})
    },
    isPlaying: false,
    setIsPlaying: (input) => {
        set({isPlaying: input})
    },
    currentSongIndex: 0,
    setCurrentSongIndex: (num, plus, minus) => {
        set({
            currentSongIndex: num
        })

        if (plus) {
            set({
                currentSongIndex: num + 1
            })
        }

        if (minus && get().currentSongIndex > 0) {
            set({
                currentSongIndex: num - 1
            })
        }
        },
    albumData: [],
    getAlbums: async (id: string, token: string) => {
        try {
            set({isLoading: true, getAlbsError: false})
            const url = `https://api.spotify.com/v1/albums?ids=${id}`;
            const params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const getAlbums = await fetch(url, params)
        
            const res = await getAlbums.json()
            set({ albumData: res.albums, isLoading: false })
        } catch (error) {
            set({ getAlbsError: true, isLoading: false})
        }
    },
    songs: [],
    setSongs: (song) => {
        set({songs: song})
    },
    isLoading: false,
    setIsLoading: (input) => {
        set({isLoading: input})
    },
    shuffle: false,
    setShuffle: (input) => {
        set({shuffle: input})
    },
    getAlbsError: false
}))