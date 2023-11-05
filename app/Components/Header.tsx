import React from 'react'
import c360Logo from '@/app/Media/logo.svg'
import Image from 'next/image'
import searchIcon from '@/app/Media/search.svg'

function Header() {
  return (
    <header className='flex mx-8 my-4 items-center absolute top-0'>
        <Image src={c360Logo} alt='Logo' />
        <div className='flex ml-16'>
            <Image className='w-auto h-auto' src={searchIcon} alt='Search Icon' />
            <input className='outline-none bg-transparent ml-4 w-full flex-1' type='text' placeholder='Search Artists'/>
        </div>
    </header>
  )
}

export default Header