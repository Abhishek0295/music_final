import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: [{ song: null, isPlaying: true, currentTime: 0 }],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    setSong: (state, action) => {
      state.song = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextSong: (state) => {
      const nextIndex = (state.currentIndex + 1) % state.playlist.length;
      state.currentIndex = nextIndex;
      state.song = state.playlist[nextIndex];
    },
    prevSong: (state) => {
      const prevIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
      state.currentIndex = prevIndex;
      state.song = state.playlist[prevIndex];
    },
  },
});

export const { setCurrentTime, setDuration, play, pause, setSong, setPlaylist, setCurrentIndex, nextSong, prevSong } = playerSlice.actions;

export default playerSlice.reducer;
