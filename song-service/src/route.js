
import express from "express";
import { getAlbums, getAllSongsOfAlbums, getSingleSong, getSongs } from "./controller.js";


const router= express.Router();



router.get('/all-albums',getAlbums);
router.get('/all-songs',getSongs);

router.get('/album/:id',getAllSongsOfAlbums);
router.get('/song/:id',getSingleSong);




export default router;
