import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Play, Clock, Pause } from "lucide-react";
import SongContext from "../context/AppContext";
import Loading from "../components/Loading";
import { userContext } from "../context/UserState";

const Albums = () => {
  const [album, setAlbum] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const { fetchAlbumById, selectedSong, setSelectedSong, isPlaying, setIsPlaying ,nextSong, prevSong } = useContext(SongContext);
  const { albumId } = useParams();
  const [loading, setLoading] = useState(false);
const {IsAuth} = useContext(userContext);
const navigate = useNavigate();
// console.log(IsAuth)
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchAlbum() {
      setLoading(true);
      try {
        const res = await fetchAlbumById(albumId);
        if (res?.data) {
          setAlbum(res.data.albums);
          setAlbumSongs(res.data.songs);
        }
      } catch (error) {
        console.error("Error fetching album:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbum();
  }, [albumId, fetchAlbumById]);


const handlePlay = (song) => {
  if (!IsAuth) {
    navigate('/login');
    return;
  }
  if (!song) return;

  if (selectedSong?.id === song.id && !isPlaying) {
    // Toggle play/pause for the same song
    // setIsPlaying((prev) => !prev);
      audioRef.current.pause();
      setIsPlaying(true)
  } else {
   audioRef.current.play();
    // Different song clicked: set selected and start playing
    setSelectedSong(song);
    setIsPlaying(false);
  }
};

// Sync audioRef with selectedSong and isPlaying
useEffect(() => {
  const audio = audioRef.current;
   if (audio && selectedSong) {
      audio.load();
     
      if (isPlaying) {
        audio.play().catch(() => console.log("Autoplay blocked"));
      }
    }
}, [selectedSong, isPlaying]);

 

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : album ? (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-gray-900 to-black text-white p-8 mt-10">
          {/* Album Header */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <img
              src={album?.thumbnail || "/default-album.jpg"}
              alt={album?.title}
              className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-lg shadow-2xl"
            />
            <div className="text-center md:text-left space-y-2">
              <p className="uppercase text-gray-300 text-sm tracking-widest">Album</p>
              <h1 className="text-4xl md:text-6xl font-bold">{album?.title}</h1>
              <p className="text-gray-400 text-sm">{album?.description}</p>
              <p className="text-gray-300 text-sm mt-2">
                {albumSongs?.length || 0} songs • {album?.artist || "Unknown Artist"}
              </p>
            </div>
          </div>

          {/* Play Button for first song */}
          <div className="mt-10 flex items-center gap-6">
            <button
              className="bg-green-500 hover:bg-green-400 transition rounded-full p-5"
              onClick={() => albumSongs[0] && handlePlay(albumSongs[0])}
            >
              {isPlaying && selectedSong ? (
                <Pause   className="text-black w-6 h-6" />
              ) : (
                <Play className="text-black w-6 h-6" />
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition">❤️</button>
          </div>

          {/* Song List */}
          <div className="mt-4">
            <div className="grid grid-cols-3 md:grid-cols-4 text-gray-400 text-sm border-b border-gray-700 pb-2">
              <span>#</span>
              <span className="col-span-1 md:col-span-2">Title</span>
              <span className="block text-right mr-4">
                <Clock className="inline w-4 h-4" />
              </span>
            </div>

            <div className="mt-4 md:overflow-visible overflow-x-auto">
              <div className="space-x-4 md:space-x-0 pb-2">
                {albumSongs.length > 0 ? (
                  albumSongs.map((song, index) => (
                    <div
                      key={song?.id}
                      className="flex items-center justify-between w-full cursor-pointer py-2 px-2 rounded-lg hover:bg-gray-800 transition duration-500 group"
                      onClick={() => handlePlay(song)}
                    >
                      {/* Index or Play icon */}
                      <div  className="flex items-center justify-center w-8 flex-shrink-0">
                        {selectedSong?.id === song?.id && isPlaying ? (
                          <Pause
                         
                          className="w-4 h-4 text-green-400" />
                        ) : (
                          <Play
                        
                          className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                        <span
                          className={`ml-2 ${
                            selectedSong?.id === song?.id
                              ? "hidden"
                              : "text-gray-400 group-hover:hidden"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>

                      {/* Song Info */}
                      <div className="flex flex-col flex-1 mx-4 overflow-hidden">
                        <p
                          className={`font-medium truncate ${
                            selectedSong?.id === song.id ? "text-green-400" : "text-white"
                          }`}
                        >
                          {song?.title || "Unknown Title"}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {song?.artist || "Unknown Artist"}
                        </p>
                      </div>

                      {/* Duration */}
                      <span className="text-gray-400 flex-shrink-0">
                        {song?.duration || "3:45"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center pt-20 text-gray-500">Songs not found</div>
                )}
              </div>
            </div>
          </div>

          {/* Hidden audio for playback */}
 <audio ref={audioRef} src={selectedSong?.audio} onEnded={nextSong} />

        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default Albums;
