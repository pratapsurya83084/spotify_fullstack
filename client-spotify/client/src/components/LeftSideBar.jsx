import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const LeftSideBar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [vsible, setVisibledropdown] = useState(false);

  const showSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const showDropDown = () => {
    console.log("Dropdown clicked");
    setVisibledropdown(!vsible);
  };

  return (
    <div className=" w-[25%] md:w-[30%] h-screen bg-brown text-white p-5 rounded-lg m-2">
      {/* First Row */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold">Your Library</h1>
        <button className="bg-slate-800 cursor-pointer rounded-full px-3 py-1 font-bold">
          <span className="text-slate-400">+</span> Create
        </button>
      </div>

      {/* Second Row */}
      <div className="flex justify-between items-center mb-5">
        <button className="bg-slate-800 cursor-pointer rounded-full px-3 py-1 font-bold">
          Playlists
        </button>
      </div>

      {/* Third Row: Search */}
      <div className="flex items-center justify-between mb-5 relative ">
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
          className="text-2xl"> <span className="text-xl">{"recent"}</span> = </button>
        </div>

      </div>

{
   vsible&&(
           <div className="  bg-[#262626]  w-40 p-3 rounded-lg">
            <ul className="space-y-2">
                <li>Recent</li>
                <li>Recent Added</li>
                <li>Alphabetical</li>
                <li>Recent Added</li>
                <li>Creator</li>
            </ul>
      </div>
    )
}
   


    </div>
  );
};

export default LeftSideBar;
