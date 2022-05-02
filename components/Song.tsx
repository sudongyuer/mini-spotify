import React from 'react'
import useSpotify from '../hooks/useSpotify'

function Song({ track, order }: { track: SpotifyApi.PlaylistTrackObject, order: number }) {
  const spotifyApi = useSpotify()
  return (
    <div className="grid  grid-cols-2">
      <div className='flex items-center space-x-4'>
        <p>{order + 1}</p>
        <img src={track.track?.album.images[0].url} alt="" className='h-10 w-10' />
        <div>
          <p>{track.track?.name}</p>
          <p>{track.track?.artists[0].name}</p>
        </div>
      </div>
      <div className="flex justify-between 
       ml-auto md:ml-0 items-center">
        <p className="hidden md:inline-block">{track.track?.album.name}</p>
        <p>duration</p>
      </div>
    </div>
  )
}

export default Song
