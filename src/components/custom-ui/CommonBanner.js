'use client';

import logoSm from "@/public/images/logo_sm.png";
import { getImageSrc } from '@/utility/general';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from "react";
import { BsArrowDown, BsArrowRight } from 'react-icons/bs';
import LazyImage from '../LazyImage';
import { Button } from "../ui/button";
import GetCallBackForm from "./GetCallBackForm";

export default function CommonBanner({ title, bannerImage, desc, desc2, avatars, titleWidth, paraWidth, type, isCareers = false, isContactUs = false, isCallBack = false, count = 0, callBackAction = null, isHideSurname = false, isVideo = false, isAreaGuide = false, areaGuideName = '' }) {
    const tg = useTranslations('General');
    const [getQuoteDialog, setGetQuoteDialog] = useState(false);

    return (
        <section className="banner_secton">
            <div className="w-full min-h-[450px] h-[calc(100vh-122px)] max-h-[920px] overflow-hidden relative">

                {isVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full h-full object-cover object-bottom`}
                    >
                        <source src={bannerImage} type="video/mp4" />
                    </video>
                ) : (
                    <LazyImage src={getImageSrc(bannerImage)} alt="property" className="w-full h-full object-cover object-bottom" />
                )}

                <div className="absolute w-full h-full top-0 left-0 bg-black/70 flex">
                    <div className="container pt-6 lg:pt-14 pb-6 flex">
                        <div className={`flex flex-col ${isAreaGuide ? "justify-center" : "justify-between"} grow relative`}>
                            <div className='mb-4 lg:mb-10' data-aos="zoom-in" data-aos-duration="1000" data-aos-offset="100" data-aos-delay="100">
                                <h4
                                    className={`${isAreaGuide && "text-center mx-auto"} text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal mb-2 lh-min ${titleWidth ? titleWidth : 'max-w-xs'}`}>
                                    {title}
                                    {isAreaGuide && areaGuideName && (
                                        <span className='text-primary font-alt capitalize flex items-center justify-center'>
                                            {tg('the')} {areaGuideName}
                                        </span>
                                    )}
                                </h4>
                            </div>

                            {!isAreaGuide && (
                                <div className='flex justify-between items-center gap-6 md:gap-10 flex-wrap sm:max-w-[calc(100%-216px)] mb-10 sm:mb-0'>
                                    <div className={`${paraWidth ? paraWidth : 'max-w-xl'}`}>
                                        <p className='text-white mb-5'>
                                            {desc}
                                        </p>
                                        {isCallBack ? (
                                            <Button variant={"outline"} onClick={() => setGetQuoteDialog(true)} className="rounded-md font-semibold group text-white bg-black/50 border border-primary hover:bg-primary w-fit flex items-center gap-2 px-4 py-2 transition-all duration-200 ease-in-out">
                                                {tg('getCallBack')}
                                            </Button>
                                        ) : (
                                            <Link href={`${isCareers ? '#currentOpenings' : isContactUs ? '#contactForm' : '/contact-us'}`} className="rounded-md font-semibold group text-white bg-black/50 border border-primary hover:bg-primary w-fit flex items-center gap-2 px-4 py-2 transition-all duration-200 ease-in-out">
                                                {tg("contactUs")}
                                                <BsArrowRight
                                                    size={20}
                                                    className="transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                                                />
                                            </Link>
                                        )}
                                    </div>

                                    {type === 2 && (
                                        <div className='flex max-w-44'>
                                            <img src={logoSm.src} />
                                        </div>
                                    )}

                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                                        <Link href="#arrowScrollSection" className="text-white p-3 border rounded-full flex items-center justify-center arrow-bounce hover:border-primary hover:bg-primary transition-all duration-300">
                                            <BsArrowDown size={22} />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {type === 1 && (
                                <div className='hidden sm:block absolute bottom-0 right-0 w-[206px]' data-aos="zoom-in" data-aos-duration="1000" data-aos-offset="100" data-aos-delay="100">
                                    <div className="px-3 py-4 lg:px-4 lg:py-6 border border-white/15 bg-white/5 text-center flex flex-col items-center justify-center mx-auto shadow-lg backdrop-blur-sm">
                                        {/* Avatar Group */}
                                        {/* <div className="flex -space-x-4 mb-4 lg:mb-6">
                                            {avatars.map((user, index) => (
                                                <Avatar key={index} className="w-12 h-12 border-2 border-white">
                                                    <AvatarImage src={user.src} />
                                                    <AvatarFallback>{user.fallback}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div> */}

                                        {/* Number */}
                                        <h2 className="text-4xl font-bold text-white mb-2">{count || 0}+</h2>

                                        {/* Description with underline links */}
                                        <p className="text-white max-w-[180px] leading-relaxed">
                                            <span >
                                                {desc2}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} isHideSurname={isHideSurname} />
            </div>
        </section>
    );
}