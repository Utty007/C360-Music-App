"use client"
import React, { useEffect } from 'react'
// import NotFound from './Notfound'
import Image from 'next/image'
import { items, useMusicStore } from '../../Store/musicStore'
import { BsPlay } from 'react-icons/bs'
import { useFuncStore } from '../../Store/playerFuncs'

type pageProps = {
    params: {
        album_id: string
    }
}

export type albums = {
    name: string;
    artists: {name: string}[];
    total_tracks: number;
    id: number;
    label: string;
    release_date: string;
    images: {
        url: string;
        width: number;
        height: number;
    }[];
    tracks: {
        items: {
            artists: [{ name: string }, {name?: string}],
            duration_ms: number,
            name: string,
            preview_url: string,
            type: string
        }[]
    }
}

function Page({ params: album_id }: pageProps) {
    const [setIsPlaying, currentSongIndex, getAlbums, setSongs, albumData, setCurrentSongIndex, isLoading, errorState] = useFuncStore(state => [state.setIsPlaying, state.currentSongIndex, state.getAlbums, state.setSongs, state.albumData, state.setCurrentSongIndex, state.isLoading, state.getAlbsError])
    const [setMusicToPlay, token] = useMusicStore(state => [state.setMusicToPlay, state.token])

    useEffect(() => {
        getAlbums(album_id.album_id, token);
    }, [album_id.album_id, token, getAlbums])
    let songs : items[] = [];

    if (albumData) {
        songs = albumData.flatMap((album) =>
            album.tracks.items.map((item) => ({
                name: item.name,
                artists: item.artists,
                duration_ms: item.duration_ms,
                preview_url: item.preview_url,
                image: {url: album.images[0].url}
            }))
        );
    }
    //  images: [{
    //             url: album.images[0].url,
    //             width: album.images[0].width,
    //             height: album
    //         }],
    const handlePlay = (index: number) => {
        setIsPlaying(true)
        setSongs(songs)
        setMusicToPlay(songs[0].preview_url)
        setCurrentSongIndex(0)
    }

  return (
      <div className="relative top-20 px-4 sm:px-0 mt-6 sm:pr-4 pb-32 sm:pl-28">
          {isLoading ? <span className="loading loading-bars loading-lg"></span> : albumData !== undefined ? <>
              {albumData.map((data, index) => {
            
              return (
                <div key={index}>
                    <div className='flex flex-wrap items-center mb-4 font-["Quicksand"]'>
                        <div>
                            <Image className='rounded-lg' src={data.images[1].url} width={data.images[1].width} height={data.images[1].height} alt='Album Cover' />
                        </div>
                        <div className='pl-4'>
                            <h1 className="text-slate-400 py-1 text-[35px] font-bold leading-[42px]">{data.name}</h1>
                            <p className='text-stone-200 py-1 text-sm font-normal leading-[16.80px]'>Label: {data.label}</p>
                            <p className='text-stone-200 py-1 text-sm font-normal leading-[16.80px]'>Release Date: {data.release_date}</p>
                            <p className='text-stone-200 py-1 text-sm font-normal leading-[16.80px]'>Total Songs: {data.total_tracks}</p>
                            <div onClick={() => handlePlay(index)} className="w-24 h-9 p-2.5 bg-white bg-opacity-5 rounded-[32px] backdrop-blur-[10px] justify-start items-center gap-2.5 inline-flex cursor-pointer">
                                <div className="bg-[#facd66] p-[5px] rounded-[99.17px]"> <BsPlay /> </div>
                                <div className="text-white text-xs font-normal font-['Quicksand'] leading-[14.40px]">Play all</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {data.tracks.items.map((songData, index)=>{
                            return (
                                <div key={index} className='flex flex-row items-center p-2 my-2 justify-between w-full bg-neutral-700 bg-opacity-40 rounded-[15px] backdrop-blur-[10px]'>
                                    <span className='w-[40%]'>{songData.name}</span>
                                    <span className='w-[30%]'>{songData.artists.map(artists => artists.name).join(' ft ')}</span>
                                    <span className='w-[20%] text-right capitalize'>{songData.type}</span>
                                </div>
                            )
                        })}
                    </div>
              </div>
              )
          })}
          </> : <h1>Album not found.</h1>}
          {errorState && <div role="alert" className="alert alert-error cursor-pointer" onClick={() => getAlbums(album_id.album_id, token)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>A network error occured! Click here to try again.</span>
            </div>
        }
    </div>
  )
}

export default Page;