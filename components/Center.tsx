import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import React from 'react'

function Center() {
  const {data:session} = useSession()
  console.log(session);
  return (
    <div className="flex-grow flex">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-3 opacity-90 hover:opacity-80 
        cursor-pointer rounded-full bg-red-300
        p-1 pr-2 ">
          <img className="rounded-full w-10 h-10" src={session?.user?.image!} alt="" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5"/>
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8`}>
        {/* <img src="" alt="" /> */}
        <h1>hello</h1>
      </section>
    </div>
  )
}

export default Center
