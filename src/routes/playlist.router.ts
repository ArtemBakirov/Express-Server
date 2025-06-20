import express from "express";
import { PlaylistController } from "../controllers/Playlist.controller";

const router = express.Router();

router.get("/:ownerId", PlaylistController.getUsersPlaylists);
router.post("/", PlaylistController.createPlaylist);
router.post("/:id/add", PlaylistController.addSongToPlaylist);
router.get("/single/:id", PlaylistController.getPlayListById);
router.get("/allSongs/:ownerId", PlaylistController.getAllSongs);


export default router;
