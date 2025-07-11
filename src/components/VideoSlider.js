'use client'

import { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { imageErrorHandler } from "@/utility/general"
import SlickButton from "./custom-ui/SlickButton"

export default function VideoSlider({ videos }) {
    const sliderRef = useRef(null)
    const [loadedVideos, setLoadedVideos] = useState(0)

    useEffect(() => {
        if (loadedVideos === videos?.length && sliderRef.current) {
            sliderRef.current.slickGoTo(0)
        }
    }, [loadedVideos, videos])

    const NextArrow = (props) => {
        const { className, style, onClick } = props
        return (
            <SlickButton 
                direction="next"
                sliderRef={sliderRef}
                className="type_2 p-2"
                style={style}
                onClick={onClick}
                iconSize={14}
                type="type_2"
            />
        )
    }

    const PrevArrow = (props) => {
        const { className, style, onClick } = props
        return (
            <SlickButton 
                direction="prev"
                sliderRef={sliderRef}
                className="type_2 p-2"
                style={style}
                onClick={onClick}
                iconSize={14}
                type="type_2"
            />
        )
    }


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        swipe: true,
        touchMove: true,
        adaptiveHeight: true,
        appendDots: dots => (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <ul className="m-0 p-0 flex gap-2">{dots}</ul>
            </div>
        ),
        afterChange: (current) => {
            document.querySelectorAll('.video-slider video').forEach((video, index) => {
                if (index !== current) video.pause()
            })
        }
    }

    if (!videos?.length) {
        return (
            <div className="w-full aspect-[5/4] bg-gray-100 flex items-center justify-center">
                <p>No videos available</p>
            </div>
        )
    }

    return (
        <div className="video-slider-container w-full relative aspect-[5/4]">
            <Slider ref={sliderRef} {...settings}>
                {videos.map((video, index) => (
                    <div key={index} className="aspect-[5/4]">
                        <video
                            src={video?.url}
                            className="aspect-[5/4] w-full h-full object-cover transition-transform duration-300"
                            controls
                            onError={imageErrorHandler}
                            onLoadedData={() => setLoadedVideos(prev => prev + 1)}
                            playsInline
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
}