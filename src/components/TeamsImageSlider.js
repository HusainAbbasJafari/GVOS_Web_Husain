'use client'

import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import LazyImage from './LazyImage';


export default function TeamsImageSlide({ images }) {
    const [isReady, setIsReady] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setIsReady(true), 100);
    }, []);

    const settings = {
        className: "slider",
        dots: false,
        infinite: false,
        speed: 500,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        arrows: true,
        swipe: true,
        touchMove: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // console.log(images, "images")

    return (
        <>
            <div className='slider bg-transparent relative custom_slider items_align_left'>
                {isReady && (
                    <>
                        <Slider ref={sliderRef} {...settings}>
                            {images && images.length > 0 &&
                                images.map((item, index) => (
                                    <div className='px-2' key={index}>
                                        <div className="aspect-[5/4] overflow-hidden">
                                            <LazyImage src={`/images/static/${item.src}`} alt="Team" className="object-cover h-full w-full" />
                                        </div>
                                    </div>
                                ))}
                        </Slider>

                        {/* <SlickButton leftClass="left-[-10px]" rightClass="right-[-10px]" className="hidden md:flex min-w-10 w-10" sliderRef={sliderRef} iconSize={18} type="type_2" /> */}
                    </>
                )}
            </div>
        </>
    );
}