import { uploadOnCloudinary } from "./cloudinary.js";
import { sql } from "./config/db.connection.js";
import {Redisclient}  from '../index.js';


// add album
export const addAlbum = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not admin", success: false });
    }

    const { title, description } = req.body || {};
    // const title = "saiyara";
    // const description="this is a latest hindi movie 2025";

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Required title or description", success: false });
    }

    const imageLocalFilePath = req.file?.path;
    // console.log(imageLocalFilePath);

    if (!imageLocalFilePath) {
      return res.status(400).json({
        message: "Please upload an image.",
        success: false,
      });
    }

    // Upload to Cloudinary
    const imageurl = await uploadOnCloudinary(imageLocalFilePath);

    if (!imageurl) {
      return res.status(500).json({
        message: "Image upload to Cloudinary failed.",
        success: false,
      });
    }

    const result = await sql`
      INSERT INTO albums (title, description, thumbnail)
      VALUES (${title}, ${description}, ${imageurl.url})
      RETURNING *
    `;

     
    if (Redisclient.isReady) {
      await Redisclient.del("albums");
      console.log("cach invalidate for albums");
    }
     





    res.json({ message: "Album created", album: result[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

//add song

export const addSong = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not admin", success: false });
    }

    const { title, description, album } = req.body;

    if (!title || !description || !album) {
      return res.status(400).json({
        message: "Title, description, and album are required",
        success: false,
      });
    }

    // check album exists
    const isAlbum = await sql`SELECT * FROM albums WHERE id = ${album}`;
    if (isAlbum.length === 0) {
      return res
        .status(404)
        .json({ message: "No album with this id found", success: false });
    }

    // file path
    const audioLocalFilePath = req.file?.path;
    console.log(audioLocalFilePath);

    if (!audioLocalFilePath) {
      return res
        .status(400)
        .json({ message: "Please upload a song file.", success: false });
    }

    // upload to cloudinary
    const uploadedAudio = await uploadOnCloudinary(audioLocalFilePath);
    if (!uploadedAudio?.url) {
      return res
        .status(500)
        .json({ message: "Song upload to Cloudinary failed.", success: false });
    }

    // insert song
    const result = await sql`
      INSERT INTO songs (title, description, audio, album_id)
      VALUES (${title}, ${description}, ${uploadedAudio.url}, ${album})
      RETURNING *
    `;

    if (Redisclient.isReady) {
      await Redisclient.del("songs");
      console.log("cach invalidate for songs");
    }

    return res.status(201).json({
      message: "Song added successfully",
      success: true,
      song: result[0],
    });
  } catch (error) {
    console.error("Error adding song:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// add thubnail

export const addThumbnail = async (req, res) => {
  if (!req.user?.isAdmin) {
    return res
      .status(403)
      .json({ message: "You are not admin", success: false });
  }

  try {
    const songid = req.params.id;
    console.log(songid);

    if (!songid) {
      return res
        .status(400)
        .json({ message: "Song ID is required", success: false });
    }

    const song = await sql`SELECT*FROM songs WHERE id=${songid}`;

    if (song.length === 0) {
      return res
        .status(404)
        .json({ message: "No song with this id found", success: false });
    }

    const imageLocalFilePath = req.file?.path;

    console.log(imageLocalFilePath);

    if (!imageLocalFilePath) {
      return res.status(400).json({
        message: "Please upload an image.",
        success: false,
      });
    }

    // Upload to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalFilePath);
    if (!uploadedImage) {
      return res.status(500).json({ message: "Upload failed", success: false });
    }

    const result = await sql`
  UPDATE songs SET thumbnail=${uploadedImage.url} WHERE id = ${songid} RETURNING * 
`;

      if (Redisclient.isReady) {
      await Redisclient.del("albums");
      console.log("cach invalidate for albums");
    }
    


    res.json({ message: "Thubnail added", song: result[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error while adding thumbnail", success: false });
  }
};

//  delete album

export const deleteAlbum = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.json({
        message: "Album id is not found",
        success: false,
      });
    }

    const isalbum = await sql`SELECT*FROM albums WHERE id=${id}`;

    if (isalbum.length === 0) {
      return res
        .status(404)
        .json({ message: "No song with this id found", success: false });
    }

    //find album with that

    const album = await sql`DELETE  FROM albums WHERE id=${id}`;
    //  console.log(album)

         if (Redisclient.isReady) {
      await Redisclient.del("albums");
      console.log("cach invalidate for albums");
    }
    
    if (Redisclient.isReady) {
      await Redisclient.del("songs");
      console.log("cach invalidate for songs");
    }
    

    if (album.length === 0) {
      return res.json({
        message: "album deleted successfully",
        success: true,
      });
    }


  } catch (error) {
    console.log(error);
    return res.json({
      message: error.message,
      success: false,
    });
  }
};



//delete song 

export const deleteSong = async (req,res)=>{
  try {
    
    const Songid = req.params.id;

    if(!Songid){
      return res.json({
        message:"song id is required",
        success:false,
      });
    }
  const SongInDB = await sql`SELECT*FROM songs WHERE id=${Songid}`;

  if (SongInDB.length === 0) {
    return res.json({
      message: "No song with this id found",
      success: false,
    })
  }


    //delete this songId

    const deleteSong = await sql`DELETE FROM songs WHERE id=${Songid}`;

   
    
    if (Redisclient.isReady) {
      await Redisclient.del("songs");
      console.log("cach invalidate for songs");
    }
    
    if(deleteSong.length ===0){
      return res.json({
        message:"song deleted successfully",
        success:true,
      });
    }

  } catch (error) {
    console.log(error);

    return res.json({
      message: error.message,
      success: false,
    });

  }

}
