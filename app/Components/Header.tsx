"use client"
import React from 'react'
import Image from 'next/image'
import searchIcon from '@/app/Media/search.svg'
import { FormEvent } from 'react'
import { useMusicStore } from '../Store/musicStore'
import ArtistData from '../UI/artistData'

function Header() {
  const [musicSearchInput, setMusicSearchInput, getArtistData, setArtistData, showSearchOutput, setShowSearchOutput, errorState] = useMusicStore(state => [state.musicSearchInput, state.setMusicSearchInput, state.getArtistData, state.setArtistData, state.showSearchOutput, state.setShowSearchOutput, state.searchError])
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowSearchOutput(true)
    getArtistData();
    setMusicSearchInput('')
  }

  return (
    <header className='py-8 items-center fixed z-10 bg-[#1d2123] w-full top-0'>
      {showSearchOutput && <ArtistData />}
      {errorState && <div role="alert" className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>An error occured! Check your internet connection and try again.</span>
      </div>
      }
        <div className='flex ml-20'>
            <Image className='w-auto h-auto' src={searchIcon} alt='Search Icon' />
            <form onSubmit={handleSearch}>
              <input className='outline-none bg-transparent ml-4 w-full flex-1' value={musicSearchInput} onChange={(e) => {
                setArtistData()
                setMusicSearchInput(e.target.value)
                setShowSearchOutput(false)
              }} type='text' placeholder='Search Artists'/>
              <button type='button' hidden/>
            </form>
        </div>
    </header>
  )
}

export default Header