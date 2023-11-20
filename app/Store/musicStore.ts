import { create } from "zustand";
import { propsData } from '@/typings';
import { albums } from "../Components/SectionOne/TopCharts";
import { songsData } from "../Components/SectionOne/NewReleases";

export type items = {
    artists: [{ name: string }, {name?: string}],
    duration_ms: number,
    preview_url: string,
    image: {
        url: string
    },
    type?: string,
    name?: string,
}

interface musicState {
    token: string;
    getToken: () => void;
    musicSearchInput: string;
    setMusicSearchInput: (input: string) => void;
    artistId: string;
    artistData: propsData[];
    getArtistData: () => void;
    showSearchOutput: boolean;
    setShowSearchOutput: (value: boolean) => void;
    setArtistData: () => void;
    songs: songsData[];
    songIsLoading: boolean;
    getSongs: () => void;
    getAlbums: () => void;
    albumError: boolean;
    songsError: boolean;
    searchError: boolean;
    albumIsLoading: boolean;
    charts: albums[];
    musicToPlay: string;
    setMusicToPlay: (input: string, details?: songsData, albumDetails?: items[]) => void;
    mtpDetails: songsData | undefined;
    isLoading: boolean;
    setIsLoading: (input: boolean) => void;
    empty: boolean;
    setEmpty: (input: boolean) => void
}

export const useMusicStore = create<musicState>((set, get) => ({
    token: '',
    getToken: async () => {
        const url = 'https://accounts.spotify.com/api/token';
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
        }, 
        body: 'grant_type=client_credentials&client_id=a698b79000234b7eb5a243559c6ec8b3&client_secret=09de0530c842450c992b29d0cda139ed'
        };
        const response = await fetch(url, options);
        const result = await response.json();
        set({token: result.access_token})
    }, 
    musicSearchInput: '',
    setMusicSearchInput: (input: string) => {
        set({musicSearchInput: input})
    },
    artistId: "",
    getArtistData: async () => {
        if (get().musicSearchInput.trim().length === 0 || get().musicSearchInput.trim() === '') {
            set({empty: true, isLoading: false})
        } else {
            set({empty: false})
            try {
            set({isLoading: true, searchError: false})
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${get().token}`
                }
            }

            const response = await fetch(`https://api.spotify.com/v1/search?q=${get().musicSearchInput}&type=artist`, options)
            const result = await response.json()
            set({ artistId: result.artists.items[0]?.id })
            
            const artistsAlbums = await fetch(`https://api.spotify.com/v1/artists/${get().artistId}/albums?include_groups=album,single&market=NI`, options)
            if (!artistsAlbums.ok) {
                set({searchError: true})
            }

            const res = await artistsAlbums.json()
            set({artistData: res.items, isLoading: false})
        } catch (error) {
            set({searchError: true, isLoading: false})
        }
        }
    }, 
    artistData: [],
    showSearchOutput: false,
    setShowSearchOutput: (value) => { set({ showSearchOutput: value }) },
    setArtistData: () => {
        set({artistData: []})
    },
    songs: [],
    songIsLoading: true,
    getSongs: async () => {
        
        try {
            set({songsError: false})
            const url = 'https://accounts.spotify.com/api/token';
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body: 'grant_type=client_credentials&client_id=a698b79000234b7eb5a243559c6ec8b3&client_secret=09de0530c842450c992b29d0cda139ed'
            };
            const response = await fetch(url, options);
            const result = await response.json();

            const getPlaylist = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX4NsREGkRuCe', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${result.access_token}`
                }
            })
            const resp = await getPlaylist.json()

            const fetchUrl = `https://api.spotify.com/v1/tracks?ids=6lrAyxpomr1dkHltiUqWSw,3GMdp6clyAh7wZWVYOtoS9,1JqxgXNhqWpFss7nZzlwOz,1mk8ZC9OeTZMr8Wy31LqRj,0oeaQHUGSe5azi1YzLA1aB,3kFdOJRsCytUFYilg7rXnX,4EDMfKmlvrDemvJBcoZvHk`
            const res = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${result.access_token}`
                }
            })
            if (!res.ok) {
                set({songsError: true})
            }
            const data = await res.json();
            set({ songs: resp.tracks.items, songIsLoading: false })
            
        } catch (error) {
            set({ songsError: true, isLoading: false })
        }
    },
    albumIsLoading: true,
    getAlbums: async () => {
        try {
            set({ albumError: false})
            const uri = 'https://accounts.spotify.com/api/token';
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
            }, 
            body: 'grant_type=client_credentials&client_id=a698b79000234b7eb5a243559c6ec8b3&client_secret=09de0530c842450c992b29d0cda139ed'
            };
            const response = await fetch(uri, options);
            const result = await response.json();

            const url = "https://api.spotify.com/v1/albums?ids=51mowf1u3WaEYvqalsbP7M,1JzjwUKkPsdHg1SQ7qa5hc,6lI21W76LD0S3vC55GrfSS";
            const params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${result.access_token}`
                }
            }

            const getAlbums = await fetch(url, params)
            const res = await getAlbums.json()
            set({ charts: res.albums, albumIsLoading: false })
        
        } catch (error) {
            set({ albumError: true, albumIsLoading: false })
        }
    },
    charts: [],
    musicToPlay: '',
    mtpDetails: undefined,
    setMusicToPlay: (input, details?) => {
        set({ musicToPlay: input });
        set({ mtpDetails: details || undefined})
    },
    isLoading: false,
    setIsLoading: (input) => {
        set({
            isLoading: input
        })
    },
    albumError: false,
    songsError: false,
    searchError: false,
    empty: false,
    setEmpty: (input) => {
        set({empty: input})
    }
}
))


//Unruly Id - 51mowf1u3WaEYvqalsbP7M
//Burna Boy Id - 3wcj11K77LjEY1PkEazffa
// I made it Id - 1JzjwUKkPsdHg1SQ7qa5hc
//Davido Id - 0Y3agQaa6g2r0YmHPOO9rh
//Timeless Id - 6lI21W76LD0S3vC55GrfSS
//Link to get Asake and Olamide Amapiano - https://api.spotify.com/v1/tracks/3GMdp6clyAh7wZWVYOtoS9