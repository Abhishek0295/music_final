import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
        className="absolute h-full w-full object-cover"
        alt="Background"
      />
       <video
        src="/laugh.mp4" // Path to video in the public folder
        className="absolute bottom-0 left-0 w-full h-auto"
        autoPlay
        loop
        muted
      ></video>
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
        
          <h1 className="font-extrabold text-5xl text-center text-zinc-100 leading-tight mt-4">
            You are all alone here
          </h1>
          <button
            onClick={handleGoBack}
            className="mt-10 px-4 py-2 bg-white text-indigo-900 font-bold rounded z-30">
            Back
          </button>
          <p className="font-extrabold text-8xl my-20 text-white animate-bounce">
            404
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default NotFound;
