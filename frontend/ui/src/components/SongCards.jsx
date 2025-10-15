import React, { useContext, useEffect, useState } from "react";
import { FaBookmark, FaPause, FaPlay, FaRegBookmark } from "react-icons/fa";
import { userContext } from "../context/UserState";
import SongContext from "../context/AppContext";

const SongCards = ({ image, name, desc, id, audio }) => {
  const { AddToPlayList, User } = useContext(userContext);
  const { isPlaying, setIsPlaying, selectedSong, setSelectedSong } = useContext(SongContext);
  
    const [bookedSongs, setBookedSongs] = useState([]);
     useEffect(() => {
    if (User?.userProfile?.playList) {
      setBookedSongs(User.userProfile.playList);
    }
  }, [User]);
  
  console.log(User?.userProfile.playList);
  // Play/pause handler
  const handlePlayPause = () => {
    const songObj = { id, name, image, desc, audio };
    if (selectedSong?.id === id) {
      // Toggle play/pause for the same song
      setIsPlaying(!isPlaying);
    } else {
      // Select new song and start playing
      setSelectedSong(songObj);
      setIsPlaying(true);
    }
  };

  const isBookmarked = bookedSongs?.some(
    (songId) => String(songId) === String(id)
  );

  // Add/remove from playlist
  const ToggleplayList = async () => {
    // Optimistic UI update
    setBookedSongs((prev) =>
      isBookmarked
        ? prev.filter((songId) => String(songId) !== String(id))
        : [...prev, String(id)]
    );

    // Call backend
    try {
      await AddToPlayList(id);
    } catch (err) {
      console.log("Playlist update failed:", err);
      // Rollback if error
      setBookedSongs((prev) =>
        isBookmarked
          ? [...prev, String(id)]
          : prev.filter((songId) => String(songId) !== String(id))
      );
    }
  };

  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
      <div className="relative group">
        <img
          src={image || "music.png"}
          className="mr-1 w-[160px] rounded"
          alt={name}
        />
        <div className="flex gap-2">
          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="absolute bottom-2 right-20 bg-green-500 text-black p-3 rounded-full 
                       opacity-100 transition-opacity duration-300"
          >
            {selectedSong?.id === id && isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Bookmark */}
          <button
            onClick={ToggleplayList}
            className={`absolute bottom-2 right-5 p-3 rounded-full transition-all duration-300
              ${
                isBookmarked ? "bg-white text-black" : "bg-gray-600 text-white"
              }`}
          >
            {isBookmarked ? (
              <FaBookmark className="text-xl" />
            ) : (
              <FaRegBookmark className="text-xl" />
            )}
          </button>
        </div>
      </div>
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc?.slice(0, 20)}...</p>
    </div>
  );
};

export default SongCards;
