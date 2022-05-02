import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song';

function Songs() {
  const playlist = useRecoilValue(playlistState)
  console.log(playlist);
  return (
    <div className="text-white p-8 pt-0">
      {playlist?.tracks.items.map((track,index) => (
        <Song key={track.track?.id} track={track} order={index}/>
      // <div key={track.track?.id}>{track.track?.name}</div>
      ))}
    </div>
  )
}

export default Songs
