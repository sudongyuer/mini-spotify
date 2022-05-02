import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState<undefined | string>(undefined)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then(data => {
      setPlaylist(data.body)
    }).catch(err => { console.log("someting went wrong", err) })
  }, [spotifyApi, playlistId])
  console.log(session);
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  console.log('playlist',playlist);
  return (
    <div className="flex-grow overflow-y-scroll h-screen">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-3 opacity-90 hover:opacity-80 
        cursor-pointer rounded-full bg-black text-white
        p-1 pr-2 " onClick={signOut as any}>
          <img className="rounded-full w-10 h-10" src={session?.user?.image!} alt="" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black
       ${color} w-full h-80 text-white p-8 `}>
        <img className="w-44 h-44 shadow-2xl" src={playlist?.images[0].url} alt="" />
        <p>
          PLAYLIST
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </p>
      </section>
      {/* songs */}
      <Songs/>
    </div>
  )
}

export default Center
