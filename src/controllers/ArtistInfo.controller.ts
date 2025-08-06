import axios from "axios";
import { Request, Response } from "express";
import ArtistInfoModel from "../models/ArtistInfo.model";

export class ArtistInfoController {

    static async getArtistInfo(req: Request, res: Response): Promise<void> {
        const data = req.params.artistName;
        if (!data) {
           res.status(400).send('Query missing')
        }

        const name = data.toLowerCase().trim();

        console.log("data", data);
        console.log("name", name);

        // check if cached
        const cached = await ArtistInfoModel.findOne({ name });
        if (cached) {
            res.json(cached.info)
            return;
        }

        const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

        // Fallback to Last.fm
        try {
            const response = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=${encodeURIComponent(name)}&api_key=${LASTFM_API_KEY}&format=json`
            );

            const info = response.data.artist;

            // Save in DB
            await ArtistInfoModel.create({
                name,
                info,
                lastFetched: new Date()
            });

            res.json(info);
        } catch (err) {
            console.error(err);
            res.status(500).send('Failed to fetch artist info');
        }
    }

}
