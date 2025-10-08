import { sql } from "./config/db.connection.js";
import { Redisclient } from "../index.js";

const CACHE_EXPIRY = 1800; // 30 minutes in seconds

export const getAlbums = async (req, res) => {
  try {
    let albums;

    // 1. Try to get from Redis first
    if (Redisclient.isReady) {
      const cachedAlbums = await Redisclient.get("albums");
      if (cachedAlbums) {
        console.log("Cache hit");
        return res.json({
          status: true,
          message: "Albums fetched successfully (from cache)",
          data: JSON.parse(cachedAlbums),
        });
      }
    }

    // 2. Fetch from DB if cache miss
    console.log("Cache miss");
    albums = await sql`SELECT * FROM albums`;

    if (!albums || albums.length === 0) {
      return res.json({
        status: false,
             success:false,
        message: "No albums found",
        data: [],
      });
    }

    // 3. Store in Redis
    if (Redisclient.isReady) {
      await Redisclient.set(
        "albums",
        JSON.stringify(albums),
        { EX: CACHE_EXPIRY } // expiry in seconds
      );
    }

    return res.json({
      status: true,
           success:true,
      message: "Albums fetched successfully",
      data: albums,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
           success:false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getSongs = async (req, res) => {
  try {
    let songs;

    
    if (Redisclient.isReady) {
      const cachedSongs = await Redisclient.get("songs");
  // console.log(cachedSongs);
  
      if (cachedSongs) {
        console.log("Cache hit");
        return res.json({
          status: true,
          success:true,
          message: "Songs fetched successfully (from cache)",
          data: JSON.parse(cachedSongs),
        });
      }
    }

  
    console.log("Cache miss");
    songs = await sql`SELECT * FROM songs`;

    if (!songs || songs.length === 0) {
      return res.json({
        status: false,
        success:false,
        message: "No songs found",
        data: [],
      });
    }


    if (Redisclient.isReady) {
      await Redisclient.set(
        "songs",
        JSON.stringify(songs),
        { EX: CACHE_EXPIRY } // expiry in seconds
      );
    }

    return res.json({
      status: true,
           success:true,
      message: "Songs fetched successfully",
      data: songs,
    });
    
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
           success:false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const getAllSongsOfAlbums = async (req, res) => {
  try {
    const { id } = req.params;

   
    const cacheKey = `album:${id}:songs`;

   
    if (Redisclient.isReady) {
      const cachedData = await Redisclient.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit");
        return res.json({
          status: true,
          success:true,
          message: "Songs fetched successfully (from cache)",
          data: JSON.parse(cachedData),
        });
      }
    }

  
    console.log("Cache miss");
    const albums = await sql`SELECT * FROM albums WHERE id=${id}`;

    if (albums.length === 0) {
      return res.json({
        status: true,
        message: "No album found with this id",
        success: false,
      });
    }

    const songs = await sql`SELECT * FROM songs WHERE album_id=${id}`;

    const result = {
      albums: albums[0],
      songs: songs,
    };

   
    if (Redisclient.isReady) {
      await Redisclient.set(
        cacheKey,
        JSON.stringify(result),
        { EX: CACHE_EXPIRY } // expiry in seconds
      );
    }

    return res.json({
      status: true,
           success:true,
      message: "Songs fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
           success:false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//single song
export const getSingleSong = async (req, res) => {
  try {
    const { id } = req.params;

    const cacheKey = `song:${id}`;

   
    if (Redisclient.isReady) {
      const cachedSong = await Redisclient.get(cacheKey);
      if (cachedSong) {
        console.log("Cache hit");
        return res.json({
          status: true,
          success:true,
          message: "Song fetched successfully (from cache)",
          data: JSON.parse(cachedSong),
        });
      }
    }

    console.log("Cache miss");
    const song = await sql`SELECT * FROM songs WHERE id=${id}`;

    if (song.length === 0) {
      return res.json({
        status: true,
        message: "No song found with this id",
        success: false,
        data: {},
      });
    }

    const songData = song[0];

   
    if (Redisclient.isReady) {
      await Redisclient.set(
        cacheKey,
        JSON.stringify(songData),
        { EX: CACHE_EXPIRY } // expiry in seconds
      );
    }

    return res.json({
      status: true,
     success:true,
      message: "Song fetched successfully",
      data: songData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      success:false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

