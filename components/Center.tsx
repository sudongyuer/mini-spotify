import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import React from 'react'

function Center() {
  const {data:session} = useSession()
  console.log(session);
  return (
    <div className="flex-grow flex">
      <header>
        <div className="flex items-center space-x-3 bg-black opacity-90 hover:opacity-80 
        cursor-pointer rounded-full
        p-1 pr-2">
          <img className="rounded-full w-10 h-10" src={session?.user?.image!} alt="" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5"/>
        </div>
      </header>
    </div>
  )
}

export default Center
