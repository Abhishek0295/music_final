import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FaSpotify } from "react-icons/fa";
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import * as Yup from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const RightBar = () => {
  const [file, setFile] = useState(null);
  const [previewSong, setPreviewSong] = useState(null);
  const [user, setUser] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const initialValue = {
    title: "",
    artist: "",
    album: "",
    genre: "",
    filepath: ""
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("Song title is required"),
    artist: Yup.string().required("Artist name is required"),
    album: Yup.string().required("Album name is required"),
    genre: Yup.string().required("Genre is required"),
    filepath: Yup.string().required("Genre is required"),

  });

  const{ values, errors, touched, handleSubmit, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: initialValue,

    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('artist', values.artist);
      formData.append('album', values.album);
      formData.append('genre', values.genre);
      formData.append('song', file);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // console.log(response.data);
        toast.success("song added")
        resetForm();
        location.reload()
        setFile(null);
        setPreviewSong(null);
      } catch (err) {
        console.error(err);
        toast.error(err.message)
      }
    },
  });



     // DRAG AND DROP -----------------------------
     const handleDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      setFieldValue('filepath', file.name);
  
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSong(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      accept: {
        'audio/*': ['.mp3', '.wav', '.webm', '.flac', '.m4a'],
      }
    });



//user 
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem("id");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`);
        setUser(res.data.user);
      } catch (err) {
        toast.error('Failed to fetch user data');
        setError(err);
      }
    };


    const handleClick = () => {
      setIsDropdownOpen(prevState => !prevState);
    };
  
    const handleClickOutside = useCallback((event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }, []);
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);


    useEffect(() => {
      fetchUser();
    }, []);

    const handleLogout = () => {
      localStorage.clear();
      navigate('/login');
      toast.success('User logged out successfully!');
    };

  return (
    <div className="container flex flex-col mx-auto float-right bg-black select-none mb-32">
      <aside className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 right-0 bg-black border-l border-l-dashed border-l-neutral-200" id="sidenav-main">

      <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center mr-5">
            <div className="mr-5">
              <img className="w-[40px] h-[40px] rounded-[.95rem]" src={`${import.meta.env.VITE_BASE_URL}/${user?.photo}`} alt="avatar" />
            </div>
            <div className="mr-2 relative" ref={dropdownRef}>
              <a href="#" onClick={handleClick} className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-100/90 text-secondary-inverse">
                {user.firstName}
              </a>
              <span className="text-secondary-dark dark:text-stone-300 font-medium block text-[0.85rem]">Premium</span>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-10">
                  <ul>
                    <Link to={"/profile"}>
                      <li className="px-4 py-2 hover:bg-gray-200 hover:rounded-lg cursor-pointer hover:text-green-500 hover:font-semibold">Profile</li>
                    </Link>
                    <Link to={"/setting"}>
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:text-green-500 hover:font-semibold">Settings</li>
                    </Link>
                    <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-300 hover:rounded-lg cursor-pointer hover:text-red-500 hover:font-semibold">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
        </div>

      <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center mr-5">
            <div className="mr-5">
              <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                <FaSpotify className=" -rotate-45 w-[30px] h-[30px] shrink-0 inline-block rounded-[.95rem] text-green-500"/>
              </div>
            </div>
            <div className="mr-2">
              <a href="#" className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-100/90 text-secondary-inverse">Add Songs</a>
              <span className="text-secondary-dark dark:text-stone-300 font-medium block text-[0.85rem]">Favourites</span>
            </div>
          </div>
        </div>

        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="relative pl-3 my-5 overflow-y-scroll no-scrollbar">
          <div className="flex flex-col w-full font-medium">

            <form className="mt-1 space-y-3 mr-2" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-400 tracking-wide">Song Title</label>
              <input
                className="text-base p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                type="text"
                name="title"
                placeholder="Song Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title ? <div className="text-red-500 text-sm">{errors.title}</div> : null}
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-400 tracking-wide">Artist</label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type="text"
                name="artist"
                placeholder="Artist"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.artist}
              />
              {errors.artist && touched.artist ? <div className="text-red-500 text-sm">{errors.artist}</div> : null}
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-400 tracking-wide">Album Name</label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type="text"
                name="album"
                placeholder="Album"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.album}
              />
              {errors.album && touched.album ? <div className="text-red-500 text-sm">{errors.album}</div> : null}
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-400 tracking-wide">Genre</label>
              <input
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type="text"
                name="genre"
                placeholder="Genre"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.genre}
              />
              {errors.genre && touched.genre ? <div className="text-red-500 text-sm">{errors.genre}</div> : null}
            </div>


            {previewSong ? (
              <div className="flex flex-col rounded-lg border-4 border-dashed w-full h-72 p-10 group text-center ">
                <img
                  src={previewSong}
                  alt="Preview"
                  className="max-w-full max-h-40 mb-4"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewSong(null);
                    setFile(null);
                    setFieldValue('photo', null);
                  }}
                  className="mb-4 bg-red-500 text-white p-2 rounded" >
                  Remove Song
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 space-y-2 ">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                <div
                  {...getRootProps()}
                  className="flex bg-white overflow-hidden items-center justify-center w-full rounded-lg border-4 border-dashed h-60 p-10 group text-center"
                >
                  <input {...getInputProps()} />
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="Upload illustration" />
                    </div>
                    <p className="pointer-none text-gray-500">
                      <span className="text-sm">Drag and drop</span> Song here <br /> or <a href="#" className="text-blue-600 hover:underline">select a file</a> from your computer
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-300">
              <span>File type: songs mp3</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                Upload
              </button>
            </div>
          </form>

          </div>
        </div>
      </aside>
    </div>
  );
}

export default memo(RightBar);
