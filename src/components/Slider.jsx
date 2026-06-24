import { useState } from 'react'
import "./style/Slider.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';

export default function Slider() {
    const swiperRef = useRef(null);
    const paginationRef = useRef(null);

    return (
        <>
            <Swiper
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{ clickable: true, el: '.slider-pagination' }}
                onSwiper={(swiper) => swiperRef.current = swiper}
                loop={true}
            >
                <SwiperSlide>
                    <img src="/slide.png" className="slide" alt="Slide 1" />
                    <img src="/slide_mobile.png" className="slide slide--mobile" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slide.png" className="slide" alt="Slide 2" />
                    <img src="/slide_mobile.png" className="slide slide--mobile" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slide.png" className="slide" alt="Slide 3" />
                    <img src="/slide_mobile.png" className="slide slide--mobile" />
                </SwiperSlide>
                <button className="swiper-button-prev swiper-button swiper-button--desktop" onClick={() => swiperRef.current.slidePrev()}><img src="/arrow_left.svg" alt="Previous" /></button>
                <button className="swiper-button-next swiper-button swiper-button--desktop" onClick={() => swiperRef.current.slideNext()}><img src="/arrow_right.svg" alt="Next" /></button>
            </Swiper>

            <div className="slider-bottom">
                <button className="swiper-button swiper-button--mobile" onClick={() => swiperRef.current.slidePrev()}>
                    <img src="/arrow_left.svg" alt="Previous" />
                </button>
                <div ref={paginationRef} className="slider-pagination"></div>
                <button className="swiper-button swiper-button--mobile" onClick={() => swiperRef.current.slideNext()}>
                    <img src="/arrow_right.svg" alt="Next" />
                </button>
            </div>
        </>
    );
}
