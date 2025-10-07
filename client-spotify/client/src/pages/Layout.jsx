import React, { Children } from 'react'
import Navbar from '../components/Navbar';
import LeftSideBar from '../components/LeftSideBar'
import SongPlayFooter from '../components/SongPlayFooter'



const Layout = ({children}) => {
  return (
    <div>
      <div>
          <Navbar/>
        <div className='flex   bg-'>
        <LeftSideBar/>

          <div className='w-[75%] md:w-[70%] h-screen bg-brown   text-white p-5 rounded-lg m-2  '>
       
          {children}
          </div>

        </div>
        <SongPlayFooter/>
      </div>
     
    </div>
  )
}

export default Layout
