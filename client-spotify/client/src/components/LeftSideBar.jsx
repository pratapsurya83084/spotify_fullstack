import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineFolder } from "react-icons/ai";
import { MdPlaylistPlay } from "react-icons/md";
import { BsMusicNoteList } from "react-icons/bs"; // or FaMusic, MdMusicNote, etc.
import { IoLibraryOutline, IoLibrary } from "react-icons/io5";

const LeftSideBar = ({ onCreate, onMyPlaylists }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [vsible, setVisibledropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const showSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const showDropDown = () => {
    console.log("Dropdown clicked");
    setVisibledropdown(!vsible);
  };

  const iconSize = 24;
  const iconColor = "#FFFFFF"; // white on dark bg, or dark on light

  return (
    <div className="bg-brown  text-white h-screen  mt-20  fixed top-0 left-0  p-5 rounded-lg m-2"
      style={{ width: 'calc(20%)' }}
    >
      {/* phone size show icons leftside  bar */}
      <div className="flex flex-col items-center justify-content-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden items-center gap-2 text-white px- py-2 rounded-md hover:bg-[#1f1f1f] transition"
          style={{ backgroundColor: "#121212" }} >
        
          <svg
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M14.457 15.207a1 1 0 0 1-1.414-1.414L14.836 12l-1.793-1.793a1 1 0 0 1 1.414-1.414l2.5 2.5a1 1 0 0 1 0 1.414z"></path>
            <path d="M20 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zM4 20V4h4v16zm16 0H10V4h10z"></path>
          </svg>
        </button>

        <div>
          <button
            onClick={onCreate}
            className="flex md:hidden items-center gap-2 px- py-2 rounded hover:bg-[#1f1f1f] transition"
          >
            <AiOutlinePlus size={iconSize} color={iconColor} />
          </button>

          <button className="flex md:hidden items-center gap-2 bg-[#121212] text-white px- py-2 rounded-lg hover:bg-[#1f1f1f] transition">
            <BsMusicNoteList size={24} />
            {/* <span>My Music</span> */}
          </button>
        </div>
      </div>

      {/* First Row */}
      <div className="hidden md:flex justify-between items-center mb-5">
        <div className="hidden md:flex items-center gap-2">

         

          <h1 className="font-bold">Your Library</h1>
        </div>

        <button className="bg-slate-800 cursor-pointer rounded-full px-3 py-1 font-bold">
          <span className="text-slate-400">+</span> Create
        </button>
      </div>

      {/* icon my playList */}
      {/* <MdPlaylistAdd size={24} /> */}
      {/* Second Row */}
      <div className="hidden md:flex justify-between items-center mb-5">
        <button className="bg-slate-800 cursor-pointer rounded-full px-3 py-1 font-bold">
          Playlists
        </button>
      </div>

      {/* Third Row: Search */}
      <div className="hidden md:flex items-center justify-between mb-5 relative ">
        {/* Search Icon */}
        <div
          className={`${
            !searchVisible ? "bg" : "bg-slate-800 text-white"
          } p-1 rounded-md`}
        >
          <button onClick={showSearchBar} className="flex-shrink-0">
            <FaSearch className="text-slate-400" size={18} />
          </button>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className={`ml-2 bg-slate-800 text-white rounded-full px-3 py-1 focus:outline-none transition-all duration-300 ${
              searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 p-0"
            }`}
          />
        </div>

        <div>
          <button
            onClick={showDropDown}
            //   onMouseOver={showDropDown}
            className="text-2xl"
          >
            {" "}
            <span className="text-xl">{"recent"}</span> ={" "}
          </button>
        </div>
      </div>

      {vsible && (
        <div className="  bg-[#262626]  w-40 p-3 rounded-lg">
          <ul className="space-y-2">
            <li>Recent</li>
            <li>Recent Added</li>
            <li>Alphabetical</li>
            <li>Recent Added</li>
            <li>Creator</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftSideBar;
