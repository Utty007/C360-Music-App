"use client"
import React, { useState, useEffect } from 'react'
import Notfound from './not-found'
import Image from 'next/image'
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
    const [albumData, setData] = useState<albums[] | null>(null)
    const getAlbum = async (id: string) => {
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

        const url = `https://api.spotify.com/v1/albums?ids=${id}`;
        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${result.access_token}`
            }
        }

        const getAlbums = await fetch(url, params)
        const res = await getAlbums.json()
        setData(res.albums)
    }
    getAlbum(album_id.album_id);

    if (albumData && albumData.length > 0) {
      document.body.style.backgroundImage = `url(${albumData[0].images[0].url})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = "fixed"
    }

//     useEffect(() => {
//     // Update body background when albumData changes
//     console.log('Got here')
    
//   }, [albumData]);
  return (
      <div className="relative top-20 left-32 pb-[200px] w-[85%]"
          style={{ backgroundImage: `url(${albumData !== null ? albumData[0].images[0].url : null})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
          {albumData !== null ? <>
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
                    </div>
                </div>
                <div>
                    {data.tracks.items.map((songData, index)=>{
                        return (
                            <div key={index} className='flex flex-row items-center p-2 my-2 justify-between w-full bg-neutral-700 bg-opacity-40 rounded-[15px] backdrop-blur-[10px]'>
                                <span className='w-[40%]'>{songData.name}</span>
                                <span className='w-[30%]'>{`${songData.artists[0].name} ${songData.artists[1] !== undefined ? `,${songData.artists[1].name}` : ``}`}</span>
                                <span className='w-[20%] text-right'>{songData.type}</span>
                            </div>
                        )
                    })}
                </div>
              </div>
              )
          })}
          </> : <Notfound />}
    </div>
  )
}

export default Page;