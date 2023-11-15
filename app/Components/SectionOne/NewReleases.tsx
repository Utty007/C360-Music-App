'use-client'
import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { useMusicStore } from '@/app/Store/musicStore'
import { CiPlay1 } from 'react-icons/ci'

type childType = {
    children: string
}

export type songsData = {
    album: {
        name: string,
        images: [{
            url: string;
            width: number;
            height: number;
        }]
    };
    artists: [{name: string}]
    name: string;
    preview_url: string;
}

function NewReleases(children: childType) {
    const [songs, setMusicToPlay] = useMusicStore(state => [state.songs, state.setMusicToPlay])
    const isLoading = useMusicStore(state => state.songIsLoading)
    
    const handleMusicToPlay = (input: string, details: songsData) => {
        setMusicToPlay(input, details)
    }

  return (
    <div className='mt-8'>
        <h1 className='text-2xl mb-4'>{children.children}</h1>
        {isLoading? <span className="loading loading-bars loading-lg"></span> : <div className='flex justify-between carousel carousel-center p-4 space-x-4 rounded-box'>
            {songs.map((releases, index) => {
              return <div key={index} className="carousel-item flex-col">
                  <div className='overflow-hidden rounded-box w-[153px] h-[153px] hov'>
                      <Image width={153} height={153} src={releases.album.images[0].url} className='rounded-box cursor-pointer transition-all' alt="album cover" />
                      <div className='w-[100%] p-2 flex items-center justify-between detailRev'>
                          <span>{releases.artists[0].name}</span>
                          <span className='cursor-pointer bg-[#facd66] p-2 rounded-[100%]' onClick={() => handleMusicToPlay(releases.preview_url, releases)}><CiPlay1 /></span>
                      </div>
                  </div>
                  <p className='mt-2'>{releases.name}</p>
              </div>
        })}
        </div>}
    </div>
  )
}

export default NewReleases;