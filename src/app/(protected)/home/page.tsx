import CreatePostInput from '@/components/post/CreatePostInput'
import Feed from '@/components/post/Feed'
import React from 'react'


export default function HomePage() {
  return (
    <div> <CreatePostInput/> 
        <Feed/>
    </div>
  )
}