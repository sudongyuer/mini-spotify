import React from 'react'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'

function Song({ track, order }: { track: SpotifyApi.PlaylistTrackObject, order: number }) {
  const spotifyApi = useSpotify()
  return (
    <div className="grid  grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900
     rounded-lg cursor-pointer">
      <div className='flex items-center space-x-4'>
        <p>{order + 1}</p>
        <img src={track.track?.album.images[0].url} alt="" className='h-10 w-10' />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track?.name}</p>
          <p className='w-40'>{track.track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex justify-between 
       ml-auto md:ml-0 items-center">
        <p className="w-40 hidden md:inline-block">{track.track?.album.name}</p>
        <p>{millisToMinutesAndSeconds(Number(track.track?.duration_ms))}</p>
      </div>
    </div>
  )
}

export default Song
