import Image from 'next/image';
import React from 'react'
import { useMusicStore } from '../Store/musicStore';
import { CiPlay1 } from 'react-icons/ci'
import { propsData } from '@/typings';
import { songsData } from '@/typings';

function ArtistData() {
    const [artistData, setMusicToPlay] = useMusicStore(state => [state.artistData, state.setMusicToPlay])

    const handleMusicToPlay = (albumData: propsData) => {
        const convertedSongData: songsData = {
            album: {
                name: albumData.name,
                images: [{url: albumData.images[0].url, width: 50, height: 50}]
            }, 
            artists: [{name: albumData.artists[0].name}],
            name: albumData.name,
            href: '',
            uri: '',
            preview_url: 'https://p.scdn.co/mp3-preview/3be5a770917b1d87f2ed5778f16507ad2b398ceb?cid=a698b79000234b7eb5a243559c6ec8b3'
        }
       setMusicToPlay(convertedSongData.preview_url, convertedSongData)
    }
  return (
      <div className="h-96 carousel carousel-vertical shadow-md bg-[inherit] absolute top-20 left-32">
          <div>{artistData.map((albumData, index) => {
              return <div key={index} className="carousel-item rounded-none flex p-4 justify-between items-center cursor-pointer hover:bg-[#1A1E1F]">
                  <div className='flex items-center'>
                        <Image src={albumData.images[0].url} width={50} height={50} alt={albumData.artists[0].name} />
                        <div className='pl-2'>
                            <h1 className='text-2xl'>{albumData.name}</h1>
                            <p className='text-lg'>{albumData.artists[0].name}</p>
                        </div>
                  </div>
                  <div onClick={() => handleMusicToPlay(albumData)} className='bg-[#facd66] p-2 cursor-pointer'>
                      <span><CiPlay1 /></span>
                  </div>
              </div>
          })}</div>
      </div>
  )
}

export default ArtistData;