import React from 'react'
import useSpotify from '../hooks/useSpotify'

function Song({ track,order }: { track: SpotifyApi.PlaylistTrackObject,order:number}) {
  const spotifyApi = useSpotify()
  return (
    <div>
      <div>
        <p>{order+1}</p>
        <img src={track.track?.album.images[0].url} alt="" className='h-10 w-10'/>
      </div>
    </div>
  )
}

export default Song
