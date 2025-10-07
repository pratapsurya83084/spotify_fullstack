import React, { useState, useRef, useEffect } from "react";
import { FaStepBackward, FaStepForward, FaPlay, FaPause, FaVolumeUp, FaExpand, FaAlignLeft } from "react-icons/fa";

const SongPlayFooter = () => {
  const songs = [
    {
      name: "Saiyyara",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      image: "https://pixelsao.com/wp-content/uploads/2020/09/roadtobeach.jpg",
      artist: "Anurag Kulkarni"
    },
    {
      name: "Song 2",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      image: "https://via.placeholder.com/60?text=Song+2",
      artist: "Artist 2"
    },
    {
      name: "Song 3",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      image: "https://via.placeholder.com/60?text=Song+3",
      artist: "Artist 3"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5); // default 50%
  const audioRef = useRef(new Audio(songs[currentIndex].src));

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(songs[currentIndex].src);
    audioRef.current.volume = volume; // set initial volume

    if (isPlaying) audioRef.current.play();

    const interval = setInterval(() => {
      if (audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    }, 500);

    audioRef.current.onended = handleNext;

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % songs.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className=" fixed bottom-0 w-full z-50 bg-black text-white p-2 shadow-lg flex items-center justify-between">
      
      {/* Left: Song Info */}
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <img src={songs[currentIndex].image} alt="Song" className="h-12 md:w-16 md:h-16 rounded-md"/>
        <div>
          <p className="text-sm font- ">{songs[currentIndex].name}</p>
          <p className="text-xs text-gray-400 hidden md:flex">{songs[currentIndex].artist}</p>
        </div>
      </div>

      {/* Center: Controls + Progress */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-6">
          <button onClick={handlePrev} className="bg-gray-800 hover:bg-gray-700 p-1 md:p-3 rounded-full transition">
            <FaStepBackward size={10}/>
          </button>

          <button onClick={handlePlayPause} className="bg-gray-800 hover:bg-gray-700 p-1 md:p-4 rounded-full transition">
            {isPlaying ? <FaPause size={10}/> : <FaPlay size={10}/>}
          </button>

          <button onClick={handleNext} className="bg-gray-800 hover:bg-gray-700  p-1 md:p-3 rounded-full transition">
            <FaStepForward size={10}/>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-28 md:w-96 mt-2">
          <div className="flex items-center space-x-2 text-sm">
            <span>{formatTime(audioRef.current.currentTime)}</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full relative">
              <div className="h-1 bg-blue-500 rounded-full" style={{ width: `${progress}%` }}
              >

              </div>
            </div>
            <span>{formatTime(audioRef.current.duration)}</span>
          </div>
        </div>
      </div>

      {/* Right: Additional Icons */}
      <div className="flex items- space-x-2">
        {/* Lyrics */}
        <button className="hidden md:flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 p-2 rounded transition text-sm">
          <FaAlignLeft size={16}/>
          <span>Lyrics</span>
        </button>

        {/* Volume slider */}
        <div className="flex items-center space-x-1 bg-gray-800 p-1 rounded">
          <FaVolumeUp size={8} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 rounded-lg bg-gray-600 accent-blue-500"
          />
        </div>

        {/* Fullscreen / Large screen */}
        <button className="hidden bg:flex bg-gray-800 hover:bg-gray-700 p-2 rounded transition">
          <FaExpand size={18}/>
        </button>
      </div>

    </div>
  );
};

export default SongPlayFooter;
