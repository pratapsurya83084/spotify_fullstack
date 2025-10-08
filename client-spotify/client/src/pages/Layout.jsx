import React from 'react'
import Navbar from '../components/Navbar';
import LeftSideBar from '../components/LeftSideBar'
import SongPlayFooter from '../components/SongPlayFooter'



const Layout = ({children}) => {

    const sidebarWidth = "20%";
  const gap = "1rem"; // gap between sidebar and right content



  return (
    <div>
      <div>
          <Navbar/>
        <div className=' flex gap-  bg-'>
        <LeftSideBar/>

          <div 
      
        style={{
          marginLeft: `calc(${sidebarWidth} + ${gap})`, // sidebar + gap
          width: `calc(80% - ${gap})`,                 // remaining width minus gap
          height: "100vh",
          overflowY: "auto",
        }}
          className='w- h-screen bg-brown   text-white p-5 rounded-lg m-2  '>
       
          {children}
          </div>

        </div>
        <SongPlayFooter/>
      </div>
     
    </div>
  )
}

export default Layout
