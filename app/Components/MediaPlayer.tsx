/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, {useRef, useState, useEffect} from 'react';
import albumCover from '@/app/Media/Rectangle 15.png'
import Image from 'next/image';
import prevIcon from '@/app/Media/previous.png';
import nextIcon from '@/app/Media/next.png'
import Shuffle from '../UI/Shuffle';
import Repeat from '../UI/Repeat';
import { useMusicStore } from '../Store/musicStore';
import { useFuncStore } from '../Store/playerFuncs';
import { BsPlay, BsPause} from 'react-icons/bs'
import { FaVolumeHigh, FaVolumeXmark, FaRecordVinyl } from 'react-icons/fa6'
import DurationSlider from '../UI/DurationSlider/DurationSlider';
import VolumeSlider from '../UI/VolumeSlider/VolumeSlider';

function MediaPlayer() {
  const [setShowSearchOutput, musicToPlay, mtpDetails] = useMusicStore(state => [state.setShowSearchOutput, state.musicToPlay, state.mtpDetails])
  const [isRepeat, setIsRepeat, volumeMute, setMute] = useFuncStore(state => [state.isRepeat, state.setIsRepeat, state.volumeMute, state.setMute])
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(100);

  const progress = (currentTime / duration) * 100;
  document.documentElement.style.setProperty('--progress', `${progress}%`);

   useEffect(() => {
    // When musicToPlay changes, update the audio source and play the new song
    if (audioRef.current) {
      if (musicToPlay !== "") {
        audioRef.current.src = musicToPlay;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error('Play failed:', error);
      });
      setIsPlaying(true);
      }}
  }, [musicToPlay]);

  const togglePlayPause = () => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
        audioRef.current.src = musicToPlay
        console.log(audioRef.current.src)  
        audioRef.current.play().catch(error => {
        console.error('Play failed:', error);
  });
        setIsPlaying(true);
        } else {
        audioRef.current.pause();
        setIsPlaying(false);
        }
    }
  };
  
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat)
    console.log('Repeat Toggled')
  }
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      console.log(audioRef.current.duration)
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    // Reset the playing state and update your icon accordingly
    setIsPlaying(false);
  };
  
    useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
    }
  }, [volume]);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleVolMute = () => {
    setMute(!volumeMute)
  }

  return (
    <div onClick={() => setShowSearchOutput(false)} className='bg-neutral-800 px-8 py-4 bg-opacity-30 flex w-[100%] items-center z-10 fixed bottom-0 left-0 border border-white border-opacity-10 backdrop-blur-[30px]'>
        <div className='flex w-[15%] items-center justify-center'>
            <div>
              {mtpDetails !== undefined ?
          <Image src={mtpDetails.album.images[0].url}
            width={70} height={70} className='rounded-xl'
            alt='Album Cover' /> : <FaRecordVinyl className="w-[70px] h-[70px]" />}
            </div>
            <div className='pl-3'>
                <h1>{mtpDetails?.name}</h1>
                <p>{mtpDetails?.artists[0].name}</p>
            </div>
        </div>
        <div className='flex flex-col w-[70%] items-center justify-center'>
            <div className='flex items-center justify-between mb-3 w-[180px]'>
                <span><Shuffle className="cursor-pointer" /></span>
                <Image className='w-5 h-5 cursor-pointer' src={prevIcon} alt="prev button" />
                  <span onClick={togglePlayPause} className='bg-[#facd66] rounded-[99.17px] p-2 cursor-pointer shadow justify-center items-center gap-[3.33px] inline-flex'>{isPlaying? <BsPause /> : <BsPlay />}</span>
                <Image className='w-5 h-5 cursor-pointer' src={nextIcon} alt='next button' />
                <span onClick={toggleRepeat} className="cursor-pointer"><Repeat className="cursor-pointer" /></span>
            </div>
            <DurationSlider value={currentTime} 
            max={duration} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (audioRef.current) {
                audioRef.current.currentTime = parseFloat(e.target.value);
                }
            }}  />
            <audio ref={audioRef} loop={isRepeat} muted={volumeMute}>
                <source src={musicToPlay} type='audio/mpeg' />
            </audio>
        </div>
        <div className='flex w-[15%] items-center'>
            <div onClick={handleVolMute} className='cursor-pointer'>
              {volumeMute?  <FaVolumeXmark /> : <FaVolumeHigh />}
            </div>
            <VolumeSlider 
              onChange={handleVolumeChange}
              value={volume}
              max={100} 
              />
        </div>
    </div>
  )
}

export default MediaPlayer;