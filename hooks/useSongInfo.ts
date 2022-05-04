import { useRecoilState } from 'recoil';
import { currentTrackIdState } from './../atoms/songAtom';
import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState(null)

  useEffect(() => {

  }, [currentTrackId, spotifyApi])
  
  return songInfo
}

export default useSongInfo
