import React from 'react'
import SideBar from './SideBar'
import Navbar from './Navbar'
import Player from './Player'

const Layout = ({children}) => {
  return (
    <div className='h-screen '>
      <div className='h-[90%] flex'>
      <SideBar/>

      <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto 1875rem
      lg:w-[75%] lg:ml-0
      '>
<Navbar/>
{children}
      </div>
      </div>

      <Player/>
      
    </div>
  )
}

export default Layout
