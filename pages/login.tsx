import { log } from "console";
import { getProviders, signIn } from "next-auth/react";
import React from 'react'
type provides=Awaited<ReturnType<typeof getProviders>>
function login({providers}:{providers:provides}) {  
  console.log(providers);
  return (
    <div className=" w-full min-h-screen flex flex-col justify-center items-center bg-black">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {
        Object.values(providers!).map(provider=>(
          <div key={provider.name}>
            <button className="p-5 bg-[#18D860] text-white rounded-lg"
            onClick={()=>{signIn(provider.id,{callbackUrl:'/'})}}
            >
             Login with {provider.name}
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default login

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps() {  
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
}
