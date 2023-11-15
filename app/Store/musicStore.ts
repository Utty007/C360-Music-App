import { create } from "zustand";
import { propsData } from '@/typings';
import { albums } from "../Components/SectionOne/TopCharts";
import { songsData } from "../Components/SectionOne/NewReleases";

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
    albumIsLoading: boolean;
    charts: albums[];
    musicToPlay: string;
    setMusicToPlay: (input: string, details: songsData) => void;
    mtpDetails: songsData | undefined
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
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${get().token}`
            }
        }

        const response = await fetch(`https://api.spotify.com/v1/search?q=${get().musicSearchInput}&type=artist`, options)
        const result = await response.json()
        set({ artistId: result.artists.items[0].id })
        
        const artistsAlbums = await fetch(`https://api.spotify.com/v1/artists/${get().artistId}/albums?include_groups=album,single&market=NI`, options)
        const res = await artistsAlbums.json()
        console.log(res)
        set({artistData: res.items})
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

        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${get().token}`
            }
        }
        // const getId = await fetch(`https://api.spotify.com/v1/search?q=track:${songName}&type=track`, params)
        // const res = await getId.json()
        // const id = res.tracks.items[1].id
        // console.log(id)
        const fetchUrl = `https://api.spotify.com/v1/tracks?ids=6lrAyxpomr1dkHltiUqWSw,3GMdp6clyAh7wZWVYOtoS9,1JqxgXNhqWpFss7nZzlwOz,1mk8ZC9OeTZMr8Wy31LqRj,0oeaQHUGSe5azi1YzLA1aB,3kFdOJRsCytUFYilg7rXnX,4EDMfKmlvrDemvJBcoZvHk`

        try {
            const response = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${result.access_token}`
            }
        })

        if (response.status === 200) {
            const data = await response.json();
            set({ songs: data.tracks })
            set({songIsLoading: false})
        } else {
        console.error('Request failed with status:', response.status);
        } 
       } catch (error) {
            console.error('An error occurred:', error);
        }
    },
    albumIsLoading: true,
    getAlbums: async () => {
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
        set({ charts: res.albums })
        set({albumIsLoading: false})
    },
    charts: [],
    musicToPlay: '',
    mtpDetails: undefined,
    setMusicToPlay: (input, details) => {
        set({ musicToPlay: input });
        set({mtpDetails: details})
    }
}
))


//Unruly Id - 51mowf1u3WaEYvqalsbP7M
//Burna Boy Id - 3wcj11K77LjEY1PkEazffa
// I made it Id - 1JzjwUKkPsdHg1SQ7qa5hc
//Davido Id - 0Y3agQaa6g2r0YmHPOO9rh
//Timeless Id - 6lI21W76LD0S3vC55GrfSS
//Link to get Asake and Olamide Amapiano - https://api.spotify.com/v1/tracks/3GMdp6clyAh7wZWVYOtoS9