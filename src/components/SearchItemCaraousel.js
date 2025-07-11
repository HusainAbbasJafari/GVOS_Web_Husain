'use client'

import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import LocationItem from './LocationItem';
import SlickButton from './custom-ui/SlickButton';

export default function SearchItemCaraousel({ items }) {
    const [isReady, setIsReady] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setIsReady(true), 100);
    }, []);

    const settings = {
        className: "slider",
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        arrows: false,
        swipe: true,
        touchMove: true,
    };

    // Function to chunk array into groups of 10
    const chunkArray = (array, chunkSize) => {
        const results = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            results.push(array.slice(i, i + chunkSize));
        }
        return results;
    };

    // Split items into chunks of 10 when more than 10 items
    const itemChunks = items && items.length > 10 ? chunkArray(items, 10) : [items];

    return (
        <>
            {items && items.length > 10 ? (
                <div className='slider bg-transparent relative'>
                    {isReady && (
                        <>
                            <Slider ref={sliderRef} {...settings}>
                                {itemChunks.map((chunk, chunkIndex) => (
                                    <div key={chunkIndex}>
                                        <div className="grid grid-cols-2 gap-3 lg:gap-5">
                                            {chunk.map((item) => (
                                                <div className="col-span-1 flex" key={item.id}>
                                                    <LocationItem item={item} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                            <div className='flex justify-end items-center gap-3 mt-3'>
                                <SlickButton className="flex min-w-6 w-6" sliderRef={sliderRef} type="type_1" />
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 lg:gap-5">
                    {items && items.map((item) => (
                        <div className="col-span-1 flex" key={item.id}>
                            <LocationItem item={item} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}