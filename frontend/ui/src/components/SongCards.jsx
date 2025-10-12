import React from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { userContext } from "../context/UserState";
import { useContext } from "react";

const SongCards = ({ image, name, desc, id }) => {

 const {AddToPlayList} = useContext(userContext);
  
//ToggleplayList  - add or remove

const ToggleplayList =async ()=>{

  const result = await AddToPlayList(id);
    console.log(result)
}



  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer 
    hover:bg-[#ffffff26]"
    >
      <div className="relative group">
        <img
          src={image ? image : "music.png"}
          className="mr-1 w-[160px] rounded"
          alt={name}
        />
        <div className="flex gap-2">
          <button
            className="absolute bottom-2 right-20 bg-green-500 text-black p-3 rounded-full 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <FaPlay />
          </button>

          {/* Bookmark Button */}
          <button
            className="absolute bottom-2 right-5 bg-gray-700 text-white p-3 rounded-full 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <FaBookmark  onClick={ToggleplayList} className="text-xl" />
          </button>
        </div>
      </div>
      <p className="font-bold mt-2 mb-1 ">{name}</p>
      <p className="text-slate-200 text-sm">{desc.slice(0, 20)}...</p>
    </div>
  );
};

export default SongCards;
