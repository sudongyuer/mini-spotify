import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing >>>", data.body?.item);
        setCurrentTrackId(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data)=>{
      if(data.body?.is_playing){
        spotifyApi.pause()
        setIsPlaying(false)
      }else{
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //fetch the song Info
      fetchCurrentSong();
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])
  return (
    <div className="h-24 bg-gradient-to-b from-black 
    to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8
     text-white">
      {/* left */}
      <div className="flex items-center space-x-4">
        {/* @ts-ignore */}
        <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images[0]?.url} alt="" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists[0].name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className='button' />
        <RewindIcon
          className="button"
        // onClick={() => spotifyApi.skipToPrevious()} -- The API is not working
        />
        {
          isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
          )
        }
        <FastForwardIcon
          className="button"
        // onClick={()=>spotifyApi.skipToNext()} the api is not working
        />

        <ReplyIcon
          className='button'
        />
      </div>
      {/* right */}
      
    </div>
  )
}

export default Player
