import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SliderButton from './SliderButton';
import placeholderImage from "@/public/images/placeholder.png";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { handleMobileResize } from '@/utility/general';


export default function NewSlider({ items, title }) {

    const t = useTranslations('HomePage');
    const tg = useTranslations('General');
    const tp = useTranslations('Property');

    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [active2, setActive2] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const scrollAmount = 280;

    useEffect(() => {
        const cleanup = handleMobileResize(setIsMobile);
        return cleanup;
    }, []);

    const updateSliderEdgeStatus = () => {
        const container = containerRef.current;
        if (!container) return;

        const { scrollLeft, clientWidth, scrollWidth } = container;
        setIsAtStart(scrollLeft <= 5);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        updateSliderEdgeStatus();
        container.addEventListener('scroll', updateSliderEdgeStatus);
        return () => container.removeEventListener('scroll', updateSliderEdgeStatus);
    }, []);

    const handleNext = () => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const handlePrev = () => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    const getPropertyType = (item) => {
        return item.type === 'new home' ? tg('newBuild') : tg('propertyForSale');
    };

    const handleSliderActive = (index) => {
        setTimeout(() => {
            setActive2(index);
        }, 300);
    };

    return (
        <div className='property_slider'>
            <div className="container">
                <div className='flex justify-between mb-4'>
                    <h4 className='text-dynamic mb-0 text-xl wavy-text'>{title}</h4>
                    <div className='flex gap-3 items-center'>
                        <SliderButton
                            className="flex min-w-8 w-8"
                            iconSize={16}
                            type="type_1"
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                            disablePrev={isAtStart}
                            disableNext={isAtEnd}
                        />
                    </div>
                </div>
            </div>

            {/* <div className={`relative transition-all duration-300 w-full ${(activeIndex === 0 || isAtStart) ? "ps-5" : ""} ${(activeIndex === (items && items.length - 1) || isAtEnd) ? "pe-5" : ""}`}> */}
            <div className={`relative transition-all duration-300 w-full px-5`}>
                <div
                    ref={containerRef}
                    className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar py-4"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {items.map((item, index) => {
                        const isActive = activeIndex === index;
                        let isActive2 = false
                        setTimeout(() => {
                            isActive2 = activeIndex === index;
                        }, 300);
                        return (
                            <motion.div
                                key={item.id}
                                onMouseEnter={() => { setActiveIndex(index); handleSliderActive(index) }}
                                className="new_slider group flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 relative text-white"
                                style={{
                                    width: isActive ? (isMobile ? 340 : 500) : 280,
                                    height: 280,
                                    scrollSnapAlign: 'start',
                                    backgroundImage: `url(${item.master_image || placeholderImage.src})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                    <div className={`z-[2] flex items-end absolute top-0 left-0 h-full w-full`}>
                                        <div className={`flex gap-3 justify-between items-end text-white !h-full w-full pb-3 overflow-hidden ${isActive ? 'bg-transparent' : 'bg-black/40'} group-hover:bg-transparent transition-all duration-300`}>

                                            {!isActive && (
                                                <span className={`z-[3] absolute top-2 right-2 ${item.type === 'new home'
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-100 text-primary'
                                                    } text-sm font-normal px-3 py-1 rounded-2xl`}
                                                >
                                                    {getPropertyType(item)}
                                                </span>
                                            )}

                                            {(!isActive || (isActive && !isMobile)) && (
                                                <div className={`p-2 flex-wrap transsition-all duration-300 delay-200 w-fit ${(active2 === index) ? 'max-w-[calc(100%-270px)] bg-black/65' : 'grow'}`}>
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
                                            )}

                                            {isActive && (
                                                <div className="absolute top-0 bottom-0 right-3 py-3 bg-black/65 w-[250px] h-full flex flex-col justify-between items-center gap-3">
                                                    {item.type === 'new home' ? (
                                                        <div className="w-full grow flex flex-col justify-between text-white text-center text-xs gap-2 pe-1">
                                                            <div className="max-h-[170px] overflow-y-auto pe-1">
                                                                {(item?.properties)?.map((property) => (
                                                                    <div className="flex" key={property?.id}>
                                                                        <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-1">
                                                                            <div className='my-1'>
                                                                                <p className='mb-0 text-[.8rem]'>{property?.bedroom} {tg("from")}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-1">
                                                                            <div className='my-1'>
                                                                                <p className='text-[.8rem] font-semibold mb-0'>{property?.property_price}</p>
                                                                                {property?.property_price_converted && property?.property_price != property?.property_price_converted && (
                                                                                    <p className='text-xs font-light text-gray-300'>{property?.property_price_converted}</p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                <div className="flex">
                                                                    {/* <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-1">
                                                                        {(item?.properties)?.map((property) => (
                                                                            <div className='h-[33.05px] my-1' key={property?.id}>
                                                                                <p className='mb-0 text-[.8rem]'>{property?.bedroom} {tg("from")}</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                    <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-1">
                                                                        {(item?.properties)?.map((property) => (
                                                                            <div className='my-1 h-[33.05px]' key={property?.id}>
                                                                                <p className='text-[.8rem] font-semibold mb-0'>{property?.property_price}</p>
                                                                                {property?.property_price_converted && property?.property_price != property?.property_price_converted && (
                                                                                    <p className='text-xs font-light text-gray-300'>{property?.property_price_converted}</p>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div> */}
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
                                                            <div className="max-h-[170px] overflow-y-auto pe-2">
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

                                                                {item?.property_price_converted && item?.property_price != item?.property_price_converted && (
                                                                    <p className='text-xs font-light text-gray-300'>{item.property_price_converted}</p>
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
                                                        className="mx-3 text-nowrap border border-[var(--primary)] hover:text-white hover:bg-[var(--primary)] transition-colors px-5 py-2 text-[12px] font-semibold rounded-full"
                                                    >
                                                        {t('viewDetails')}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
