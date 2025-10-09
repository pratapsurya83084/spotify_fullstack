import React, { useCallback, useEffect, useState } from "react";
import SongContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index , setIndex] = useState(0);
    
  const baseUrl = "http://localhost:8000/api/v1";

  // Fetch all songs
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/all-songs`);
      if (response.data.status) {
        setSongs(response.data.data);
        // console.log(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching all songs:", error);
    } finally {
      setLoading(false);
    }
  }, []);





  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) return;
    try {
      const data  = await axios.get(`${baseUrl}/song/${selectedSong}`
      );
      setSongs(data.data);
    } catch (error) {
      console.log(error);
    }
  }, [selectedSong]);

 

  // Fetch all albums
  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/all-albums`);
      //  console.log(response.data)
      if (response.data.status) {
        setAlbums(response.data.data);
        //  console.log(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }, [])
  
  ;



  // Fetch a specific album by id
  const fetchAlbumById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/album/${id}`);
      // console.log(response)
      if (response.data.status) {
        setSelectedAlbum(response.data.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(`Error fetching album ${id}:`, error);
    }
  };

  // Fetch a specific song by id
  const fetchSongById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/song/${id}`);
      if (response.data.status) {
        setSelectedSong(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error(`Error fetching song ${id}:`, error);
    }
  };

  // fetchSongById(5)

//next song
const nextSong = useCallback(()=>{
if (index === songs.length-1) {
  setIndex(0);
  setSelectedSong(songs[0]);
}else{
  setIndex((prevIndex)=>prevIndex + 1);
  setSelectedSong(songs[index+1])
}
},[index,songs]);

//prev songs

  const prevSong = useCallback(() => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelectedSong(songs[index - 1]);
    }
  }, [index, songs]);




  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, [fetchSongs, fetchAlbums]);



return (
  <SongContext.Provider
    value={{
      songs,
      albums,
      fetchSingleSong,
      selectedSong,
      setSelectedSong, 
      selectedAlbum,
      nextSong,
      prevSong,
      isPlaying,
      setIsPlaying,
      fetchSongById,
      fetchAlbumById,
      loading,
      index,
      setIndex, 
    }}
  >
    {children}
  </SongContext.Provider>
);

};

export default AppState;
