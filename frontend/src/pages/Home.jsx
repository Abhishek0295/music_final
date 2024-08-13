import React from 'react';
import Hero from "../components/hero/Hero"
import Sidebar from "../components/sidebar/Sidebar";
import RightBar from "../components/sidebar/RightBar";
import Footer from "../components/footer/Footer"


const Home = () => {
  return (
    <>
      <div className='h-[100vh] bg-black'>
        <div className='w-full h-[90%] flex'>
          <div id='sidebar' className='w-1/4 h-[85%] '>
            <Sidebar />
          </div>
          <div id="player" className='w-2/4 h-full'>
          
            <Hero />
            {/* <Player/> */}
          </div>
          <div id="rightbar" className='w-1/4 h-[85%] '>
            <RightBar />
          </div>
        </div>
        <div className='h-[10%] w-full'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
