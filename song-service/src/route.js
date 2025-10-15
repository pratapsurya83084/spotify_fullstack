
import express from "express";
import { deleteAll, deleteSongById,  getAlbums, getAllSongsOfAlbums, getSingleSong, getSongs } from "./controller.js";


const router= express.Router();



router.get('/all-albums',getAlbums);
router.get('/all-songs',getSongs);

router.get('/album/:id',getAllSongsOfAlbums);
router.get('/song/:id',getSingleSong);



router.get('/song/delete-song/:id',deleteSongById);
router.delete('/song/delete-allsongs',deleteAll);




export default router;
