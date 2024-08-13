import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import DraggableProgressBar from './ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { Triangle } from 'react-loader-spinner';
 
import {
  setCurrentTime as setCurrentTimeAction,
  setDuration as setDurationAction,
  play as playAction,
  pause as pauseAction,
  setSong as setSongAction,
  setPlaylist as setPlaylistAction,
  setCurrentIndex as setCurrentIndexAction,
  nextSong as nextSongAction,
  prevSong as prevSongAction,
} from '../../redux/slices/songSlice';
 
const Player = () => {
  const dispatch = useDispatch();
  const { currentTime, duration, isPlaying, song, playlist, currentIndex } = useSelector((state) => state.player);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
 
  const { id } = useParams();
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchSongById = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
        const fetchedSong = res.data.song;
 
        dispatch(setSongAction(fetchedSong));
        setIsLoaded(true);
      } catch (err) {
        console.error('Error fetching the song:', err);
      }
    };
 
    fetchSongById();
  }, [dispatch, id]);
 
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song?.urlLink || '';
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [song, isPlaying]);
 
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);
 
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setCurrentTimeAction(audioRef.current.currentTime));
    }
  };
 
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDurationAction(audioRef.current.duration));
    }
  };
 
  const togglePlayPause = () => {
    dispatch(isPlaying ? pauseAction() : playAction());
  };
 
  const handleNext = () => {
    if (playlist.length > 0) {
      dispatch(nextSongAction());
      const nextSong = playlist[(currentIndex + 1) % playlist.length];
      navigate(`/${nextSong._id}`);
    }
  };
 
  const handlePrevious = () => {
    if (playlist.length > 0) {
      dispatch(prevSongAction());
      const prevSong = playlist[(currentIndex - 1 + playlist.length) % playlist.length];
      navigate(`/${prevSong._id}`);
    }
  };
 
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
 
  return (
    <div className="w-full bg-black h-full">
      {!isLoaded ? (
        // <div className="flex justify-center items-center h-64">
        //   <Triangle
        //     visible={true}
        //     height="150"
        //     width="150"
        //     color="#4fa94d"
        //     ariaLabel="triangle-loading"
        //   />
        // </div>
        <div className="flex justify-center items-center h-64 relative">
          <video
            src="/dance.mp4"
            muted
            autoPlay
            loop
            className="absolute inset-0 object-fit w-full h-full opacity-50"
          ></video>
          <h1 className="text-white text-2xl font-bold animate-pulse -top-28 relative z-10">
            Select your favourite song to play..
            <span className="inline-block animate-bounce text-green-400 mx-1">
              🎵
            </span>
            <span className="inline-block animate-spin text-yellow-400 mx-1">
              🎶
            </span>
          </h1>
        </div>
      ) : !song ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-white text-lg">Song not found</p>
        </div>
      ) : (
        <>
          <audio
            key={song?._id}
            ref={audioRef}
            type="audio/mpeg"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          ></audio>

          <div className="w-[100vw]">
            <div
              className="flex w-6/12 bg-black shadow-md overflow-hidden mx-auto backdrop-blur-lg"
              style={{
                background:
                  "linear-gradient(to top left, #22C35D 1%, black 60%)",
              }}
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-around px-2 pt-4">
                  <p className="text-white ms-10 capitalize font-semibold text-lg">
                    {song.title}
                  </p>
                  <p className="text-yellow-200 capitalize">{song.artist}</p>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      className="text-white focus:outline-none"
                      onClick={() => setVolume(volume > 0 ? 0 : 1)}
                    >
                      {volume === 0 ? (
                        <FaVolumeMute className="w-5 h-5" />
                      ) : volume > 0.5 ? (
                        <FaVolumeUp className="w-5 h-5" />
                      ) : (
                        <FaVolumeDown className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center sm:flex-row items-center">
                  <div className="flex items-center rounded-full">
                    <div className="flex space-x-3 p-2">
                      <button
                        className="focus:outline-none"
                        onClick={handlePrevious}
                      >
                        <GrChapterPrevious className="w-5 h-5 text-white hover:text-green-500" />
                      </button>

                      <button
                        className="focus:outline-none"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? (
                          <FaPause
                            className="w-5 h-5 hover:text-green-500 "
                            color="#ef4444"
                          />
                        ) : (
                          <FaPlay
                            className="w-5 h-5 hover:text-green-500"
                            color="#ef4444"
                          />
                        )}
                      </button>

                      <button
                        className="focus:outline-none"
                        onClick={handleNext}
                      >
                        <GrChapterNext className="w-5 h-5 text-white hover:text-green-500" />
                      </button>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-1/2 md:w-7/12 lg:w-4/6 ml-2">
                    <DraggableProgressBar
                      audioRef={audioRef}
                      currentTime={currentTime}
                      duration={duration}
                      onTimeUpdate={(time) => {
                        dispatch(setCurrentTimeAction(time));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
 
export default Player;
 
 