import React, { useContext } from "react";
import { FaMusic } from "react-icons/fa";
import SongContext from "../context/AppContext";

const PlayListCard = () => {
  // const { value } = useContext(SongContext);

  return (
    <div className="flex items-center p-4 shadow-md gap-4 cursor-pointer hover:bg-[#282828]">
      <div className="w-10 h-10 bg-gray-600 flex items-center rounded-md">
        <FaMusic className="text-xl m-auto text-white" />
      </div>

      <div className="ml-4">
        <h2>My PlayList</h2>
        <p className="text-gray-400 text-sm">
          Playlist • <span>{"User"}</span> 
          
          {/* {value} */}
        </p>
      </div>
    </div>
  );
};

export default PlayListCard;
