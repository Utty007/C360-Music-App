'use client'
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useMusicStore } from '@/app/Store/musicStore';
import Link from 'next/link';
import { useFuncStore } from '@/app/Store/playerFuncs';

export type albums = {
    name: string;
    artists: {name: string}[];
    total_tracks: number;
    id: number;
    images: {
        url: string;
        width: number;
        height: number;
    }[];
}

function TopCharts() {
  const [getAlbums, Charts, albumIsLoading, errorState] = useMusicStore(state => [state.getAlbums, state.charts, state.albumIsLoading, state.albumError])
  const [setIsLoading] = useFuncStore(state => [state.setIsLoading])
    useEffect(() => {
        getAlbums()
    }, [getAlbums])

    const albums: albums[] = Charts
  return (
    <div className='ml-5 md:ml-12 m-mg-top'>
        <h1 className='text-2xl mb-4'>Top Albums</h1>
        {albumIsLoading ? <span className="loading loading-bars loading-lg"></span> : albums.map(album => {
            return <Link key={album.id} href={`/album/${album.id}`} onClick={() => setIsLoading(true)}>
            <div key={album.id} className='flex bg-[#1A1E1F] p-4 mb-2 rounded-xl items-center justify-between w-80 sm:w-96'>
                  <div className='flex items-center'>
                    <div><Image width={album.images[2].width} height={album.images[2].height} src={album.images[2].url} alt="album cover" /></div>
                    <div className='ml-4'>
                        <h2>{album.name}</h2>
                        <p>{album.artists[0].name}</p>
                        <p>{album.total_tracks} Tracks</p>
                    </div>
                  </div>
              </div>
            </Link>
        })}
      {errorState && <div role="alert" className="alert alert-error cursor-pointer" onClick={() => getAlbums()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>An error occured! Click here to try again.</span>
        </div>
      }
    </div>
  )
}

export default TopCharts