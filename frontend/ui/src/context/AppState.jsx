import React, { useCallback, useEffect, useState } from "react";
import SongContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

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

  // Fetch all albums
  const fetchAlbums = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/all-albums`);
      //  console.log(response.data)
      if (response.data.status) {
        setAlbums(response.data.data);
        //  console.log(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }, []);

  // Fetch a specific album by id
  const fetchAlbumById = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/album/${id}`);
      // console.log(response)
      if (response.data.status) {
        setSelectedAlbum(response.data.data);
         console.log(response.data)
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
        console.log(response.data)
      }
    } catch (error) {
      console.error(`Error fetching song ${id}:`, error);
    }
  };

  // fetchSongById(5)

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, [fetchSongs, fetchAlbums]);


  

  return (
    <SongContext.Provider
      value={{
        songs,
        albums,
        selectedSong,
        selectedAlbum,
        fetchSongById,
        fetchAlbumById,
        loading,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default AppState;
