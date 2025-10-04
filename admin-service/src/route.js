
import { isAuth } from "./middleware.js";

// export default router;
import  {upload}  from './middleware.js'; // relative path
import { addAlbum, addSong } from './controller.js';
import express from 'express';
import {uploadSong}  from './middleware.js';


const router = express.Router();

// Make sure the field name in upload.single() matches the Postman key
router.post('/admin/albums/new',isAuth, upload.single('thumbnail'), addAlbum);
router.post('/admin/song/new',isAuth, uploadSong.single('audio'), addSong);

export default router;
