
import {uploadOnCloudinary}  from './cloudinary.js';
import {sql} from './config/db.connection.js';




// add album 
export const addAlbum = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "You are not admin", success: false });
    }

    const { title, description } = req.body || {};
    // const title = "saiyara";
    // const description="this is a latest hindi movie 2025";

    if (!title || !description) {
      return res.status(400).json({ message: "Required title or description", success: false });
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
      return res.status(403).json({ message: "You are not admin", success: false });
    }

    const { title, description, album } = req.body;

    if (!title || !description || !album) {
      return res.status(400).json({ message: "Title, description, and album are required", success: false });
    }

    // check album exists
    const isAlbum = await sql`SELECT * FROM albums WHERE id = ${album}`;
    if (isAlbum.length === 0) {
      return res.status(404).json({ message: "No album with this id found", success: false });
    }

    // file path
    const audioLocalFilePath = req.file?.path;
    console.log(audioLocalFilePath);
    
    if (!audioLocalFilePath) {
      return res.status(400).json({ message: "Please upload a song file.", success: false });
    }

    // upload to cloudinary
    const uploadedAudio = await uploadOnCloudinary(audioLocalFilePath);
    if (!uploadedAudio?.url) {
      return res.status(500).json({ message: "Song upload to Cloudinary failed.", success: false });
    }

    // insert song
    const result = await sql`
      INSERT INTO songs (title, description, audio, album_id)
      VALUES (${title}, ${description}, ${uploadedAudio.url}, ${album})
      RETURNING *
    `;

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
