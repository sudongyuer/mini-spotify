import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'

function Songs() {
  const playlist = useRecoilValue(playlistState)
  console.log(playlist);
  return (
    <div className="text-white">
      {playlist?.tracks.items.map(track => (
      <div key={track.track?.id}>{track.track?.name}</div>
      ))}
    </div>
  )
}

export default Songs
