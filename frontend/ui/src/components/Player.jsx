import React, { useContext, useEffect, useRef, useState } from "react";
import songContext from "../context/AppContext";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";
import { userContext } from "../context/UserState";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const {
    selectedSong,
    setSelectedSong,
    songs,
    isPlaying,
    setIsPlaying,
    prevSong,
    nextSong,
  } = useContext(songContext);


  const { IsAuth } = useContext(userContext);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
const navigate = useNavigate();
  // console.log("progress is:", progress);
  // console.log("duration is:", duration);

  useEffect(() => {

    if (!selectedSong && songs && songs.length > 0) {
      setSelectedSong(songs[0]);
    }

  }, [songs, selectedSong, setSelectedSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setProgress(audio.currentTime || 0);

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [duration, progress]);

  const handlePlayPause = () => {
    if (!IsAuth) {
      navigate('/login');
      return;
    }
    if (!audioRef.current) return;
    console.log(isPlaying);
    if (isPlaying) {
      // song is already  play   then pause karo
      audioRef.current.pause();
      console.log("player pause song :", isPlaying);
    } else {
      audioRef.current.play();
      console.log("player play song :", isPlaying);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current && selectedSong) {
      audioRef.current.load();
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play().catch(() => console.log("Autoplay blocked"));
      }
    }
  }, [selectedSong, isPlaying]);

  // ontrol
  const volumeChange = (e) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const durationChange = (e) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  if (!selectedSong) {
    return (
      <div className="h-[10%] bg-black flex justify-center items-center text-gray-400">
        No song selected
      </div>
    );
  }

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Song Info */}
      <div className="lg:flex items-center gap-4">
        <img
          src={selectedSong.thumbnail || "/download.jpeg"}
          className="w-12 rounded"
          alt=""
        />
        <div className="hidden md:block">
          <p>{selectedSong.title}</p>
          <p className="text-sm text-gray-400">
            {selectedSong.description?.slice(0, 30)}...
          </p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        {selectedSong.audio && (
          <audio ref={audioRef} src={selectedSong.audio} onEnded={nextSong} />
        )}

        {/* Progress bar */}
        <div className="w-full items-center flex flex-col font-thin text-green-400">
          <input
            type="range"
            min="0"
            max="100"
            className="progress-bar w-[120px] md:w-[300px]"
            value={duration > 0 ? (progress / duration) * 100 : 0}
            onChange={durationChange}
          />

          {/* Time Display */}
          <div className="text-xs text-gray-400 flex justify-between w-full px-2">
            <span>
              {Math.floor(progress / 60)}:
              {("0" + Math.floor(progress % 60)).slice(-2)}
            </span>
            <span>
              {Math.floor(duration / 60)}:
              {("0" + Math.floor(duration % 60)).slice(-2)}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center items-center gap-4 mt-1">
          <span className="cursor-pointer" onClick={prevSong}>
            <GrChapterPrevious />
          </span>

          <button
            className="bg-white text-black rounded-full p-2"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <span className="cursor-pointer" onClick={nextSong}>
            <GrChapterNext />
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center">
        <input
          type="range"
          className="w-16 md:w-32"
          min="0"
          max="100"
          step="0.01"
          value={volume * 100}
          onChange={volumeChange}
        />
      </div>
    </div>
  );
};

export default Player;
