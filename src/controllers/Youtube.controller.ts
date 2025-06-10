import { Request, Response } from "express";
import axios from "axios";

export class YoutubeController{

    static async searchYoutubeSongs(req: Request , res: Response) : Promise<any>{
        const { q : query, pageToken } = req.query;
        if (!query) return res.status(400).json({ error: "Missing search query" });

        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    q: query,
                    type: "video",
                    maxResults: 20,
                    key: process.env.YOUTUBE_API_KEY,
                    pageToken,
                },
            });

            const results = response.data.items.map((item: any) => ({
                videoId: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.default.url,
            }));
            console.log("next page token", response.data.nextPageToken);

            res.json({ items:results, nextPageToken: response.data.nextPageToken });
        } catch (error) {
            console.error(error);
            res.status(500).json([]);
        }
    }
}
