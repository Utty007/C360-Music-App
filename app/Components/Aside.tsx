import React from 'react'
import Image from 'next/image'
import homeIcon from '@/app/Media/Home.svg'
import playlistIcon from '@/app/Media/playlist.svg'
import radioIcon from '@/app/Media/radio.svg'
import videosIcon from '@/app/Media/videos.svg'
import ProfileIcon from '@/app/Media/profile.svg'
import logoutIcon from '@/app/Media/Logout.svg'

function Aside() {
  return (
    <aside className='flex flex-col mx-5 my-8 w-fit absolute top-9 left-0'>
        <div className='bg-[#1A1E1F] p-4 rounded-full h-40 flex flex-col items-center justify-between'>
            <Image src={homeIcon} alt='Home Icon' />
            <Image src={playlistIcon} alt='Playlist Icon' />
            <Image src={radioIcon} alt='Radio Icon' />
            <Image src={videosIcon} alt='Videos Icon' />
        </div>
        <div className='bg-[#1A1E1F] p-4 rounded-full h-24 mt-3 flex flex-col items-center justify-between'>
            <Image src={ProfileIcon} alt='Profile Icon' />
            <Image src={logoutIcon} alt='Logout Icon' />
        </div>
    </aside>
  )
}

export default Aside