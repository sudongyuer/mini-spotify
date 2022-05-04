import { useRecoilState } from 'recoil';
import { currentTrackIdState } from './../atoms/songAtom';
import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
  type song = Awaited<Promise<SpotifyApi.SingleTrackResponse>>
  const [songInfo, setSongInfo] = useState<null|song>(null)
  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await spotifyApi.getTrack(currentTrackId)
        // const trackInfo = await fetch(
        //   `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        //   {
        //     headers: {
        //       Authorization: "Bearer " + spotifyApi.getAccessToken(),
        //     },
        //   }
        // ).then((res) => res.json());
        setSongInfo(trackInfo.body)
      }
    }
    fetchSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
