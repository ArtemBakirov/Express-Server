import express from "express";
import { YoutubeController } from "../controllers/Youtube.controller";

const router = express.Router();

router.get("/youtubeSearch", YoutubeController.searchYoutubeSongs);
export default router;
