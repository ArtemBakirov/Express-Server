import express from "express";
import {ArtistInfoController} from "../controllers/ArtistInfo.controller";

const router = express.Router();

router.get("/:artistName", ArtistInfoController.getArtistInfo);


export default router;
