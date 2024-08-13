import React, { useRef, useState, useEffect } from 'react';

const DraggableProgressBar = ({ audioRef, currentTime, duration, onTimeUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef();

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        onTimeUpdate(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        onTimeUpdate(audioRef.current.currentTime);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [audioRef, onTimeUpdate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateCurrentTime(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateCurrentTime(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateCurrentTime = (e) => {
    const progress = progressRef.current;
    if (progress && audioRef.current) {
      const rect = progress.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (offsetX / width) * duration;
      audioRef.current.currentTime = newTime;
      onTimeUpdate(newTime);
    }
  };

  return (
    <div className="mx-8 py-4">
      <div className="flex justify-between text-sm text-gray-100">
        <p>{formatTime(currentTime)}</p>
        <p>{formatTime(duration)}</p>
      </div>
      <div
        className="mt-1"
        ref={progressRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="h-1 bg-gray-300 rounded-full">
          <div
            className="h-1 bg-green-500 rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <span className="w-4 h-4 bg-green-500 absolute right-0 bottom-0 -mb-1 rounded-full shadow cursor-pointer"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableProgressBar;
