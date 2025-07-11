'use client'
import placeholderImage from "@/public/images/placeholder.png";
import { useTranslations } from "next-intl";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SlickButton from './custom-ui/SlickButton';
import LazyImage from "./LazyImage";

export default function HomeCaraousel({ items, title }) {
    const sliderRef = useRef(null);
    const t = useTranslations('HomePage');
    const tg = useTranslations('General');
    const tp = useTranslations('Property');
    
    const [activeIndex, setActiveIndex] = useState(1);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(isTouch);

        // Add class to body
        if (isTouch) {
            document.body.classList.add('is_touch_device');
        } else {
            document.body.classList.remove('is_touch_device');
        }
    }, []);

    // Function to determine property type
    const getPropertyType = (item) => {
        return item.type === 'new home' ? tg('newBuild') : tg('propertyForSale');
    };

    const settings = {
        className: "slider",
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "100px",
        variableWidth: true,
        arrows: false,
        swipe: isTouchDevice,       // Enable swipe only on touch devices
        touchMove: isTouchDevice,   // Enable touch move only on touch devices
    };

    return (
        <div className='slider bg-transparent relative home_slick'>
            <div className="container">
                <div className='flex justify-between mb-4'>
                    <h4 className='text-white mb-0 text-xl wavy-text'>
                        {title}
                    </h4>
                    <div className='flex gap-3 items-center'>
                        <SlickButton className="flex min-w-8 w-8" sliderRef={sliderRef} iconSize={16} type="type_1" />
                    </div>
                </div>
            </div>

            <Slider ref={sliderRef} {...settings}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`px-2 slick_item_wrap pb-5 ${activeIndex === (index + 1) ? 'is_expanded' : ''}`}
                        onClick={() => { setActiveIndex(index + 1) }}
                    // onMouseLeave={() => {setActiveIndex(1)}}
                    >
                        <div
                            style={{
                                width: "280px",
                                transition: "width 0.4s ease-in-out, transform 0.4s ease-in-out",
                                overflow: "hidden"
                            }}
                            className={`slick_item group shadow-[6px_6px_13px_0px_rgba(0,0,0,0.75)] bg-transparent rounded-2xl min-w-[280px] h-[280px] transform overflow-hidden`}
                        >
                            <LazyImage
                                src={item.master_image || placeholderImage.src}
                                alt={item.name || 'Property image'}
                                className="z-[1] w-full h-full object-cover filter group-hover:blur-none transition-all duration-500"
                            />

                            <div className="z-[2] flex items-end absolute top-0 left-0 h-full w-full bg-black/25 group-hover:bg-transparent">
                                <div className='flex p-4 slide_details_1 w-full'>
                                    <span className={`z-[3] absolute top-2 right-2 ${item.type === 'new home'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-primary'
                                        } text-sm font-normal px-3 py-1 rounded-2xl`}
                                    >
                                        {getPropertyType(item)}
                                    </span>

                                    <div>
                                        {(item.geo_level_1) && (
                                            <h5 className='text-base lh-min text-white'>
                                                {item.geo_level_1}
                                            </h5>
                                        )}

                                        {(item.geo_level_2) && (
                                            <p className='text-xs text-gray-200 lh-min'>
                                                {item.geo_level_2}
                                            </p>
                                        )}

                                        {(item.geo_level_3) && (
                                            <p className='text-xs text-gray-200 lh-min'>
                                                {item.geo_level_3}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className='gap-3 justify-between items-end text-white slide_details !h-full group-hover:bg-black/15 p-4 w-full overflow-hidden'>
                                    <div className='flex-wrap max-w-[calc(100%-210px)]'>
                                        {(item.geo_level_1) && (
                                            <h5 className='text-base lh-min text-white'>
                                                {item.geo_level_1}
                                            </h5>
                                        )}

                                        {(item.geo_level_2) && (
                                            <p className='text-xs text-gray-200 lh-min'>
                                                {item.geo_level_2}
                                            </p>
                                        )}

                                        {(item.geo_level_3) && (
                                            <p className='text-xs text-gray-200 lh-min'>
                                                {item.geo_level_3}
                                            </p>
                                        )}
                                    </div>

                                    <div className="absolute top-0 bottom-0 right-3 py-3 bg-black/40 w-[250px] h-full flex flex-col justify-between items-center gap-3">

                                        {item.type === 'new home' ? (
                                            <div className="w-full grow flex flex-col justify-between text-white text-center text-xs gap-2">
                                                <div className="max-h-[160px] overflow-y-auto pe-2">
                                                    <div className="flex">
                                                        <div className="w-1/2 max-w-1/2 space-y-1 text-xs text-right mr-1">
                                                            {(item?.properties)?.map((property) => (
                                                                <p key={property?.id}>{property?.bedroom} {tg("from")}</p>
                                                            ))}
                                                        </div>

                                                        <div className="w-1/2 max-w-1/2 text-left space-y-1 font-semibold text-xs ml-1">
                                                            {(item?.properties)?.map((property) => (
                                                                <p key={property?.id}>{property?.property_price}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {item.delivery_date && (
                                                    <p className="px-2">
                                                        <span>{tg("deliveryFrom")}</span>
                                                        <span className="block font-bold">{item.delivery_date}</span>
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-full grow flex flex-col justify-between text-white text-center text-xs gap-2">
                                                <div className="max-h-[160px] overflow-y-auto pe-2">
                                                    {item.bedroom && (
                                                        <p>
                                                            {item.bedroom}
                                                        </p>
                                                    )}

                                                    {item.no_of_bathroom && (
                                                        <p>
                                                            {item.no_of_bathroom} {tp("bathroom", { count: item.no_of_bathroom })}
                                                        </p>
                                                    )}

                                                    {item.outside_space && (
                                                        <p>
                                                            {item.outside_space} {tg("outsideSpace")}
                                                        </p>
                                                    )}

                                                    {item.property_price && (
                                                        <h4 className="text-base mt-2 font-bold">
                                                            {item.property_price}
                                                        </h4>
                                                    )}
                                                </div>

                                                {item.delivery_date && (
                                                    <p className="px-2">
                                                        <span>{tg("OccupationFrom")}</span>
                                                        <span className="block font-bold">{item.delivery_date}</span>
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        <Link
                                            target="_blank" href={item.type === 'new home' ? `/properties/new-homes/${item.uuid}` : `/properties/properties-for-sale/${item.uuid}`}
                                            className="mx-3 text-nowrap border border-[var(--primary)] hover:text-white hover:bg-[var(--primary)] transition-colors px-5 py-2 text-[13px] font-semibold rounded-full"
                                        >
                                            {t('viewDetails')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}