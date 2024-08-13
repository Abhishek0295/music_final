import axios from 'axios';
import React, { useState, useEffect, memo, useRef, useCallback } from 'react';
import { RiRefreshLine } from "react-icons/ri";
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { FaSpotify } from "react-icons/fa";
import { toast } from "react-toastify";
import { Triangle } from 'react-loader-spinner';

const Sidebar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchSongs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}`);
      let songs = res?.data?.songs || [];
      const searchQuery = searchParams.get("s");
      const genreFilter = searchParams.get("genre");

      if (searchQuery) {
        songs = songs.filter(song =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (genreFilter) {
        songs = songs.filter(song =>
          song.genre.toLowerCase() === genreFilter.toLowerCase()
        );
      }

      songs.sort((a, b) => a.title.localeCompare(b.title));

      setData(songs);
    } catch (error) {
      toast.error('Failed to fetch songs');
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  const handleRefresh = () => {
    fetchSongs();
  };


  useEffect(() => {
    fetchSongs();
  }, [searchParams]);

// search filter ----
  const handleSearchChange = (e) => {
    searchParams.set("s", e.target.value);
    setSearchParams(searchParams);
    fetchSongs();
  };
 
  // filter ----
  const handleGenreFilter = (genre) => {
    setSearchParams({ genre: genre }); 
    fetchSongs(); 
  };

  const clearGenreFilter = () => {
    // setSearchParams({}); 
    searchParams.delete("genre");
    setSearchParams(searchParams);
    fetchSongs(); 
  };

  return (
    <div className="container flex flex-col mx-auto bg-black text-white select-none">
      <aside className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-black text-white border-r border-r-dashed border-r-neutral-200">
        <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
          <p className="flex gap-5">
            <FaSpotify size={50} className='text-green-500 -rotate-45' />
            <span className='flex items-center justify-center font-bold text-2xl'>Softify</span>
          </p>
        </div>

        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="flex items-center justify-between px-8 py-5">
          <div>
            <input
              type="text"
              value={searchParams.get("s") || ""}
              onChange={handleSearchChange}
              placeholder="Search songs..."
              className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
            />
          </div>
          <a className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0" href="#">
            <span onClick={handleRefresh}
              className="leading-none transition-colors duration-200 ease-in-out peer shrink-0 group-hover:text-primary text-secondary-dark">
              <RiRefreshLine size={24} />
            </span>
          </a>
          
        </div>

        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
          
          {/* filter */}
          <div className='flex gap-5 px-10 py-2'>
            <button
              className={`w-full p-1 rounded-md ${searchParams.get("genre") === "pop" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-400"}`}
              onClick={() => handleGenreFilter("pop")}
            >
              Pop
            </button>

            <button
              className={`w-full p-1 rounded-md ${searchParams.get("genre") === "hiphop" ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-400"}`}
              onClick={() => handleGenreFilter("hiphop")}
            >
              HipHop
            </button>

            <button
              className="px-3 p-1 rounded-md bg-gray-800 text-green-400"
              onClick={clearGenreFilter}
            >
              X
            </button>
          </div>


        <div className="relative pl-1 my-2 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full font-medium">
            
            {loading && 
            <div className="flex justify-center items-center h-64">
              <Triangle
                visible={true}
                height="150"
                width="150"
                color="#4fa94d"
                ariaLabel="triangle-loading"
              />
              </div>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && data.map((song, index) => (
              <div key={index} className="mb-2">
                <NavLink
                  to={`/${song._id}`}
                  className={({ isActive }) =>
                    `select-none flex items-center px-4 py-2 cursor-pointer my-2 rounded-[.95rem] ${isActive ? 'active-class text-black' : ''}`
                  }
                >
                  <div className="flex capitalize items-center flex-grow text-[1.15rem] hover:text-green-500">
                    {song.title}
                  </div>
                  <span className='text-xs text-gray-500 underline capitalize'>By {song?.artist}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default memo(Sidebar);
