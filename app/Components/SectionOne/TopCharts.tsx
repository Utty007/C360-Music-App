import React from 'react'
import albumCover1 from '@/app/Media/albumCover1.png';
import albumCover2 from '@/app/Media/albumCover2.png';
import albumCover3 from '@/app/Media/albumCover3.png'
import Image, { StaticImageData } from 'next/image';
import Heart from '@/app/UI/Heart';

type albums = {
    title: string;
    artist: string;
    duration: string;
    id: number;
    cover: StaticImageData
}

function TopCharts() {
    const albums: albums[] = [{
        title: "Golden age of 80s",
        artist: "Sean Swadder",
        duration: "2:34:45",
        id: 1,
        cover: albumCover1
    },{
        title: 'Reggae "n" Blues',
        artist: "Dj Yk Mule",
        duration: "1:02:42",
        id: 2,
        cover: albumCover2
    },{
        title: "Tomorrow's tunes",
        artist: "Obi Datti",
        duration: "2:01:25",
        id: 3,
        cover: albumCover3
    }]
  return (
    <div className='ml-12'>
        <h1 className='text-2xl mb-4'>Top Charts</h1>
          {albums.map(album => {
              return <div key={album.id} className='flex bg-[#1A1E1F] p-4 mb-2 rounded-xl items-center justify-between w-96'>
                  <div className='flex items-center'>
                    <div><Image src={album.cover} alt="album cover" /></div>
                  <div className='ml-4'>
                      <h2>{album.title}</h2>
                      <p>{album.artist}</p>
                      <p>{album.duration}</p>
                  </div>
                  </div>
                  <div>
                      <Heart />
                  </div>
              </div>
        })}
    </div>
  )
}

export default TopCharts