import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

function HomePage() {
  return (
    <div className=' w-screen h-screen flex'>
      <div className='w-[300px] md:w-[350px] h-full sm:block hidden'>
        <Sidebar />
      </div>
      <div className=' flex-1 h-full border-l'>
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage