import Image from 'next/image';
import React from 'react'
import { useMusicStore } from '../Store/musicStore';
import Link from 'next/link';

function ArtistData() {
    const [artistData, isLoading, setShowSearchOutput, searchError, empty] = useMusicStore(state => [state.artistData, state.isLoading, state.setShowSearchOutput, state.searchError, state.empty])

    const handleBackdropClick = () => {
        setShowSearchOutput(false);
    };

  return (
      <>
      <div className="max-h-96 carousel carousel-vertical shadow-md bg-[inherit] max-w-xs absolute top-16 sm:top-20 right-6 sm:left-32 z-50">
        {empty && <span className='p-4'>Input an artist name</span>}
          {isLoading ? <span className="loading loading-bars loading-lg m-4"></span> : <div>{artistData.map((albumData) => {
              return <Link href={`/album/${albumData.id}`} key={albumData.id} onClick={() => setShowSearchOutput(false)}>
              <div className="carousel-item rounded-none flex p-4 justify-between items-center cursor-pointer hover:bg-[#1A1E1F]">
                  <div className='flex items-center'>
                        <Image src={albumData.images[0].url} width={50} height={50} alt={albumData.artists[0].name} />
                        <div className='pl-2'>
                            <h1 className='text-2xl'>{albumData.name}</h1>
                            <p className='text-lg'>{albumData.artists[0].name}</p>
                        </div>
                    </div>
                  </div>
              </Link>
          })}
          </div>}
          {searchError && <div className='p-3 flex'>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>An error occured! Check your internet connection and try again.</span>
            </div>
          }
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-40" onClick={handleBackdropClick}></div>
      </>
  )
}

export default ArtistData;