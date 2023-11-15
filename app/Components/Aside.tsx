"use client"
import React from 'react'
import Image from 'next/image'
import homeIcon from '@/app/Media/Home.svg'
import activeHomeIcon from '@/app/Media/Home.png'
import playlistIcon from '@/app/Media/playlist.svg'
import activePlaylistIcon from '@/app/Media/playlist.png'
import radioIcon from '@/app/Media/radio.svg'
import videosIcon from '@/app/Media/videos.svg'
import ProfileIcon from '@/app/Media/profile.svg'
import logoutIcon from '@/app/Media/Logout.svg'
import c360Logo from '@/app/Media/logo.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useMusicStore } from '../Store/musicStore'


function Aside() {
    const [setShowSearchOutput] = useMusicStore(state => [state.setShowSearchOutput])
    const pathname = usePathname()
  return (
    <div onClick={() => setShowSearchOutput(false)} className='flex flex-col mx-5 my-8 w-fit fixed z-20 top-0 left-0 items-center h-[100vh]'>
        <div><Image src={c360Logo} alt='Logo' /></div>
        <div className='bg-[#1A1E1F] p-4 mt-8 rounded-full h-40 flex flex-col items-center justify-between'>
            <Link href="/"><Image src={pathname === '/' ? activeHomeIcon : homeIcon} alt='Home Icon' /></Link>
            <Link href='/playlist'><Image src={pathname === '/playlist' ? activePlaylistIcon : playlistIcon} alt='Playlist Icon' /></Link>
            <Image src={radioIcon} alt='Radio Icon' />
            <Image src={videosIcon} alt='Videos Icon' />
        </div>
        <div className='bg-[#1A1E1F] p-4 rounded-full h-24 mt-3 flex flex-col items-center justify-between'>
            <Image src={ProfileIcon} alt='Profile Icon' />
            <Image src={logoutIcon} alt='Logout Icon' />
        </div>
    </div>
  )
}

export default Aside