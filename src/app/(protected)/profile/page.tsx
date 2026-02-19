import Image from 'next/image'
import React from 'react'

export default function ProfilePage() {
  return (
    <>
    <div className='bg-white p-4 rounded-3xl border border-gray-300'>
        <div className='relative w-25 h-25 shrink-0'>
            <Image src="/images/profile.jpg" alt="profile-pic" fill className="object-cover rounded-full border-5 border-gray-300 hover:border-blue-primary/60 cursor-pointer"/>
        

        </div>

    </div>
    </>
  )
}
