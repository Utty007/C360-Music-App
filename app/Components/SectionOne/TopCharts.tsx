'use client'
import React, { useEffect } from 'react'
import albumCover1 from '@/app/Media/albumCover1.png';
import albumCover2 from '@/app/Media/albumCover2.png';
import albumCover3 from '@/app/Media/albumCover3.png'
import Image, { StaticImageData } from 'next/image';
import Heart from '@/app/UI/Heart';
import { useMusicStore } from '@/app/Store/musicStore';
import Link from 'next/link';

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
    const [getAlbums, Charts, albumIsLoading] = useMusicStore(state => [state.getAlbums, state.charts, state.albumIsLoading])
    useEffect(() => {
        getAlbums()
    }, [getAlbums])

    // console.log(Charts)
    const albums: albums[] = Charts
  return (
    <div className='ml-12'>
        <h1 className='text-2xl mb-4'>Top Charts</h1>
        {albumIsLoading ? <span className="loading loading-bars loading-lg"></span> : albums.map(album => {
            return <Link key={album.id} href={`/${album.id}`}>
            <div key={album.id} className='flex bg-[#1A1E1F] p-4 mb-2 rounded-xl items-center justify-between w-96'>
                  <div className='flex items-center'>
                    <div><Image width={album.images[2].width} height={album.images[2].height} src={album.images[2].url} alt="album cover" /></div>
                  <div className='ml-4'>
                      <h2>{album.name}</h2>
                      <p>{album.artists[0].name}</p>
                      <p>{album.total_tracks} Tracks</p>
                  </div>
                  </div>
                  <div>
                      <Heart className="cursor-pointer hover:fill-[#FACD66]" />
                  </div>
                </div>
            </Link>
        })}
    </div>
  )
}

export default TopCharts