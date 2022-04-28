import { useSession } from 'next-auth/react'
import React from 'react'

function Center() {
  const {data:session} = useSession()
  console.log(session);
  return (
    <div className="flex-grow">
      <h1>I am the Center</h1>
      <header>
        <div>
          <img src={session?.user?.image} alt="" />
        </div>
      </header>
    </div>
  )
}

export default Center
