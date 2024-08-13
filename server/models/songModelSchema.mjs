import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    default: 'Unknown Album', 
  },
  genre: {
    type: String,
    default: 'Unknown Genre', 
  },
  filepath: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Song', songSchema);
