import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  
  return (
    <div className="bg-black h-screen overflow-hidden  text-gray-500">
      <Head>
        <title>mini-spotify</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex">
        <Sidebar />
        {/* Center */}
        <Center />
      </main>
      <div className="sticky bottom-0">
        {/*Player*/}
        <Player/>
      </div>
    </div>
  )
}

export default Home
