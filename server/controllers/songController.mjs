import songModelSchema from "../models/songModelSchema.mjs";
import path from "path";
import fs from "fs"
import mongoose from "mongoose";

export const uploadSongController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "No file uploaded",
            });
        }

        const { title, artist, album, genre } = req.body;
        const filepath = req.file.path;
        // console.log("File Path:", filepath);

        const song = new songModelSchema({ title, artist, album, genre, filepath });
        await song.save();

        res.status(200).send({
            success: true,
            message: "Song Added Successfully",
            song,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};

export const getAllSongsController = async (req, res) => {
    try {
        const songs = await songModelSchema.find().sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Songs fetched Successfully",
            songs,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};

export const getSingleSongController = async (req, res) => {
    try {
        const {id} = req.params


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid song ID",
            });
        }


        const song = await songModelSchema.findById(id);
        if (!song) {
            return res.status(404).send({
                success: false,
                message: "Song not found",
            });
        }
        const publicUrl = `http://localhost:8888/uploads/songs/${path.basename(song.filepath)}`;
        // console.log(publicUrl)
        res.status(200).send({
            success: true,
            message: "Song played",
            song: {
                ...song.toObject(),
                urlLink: publicUrl 
            },
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};


  