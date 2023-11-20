"use client"
import React from 'react'
import Image from 'next/image'
import searchIcon from '@/app/Media/search.svg'
import { FormEvent } from 'react'
import { useMusicStore } from '../Store/musicStore'
import ArtistData from '../UI/artistData'
import C360Logo from '@/app/Media/logo.svg'
import { IoMenu, IoClose } from "react-icons/io5";
import { useUiStore } from '../Store/UiStore'
import Link from 'next/link'

function Header() {
  const [musicSearchInput, setMusicSearchInput, getArtistData, setArtistData, showSearchOutput, setShowSearchOutput, setEmpty] = useMusicStore(state => [state.musicSearchInput, state.setMusicSearchInput, state.getArtistData, state.setArtistData, state.showSearchOutput, state.setShowSearchOutput, state.setEmpty])
  const [toggleMobNav, setToggle] = useUiStore(state => [state.toggleMobNav, state.setToggle])
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
      setEmpty(false)
      setShowSearchOutput(true)
      getArtistData();
      setMusicSearchInput('')
  }

  const handleSub = () => {
    handleSearch
  }

  return (
    <header className='py-4 sm:py-7 items-center fixed z-10 bg-[#1d2123] w-full top-0'>
      {showSearchOutput && <ArtistData />}
      <div className='flex ml-5 items-center justify-between sm:justify-normal'>
        <div className='flex items-center'>
          <div onClick={() => setToggle(!toggleMobNav)} className='pr-2'>
          {toggleMobNav? <IoClose className='w-6 h-6' /> : <IoMenu className='w-6 h-6' />}
   </div>
        <Link href='/' className='sm:hidden' >
          <Image src={C360Logo} alt='C360 Logo' />
        </Link>
        </div>
        <div className='flex flex-row-reverse sm:flex-row ml-5 mr-5 sm:ml-20 items-center'>
            <Image width={16} height={24} src={searchIcon} onClick={handleSub} alt='Search Icon' />
            <form onSubmit={handleSearch}>
              <input className='outline-none bg-transparent ml-4 w-full flex-1' value={musicSearchInput} onChange={(e) => {
                setArtistData()
                setMusicSearchInput(e.target.value)
                setShowSearchOutput(false)
              }} type='text' placeholder='Search Artists'/>
              <button type='button' hidden/>
            </form>
        </div>
      </div>
    </header>
  )
}

export default Header