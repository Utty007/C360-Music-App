/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import prevIcon from '@/app/Media/previous.png';
import nextIcon from '@/app/Media/next.png';
import Shuffle from '../UI/Shuffle';
import Repeat from '../UI/Repeat';
import { useMusicStore } from '../Store/musicStore';
import { useFuncStore } from '../Store/playerFuncs';
import { BsPlay, BsPause } from 'react-icons/bs';
import { FaVolumeHigh, FaVolumeXmark, FaRecordVinyl } from 'react-icons/fa6';
import DurationSlider from '../UI/DurationSlider/DurationSlider';
import VolumeSlider from '../UI/VolumeSlider/VolumeSlider';

type det = {
  name: string | undefined;
  preview_url: string;
  duration_ms: number;
  artists: [{ name: string }];
  image: {url: string}
}

function MediaPlayer() {
  const [setShowSearchOutput, musicToPlay, mtpDetails, setMusicToPlay] = useMusicStore(state => [
    state.setShowSearchOutput,
    state.musicToPlay,
    state.mtpDetails,
    state.setMusicToPlay
  ]);
  const [
    isRepeat,
    setIsRepeat,
    volumeMute,
    setMute,
    currentSongIndex,
    setCurrentSongIndex,
    songs,
    albumData
  ] = useFuncStore(state => [
    state.isRepeat,
    state.setIsRepeat,
    state.volumeMute,
    state.setMute,
    state.currentSongIndex,
    state.setCurrentSongIndex,
    state.songs,
    state.albumData
  ]);
  const [isShuffle, setShuffle] = useFuncStore(state => [state.shuffle, state.setShuffle]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useFuncStore(state => [state.isPlaying, state.setIsPlaying]);
  const [currentTime, setCurrentTime] = useState(0);
  const [musicDet, setMusicDet] = useState<det>()
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(100);

  // ...

useEffect(() => {
  if (typeof document !== 'undefined') {
    const progress = (currentTime / duration) * 100;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  }
}, [currentTime, duration]);

// ...


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

      }
    }
  }, [musicToPlay]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
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
    setIsRepeat(!isRepeat);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    // Reset the playing state and update your icon accordingly
    setIsPlaying(false);
    playNext()
    if (isShuffle) {
      const shuffledIndex = getRandomIndex(currentSongIndex, songs.length);
      setCurrentSongIndex(shuffledIndex);
      setMusicToPlay(songs[shuffledIndex].preview_url);
    } else if (isRepeat) {
      audioRef.current?.play();
    } else if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setMusicToPlay(songs[currentSongIndex + 1].preview_url);
    }
  };

  const getRandomIndex = (currentIndex: number, maxIndex: number): number => {
    let randomIndex = currentIndex;
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * maxIndex);
    }
    return randomIndex;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
    }
  }, [volume, isShuffle]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleVolMute = () => {
    setMute(!volumeMute);
  };

  const handleShuffle = () => {
    setShuffle(!isShuffle);
  };

  const playNext = () => {
    if (isShuffle) {
      const shuffledIndex = getRandomIndex(currentSongIndex, songs.length);
      setCurrentSongIndex(shuffledIndex);
      setMusicToPlay(songs[shuffledIndex].preview_url);
    } else if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setMusicToPlay(songs[currentSongIndex + 1].preview_url);
    }
  };

  const playPrev = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setMusicToPlay(songs[currentSongIndex - 1].preview_url);
    }
  };

  useEffect(() => {
    if (mtpDetails?.track.preview_url === musicToPlay) {
    setMusicDet({
      name: mtpDetails.track.name,
      preview_url: mtpDetails.track.preview_url,
      image: {
        url: mtpDetails.track.album.images[0].url
      },
      artists: [{ name: mtpDetails.track.artists[0].name}],
      duration_ms: 30
    })
  } else if (songs[currentSongIndex]?.preview_url === musicToPlay) {
        setMusicDet({
          name: songs[currentSongIndex]?.name,
          preview_url: songs[currentSongIndex].preview_url,
          image: {
            url: songs[currentSongIndex].image.url
          },
          artists: [{ name: songs[currentSongIndex].artists.map(artists => artists.name).join(' ft ') }],
          duration_ms: songs[currentSongIndex].duration_ms
        })
      }

  }, [musicToPlay, currentSongIndex])
  return (
    <div
      onClick={() => setShowSearchOutput(false)}
      className='bg-neutral-800 px-8 py-4 bg-opacity-30 flex w-[100%] justify-between sm:justify-normal items-center z-50 fixed bottom-0 left-0 border border-white border-opacity-10 backdrop-blur-[30px]'
    >
      <div className='flex items-center justify-center'>
        <div>
          {musicDet?.image.url === undefined ? (
            <FaRecordVinyl className='w-[70px] h-[70px]' />
          ) : (
            <Image
              src={musicDet?.image.url}
              width={70}
              height={70}
              className='rounded-xl'
              alt='Album Cover'
            />
          )}
        </div>
        <div className='pl-3'>
          <h1>{musicDet?.artists[0].name}</h1>
          <p>{musicDet?.name}</p>
        </div>
      </div>
      <div className='flex flex-col sm:w-[70%] items-center justify-center'>
        <div className='flex items-center justify-between mb-3 sm:w-[180px]'>
          <span className='cursor-pointer hidden sm:block' onClick={() => handleShuffle()}>
            <Shuffle className='cursor-pointer' />
          </span>
          <Image onClick={() => playPrev()} className='w-5 h-5 cursor-pointer hidden sm:block' src={prevIcon} alt='prev button' />
          <span
            onClick={togglePlayPause}
            className='bg-[#facd66] rounded-[99.17px] p-2 mr-5 sm:mr-0 cursor-pointer shadow justify-center items-center gap-[3.33px] inline-flex'
          >
            {isPlaying ? <BsPause /> : <BsPlay />}
          </span>
          <Image onClick={() => playNext()} className='w-5 h-5 cursor-pointer' src={nextIcon} alt='next button' />
          <span onClick={toggleRepeat} className='cursor-pointer hidden sm:block'>
            <Repeat className='cursor-pointer' />
          </span>
        </div>
        <DurationSlider
          value={currentTime}
          max={duration}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (audioRef.current) {
              audioRef.current.currentTime = parseFloat(e.target.value);
            }
          }}
        />
        <audio ref={audioRef} loop={isRepeat} muted={volumeMute}>
          <source src={musicDet?.preview_url} type='audio/mpeg' />
        </audio>
      </div>
      <div className='w-[15%] items-center hidden sm:flex'>
        <div onClick={handleVolMute} className='cursor-pointer'>
          {volumeMute ? <FaVolumeXmark /> : <FaVolumeHigh />}
        </div>
        <VolumeSlider onChange={handleVolumeChange} value={volume} max={100} />
      </div>
    </div>
  );
}

export default MediaPlayer;
