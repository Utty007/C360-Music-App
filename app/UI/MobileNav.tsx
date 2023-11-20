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
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useMusicStore } from '../Store/musicStore'


function MobileNav() {
    const [setShowSearchOutput] = useMusicStore(state => [state.setShowSearchOutput])
    const pathname = usePathname()
    
  return (
    <div onClick={() => setShowSearchOutput(false)} className='sm:hidden flex flex-col px-5 w-full fixed z-[100] top-14 left-0 items-start h-[100vh]'>
        <div className='p-4 mt-8 flex flex-col h-20 justify-between items-start'>
            <Link className='flex items-center pb-5' href="/"><Image src={pathname === '/' ||  pathname.startsWith('/album/')  ? activeHomeIcon : homeIcon} alt='Home Icon' /> <span className='ml-4'>Home</span></Link>
            <Link className='flex items-center pb-5' href='/playlist'><Image src={pathname === '/playlist' ? activePlaylistIcon : playlistIcon} alt='Playlist Icon' /> <span className='ml-4'>My playlists</span></Link>
            <div className='flex items-center pb-5'><Image src={radioIcon} alt='Radio Icon' /> <span className='ml-4'>Radio</span></div>
            <div className='flex items-center pb-5'><Image src={videosIcon} alt='Videos Icon' /> <span className='ml-4'>Videos</span></div>
            <div className='flex items-center pb-5'><Image src={ProfileIcon} alt='Profile Icon' /> <span className='ml-4'>Profile</span></div>
            <div className='flex items-center pb-5'><Image src={logoutIcon} alt='Logout Icon' /> <span className='ml-4'>Log Out</span></div>
        </div>
    </div>
  )
}

export default MobileNav