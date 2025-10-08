import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";

const LeftSideBar = ({ onCreate, onMyPlaylists }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => setSearchVisible(!searchVisible);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  return (
    <div
      className="fixed top-0 left-0 h-screen bg-brown text-white p-4 mt-20 rounded-lg shadow-lg flex flex-col items-start"
      style={{ width: "calc(20%)" }}
    >
      {/* Mobile View Buttons */}{" "}
      <div className="flex flex-col items-center gap-4 w-full md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center h-10 w-10 rounded-md bg-[#121212] hover:bg-[#1f1f1f] transition"
        >
          {" "}
          <IoLibraryOutline size={22} />{" "}
        </button>

        <button
          onClick={onCreate}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1f1f1f] hover:bg-[#2a2a2a] transition"
        >
          <AiOutlinePlus size={24} />
        </button>

        <button
          onClick={onMyPlaylists}
          className="flex items-center justify-center h-10 w-10 rounded-md bg-[#121212] hover:bg-[#1f1f1f] transition"
        >
          <BsMusicNoteList size={22} />
        </button>
      </div>


      {/* Desktop View */}
      <div className="hidden md:flex flex-col gap-6 w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <IoLibraryOutline className="md:hidden" size={22} /> Your Library
          </h1>
          <button
            onClick={onCreate}
            className="bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-full px-3 py-1 font-semibold"
          >
            + Create
          </button>
        </div>

        {/* Playlist Section */}
        <div className="flex justify-between items-center">
          <button
            onClick={onMyPlaylists}
            className="bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-full px-3 py-1 font-semibold"
          >
            Playlists
          </button>
        </div>

        {/* Search & Dropdown */}
        <div className="flex justify-between items-center relative">
          <div
            className={`flex items-center transition-all duration-300 ${
              searchVisible ? "bg-slate-800 px-2 py-1 rounded-md" : ""
            }`}
          >
            <button onClick={toggleSearch} className="text-slate-400">
              <FaSearch size={18} />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className={`ml-2 bg-slate-800 text-white rounded-full px-3 py-1 focus:outline-none transition-all duration-300 ${
                searchVisible ? "w-40 opacity-100" : "w-0 opacity-0 p-0"
              }`}
            />
          </div>

          <button
            onClick={toggleDropdown}
            className="text-sm text-slate-300 hover:text-white transition"
          >
            Recent ▾
          </button>

          {dropdownVisible && (
            <div className="absolute right-0 top-8 bg-[#262626] w-40 p-3 rounded-lg shadow-lg">
              <ul className="space-y-2 text-sm">
                <li className="hover:text-indigo-400 cursor-pointer">Recent</li>
                <li className="hover:text-indigo-400 cursor-pointer">
                  Recently Added
                </li>
                <li className="hover:text-indigo-400 cursor-pointer">
                  Alphabetical
                </li>
                <li className="hover:text-indigo-400 cursor-pointer">
                  Creator
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
