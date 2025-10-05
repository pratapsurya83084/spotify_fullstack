
import { isAuth, uploadThumnail } from "./middleware.js";

// export default router;
import  {upload}  from './middleware.js'; // relative path
import { addAlbum, addSong, addThumbnail, deleteAlbum ,deleteSong } from './controller.js';
import express from 'express';
import {uploadSong}  from './middleware.js';


const router = express.Router();

// Make sure the field name in upload.single() matches the Postman key
router.post('/admin/albums/new',isAuth, upload.single('thumbnail'), addAlbum);
router.post('/admin/song/new',isAuth, uploadSong.single('audio'), addSong);

//add thubmmnail
router.post('/admin/add-thumbnail/:id',isAuth, uploadThumnail.single('thumbnail'),addThumbnail );

router.delete('/admin/delete-album/:id' , isAuth,deleteAlbum);
router.delete('/admin/delete-song/:id' , isAuth,deleteSong);






export default router;
