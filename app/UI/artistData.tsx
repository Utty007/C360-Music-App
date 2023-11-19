import Image from 'next/image';
import React from 'react'
import { useMusicStore } from '../Store/musicStore';
import Link from 'next/link';

function ArtistData() {
    const [artistData, isLoading, setShowSearchOutput] = useMusicStore(state => [state.artistData, state.isLoading, state.setShowSearchOutput])

    const handleBackdropClick = () => {
    setShowSearchOutput(false);
    };

  return (
      <>
      <div className="max-h-96 carousel carousel-vertical shadow-md bg-[inherit] absolute top-20 left-32 z-50">
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
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-40" onClick={handleBackdropClick}></div>
      </>
  )
}

export default ArtistData;