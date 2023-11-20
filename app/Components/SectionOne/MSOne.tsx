import React from 'react'
import imgFrame from '@/app/Media/Frame4.png'
import heartIcon from '@/app/Media/Heart.png'
import person from '@/app/Media/Pexels.png'
import Image from 'next/image'

function Card() {
  return (
    <div className='bg-[#609EAF] pl-8 rounded-3xl flex max-w-[660px] mr-5 sm:mr-0'>
        <div className='pt-8'>
            <p className='mb-20 sm:mb-12'>Curated playlists</p>
            <h1 className='font-extrabold text-3xl'>R&B Hits</h1>
            <p className='text-base'>All mine, Lie again, Pretty call me everyday, <br />
            Out of time, No love, Bad habit, <br />
            and so much more.</p>
            <span className='flex w-40 justify-between mt-12 items-center med-max-sm-mb'>
                <Image src={imgFrame} alt='Image'/> <Image className='w-4 h-4' src={heartIcon} alt='Love Icon'/>33k Likes
            </span>
        </div>
        <div className='hidden sm:block'>
            <Image className='background-image h-full' src={person} alt='Artist Image'/>
        </div>
    </div>
  )
}

export default Card;