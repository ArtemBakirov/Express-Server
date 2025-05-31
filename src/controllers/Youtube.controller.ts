import { Request, Response } from "express";
import axios from "axios";

export class YoutubeController{

    static async searchYoutubeSongs(req: Request , res: Response) : Promise<any>{
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: "Missing search query" });

        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    q: query,
                    type: "video",
                    maxResults: 10,
                    key: process.env.YOUTUBE_API_KEY,
                },
            });

            const results = response.data.items.map((item: any) => ({
                videoId: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.default.url,
            }));

            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json([]);
        }
    }
}
