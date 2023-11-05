import React from 'react'
import album1 from '@/app/Media/albumCover4.png'
import album2 from '@/app/Media/albumCover5.png'
import album3 from '@/app/Media/albumCover6.png'
import album4 from '@/app/Media/albumCover7.png'
import album5 from '@/app/Media/albumCover8.png'
import album6 from '@/app/Media/albumCover9.png'
import Image from 'next/image'

function NewReleases() {
    const newReleases = [{
        albumCover: album1, title: "Life in a bubble"
    }, {
        albumCover: album2, title: "Mountain"
    },{
        albumCover: album3, title: "Limits"
    },{
        albumCover: album4, title: "Everything's black"
    }, {
        albumCover: album5, title: "Cancelled"
    }, {
        albumCover: album6, title: "Nomad"
    }]
  return (
    <div className='mt-8'>
        <h1 className='text-2xl'>New Releases</h1>
        <div className='flex w-full justify-between'>
            {newReleases.map((releases, index) => {
              return <div key={index}>
                  <Image src={releases.albumCover} alt="album cover" />
                  <p>{releases.title}</p>
              </div>
        })}
        </div>
    </div>
  )
}

export default NewReleases;