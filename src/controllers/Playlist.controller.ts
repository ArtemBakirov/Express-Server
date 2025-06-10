import { Playlist } from "../models/Playlist.model";
import { Request, Response } from "express";
import axios from "axios";
import PlaylistModel from "../models/Playlist.model";

export class PlaylistController {

    static async getUsersPlaylists(req: Request, res: Response): Promise<void> {
        const playlists = await PlaylistModel.find({ owner: req.params.ownerId });
        res.json(playlists);
    }

    static async createPlaylist(req: Request, res: Response): Promise<void> {
        const { title, owner } = req.body;
        console.log("body is", req.body);
        const playlist = await PlaylistModel.create({ title, owner, songs: [] });
        res.json(playlist);
    }

    static async addSongToPlaylist(req: Request, res: Response): Promise<any> {
        console.log("song Data", req.body);
        const { videoId, title, thumbnail } = req.body;
        const playlist = await PlaylistModel.findById(req.params.id);
        if (!playlist) return res.status(404).json("Playlist not found");

        playlist.songs.push({ videoId, title, thumbnail });
        await playlist.save();
        res.json(playlist);
    }

    static async getPlayListById(req: Request, res: Response): Promise<any> {
        console.log("playlist by id", req.params.id);
        const playlist = await PlaylistModel.findById(req.params.id);
        if (!playlist) return res.status(404).send("Playlist not found");
        res.json(playlist);
    }

    static async getAllSongs(req: Request, res: Response): Promise<any> {
        try {
            const playlistsWithIds = await PlaylistModel.aggregate([
                { $match: { owner: req.params.ownerId } },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        videoIds: {
                            $map: {
                                input: "$songs",
                                as: "song",
                                in: "$$song.videoId",
                            },
                        },
                    },
                },
            ]);

            res.json(playlistsWithIds);
        } catch (error) {
            console.error("Error fetching playlist song IDs:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}
