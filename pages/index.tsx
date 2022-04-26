import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>mini-spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>This is a DOPE spotify build</div>
      <main>
        <Sidebar></Sidebar>
        {/* Center */}
      </main>
      <div>{/*Player*/ }</div>
    </div>
  )
}

export default Home
