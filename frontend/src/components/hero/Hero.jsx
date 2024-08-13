import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/autoplay';

import './swiper.css';
import { EffectCreative, Autoplay } from 'swiper/modules';

const Hero = () => {
  return (
    <>
    <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            origin: 'left center',
            translate: ['-5%', 0, -200],
            rotate: [0, 100, 0],
          },
          next: {
            origin: 'right center',
            translate: ['5%', 0, -200],
            rotate: [0, -100, 0],
          },
        }}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectCreative, Autoplay]}
        className="mySwiper6"
      >
        <SwiperSlide style={{ background: 'linear-gradient(to right, #0000, #1B4091)' }}>
           <h1 className='text-5xl font-sans'>Top Trending India | Espresso</h1>
           <img className='mr-2 rounded-2xl' src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da844b50a1986bfcad0fc1df40c4" alt="" />
        </SwiperSlide>
        <SwiperSlide style={{ background: 'linear-gradient(to right, #0000, #FE5B48)' }}>
            <h1 className='text-5xl font-sans'>Top Tracks of 2024 | <br /> UK HITS</h1>
            <img className='mr-2 rounded-2xl' src="https://i.scdn.co/image/ab67706f000000028f63e4e8a88fd7a35aba37a8" alt="" />
        </SwiperSlide>
        <SwiperSlide style={{ background: 'linear-gradient(to right, #184057, #0000)' }}>
            <img className='ml-2 rounded-2xl' src="https://i.scdn.co/image/ab67706f00000002bd0151f6679805870586c227" alt="" />
            <h1 className='text-5xl font-sans'>Trending Now In India</h1>
        </SwiperSlide>
        <SwiperSlide style={{ background: 'linear-gradient(to right, #000, #FA74CF)' }}>
            <h1 className='text-5xl font-sans'>New Arrivals | Wallice</h1>
            <img className='mr-2 rounded-2xl w-[50%] scale-75' src="https://storage.googleapis.com/pr-newsroom-wp/1/2021/05/Spotify_FreshFinds_4x5_Wallice-e1621974152696.png" alt="" />
        </SwiperSlide>

      </Swiper>
    </>
  )
}

export default Hero