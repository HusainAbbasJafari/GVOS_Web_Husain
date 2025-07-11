'use client'

import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { useGlobalContext } from '@/app/context/GlobalContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialSlider({ items }) {

    const { language } = useGlobalContext();
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

    return (
        <>
            <div className='slider bg-transparent relative testimonial_slider custom_slider'>
                {isReady && (
                    <>
                        <Slider ref={sliderRef} {...settings}>
                            {items && items.length > 0 &&
                                items.map((item, index) => (
                                    <div className='px-2' key={index}>
                                        <div className="border p-3 xl:p-4 h-full flex flex-col justify-between gap-6">

                                            <p className="mb-0">
                                                {language === 'en' ? item.commentEn : item.commentFr}
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    key={index}
                                                    className="w-14 h-14 border-2 border-white"
                                                >
                                                    <AvatarImage src={item.src} />
                                                    <AvatarFallback>{item.fallback}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="text-lg font-semibold">{item.name}</h4>
                                                    <p className="text-gray-500 text-sm">
                                                        {item.designation}
                                                    </p>
                                                </div>
                                            </div>
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