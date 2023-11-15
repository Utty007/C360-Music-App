"use client"
import React from 'react'
import Image from 'next/image'
import searchIcon from '@/app/Media/search.svg'
import { FormEvent } from 'react'
import { useMusicStore } from '../Store/musicStore'
import ArtistData from '../UI/artistData'

function Header() {
  const [musicSearchInput, setMusicSearchInput, getArtistData, setArtistData, showSearchOutput, setShowSearchOutput] = useMusicStore(state => [state.musicSearchInput, state.setMusicSearchInput, state.getArtistData, state.setArtistData, state.showSearchOutput, state.setShowSearchOutput])
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getArtistData();
    setShowSearchOutput(true)
  }

  return (
    <header className='py-8 items-center fixed z-10 bg-inherit w-full top-0'>
      {showSearchOutput && <ArtistData/>}
        <div className='flex ml-20'>
            <Image className='w-auto h-auto' src={searchIcon} alt='Search Icon' />
            <form onSubmit={handleSearch}>
              <input className='outline-none bg-transparent ml-4 w-full flex-1' value={musicSearchInput} onChange={(e) => {
                setArtistData()
                setMusicSearchInput(e.target.value)
              }} type='text' placeholder='Search Artists'/>
              <button type='button' hidden/>
            </form>
        </div>
    </header>
  )
}

export default Header