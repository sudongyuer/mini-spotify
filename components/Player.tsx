import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'

function Player() {
  const spotifyApi = useSpotify()
  const {data:session,status}= useSession()
  const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)
  const [volume,setVolume] = useState(50)
  return (
    <div>
      {/* left */}
      <div>
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default Player
