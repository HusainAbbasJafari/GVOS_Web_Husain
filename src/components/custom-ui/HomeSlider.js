import { getImageSrc, handleMobileResize, NumberDisplay } from "@/utility/general";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LazyImage from "../LazyImage";
import { Button } from "../ui/button";

export const HomeSlider = ({ item, isHome, isVideo, styleType, totalProperties, totalDevelopments }) => {
    const t = useTranslations('HomePage');

    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const cleanup = handleMobileResize(setIsMobile);
        return cleanup;
    }, []);


    return (
        <div className={`relative w-full flex items-center overflow-hidden ${styleType === 2 ? "min-h-[450px] h-[calc(100vh-222px)]" : 'min-h-[450px] h-[calc(100vh-122px)]'}`}>
            <div className={`z-1 grow ${(styleType === 2 && !isMobile) ? "px-1" : ''}`}>
                {isVideo ?
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full object-cover ${styleType === 2 ? "min-h-[450px] h-[calc(100vh-222px)]" : 'min-h-[450px] h-[calc(100vh-122px)]'}`}
                    >
                        <source src={getImageSrc(isHome ? item.image : item)} type="video/mp4" />
                    </video>
                    :
                    <LazyImage
                        src={isHome ? item.image : item}
                        alt="hero-image"
                        className={`w-full object-cover ${styleType === 2 ? "min-h-[450px] h-[calc(100vh-222px)]" : 'min-h-[450px] h-[calc(100vh-122px)]'}`}
                    />
                }
            </div>

            {isHome && (
                <>
                    <div className="z-2 absolute inset-0 flex flex-col items-center justify-center text-center bg-black/25 text-white w-full">
                        <div className="px-2 md:px-4 4xl:px-4 text-center mx-auto max-w-6xl 4xl:max-w-4xl pb-14 h-full flex flex-col justify-between">
                            <div></div>
                            <div data-aos="zoom-in" data-aos-duration="800">
                                <p className="text-lg md:text-xl xl:text-[23px] line-clamp-5 overflow-hidden mb-3 font-normal">
                                    {t.rich('bannerText1', {
                                        font: (chunks) => <span className="font-alt">{chunks}</span>,
                                        font1: (chunks) => <span className="font-alt">{chunks}</span>,
                                        font2: (chunks) => <span className="font-alt">{chunks}</span>
                                    })}
                                </p>

                                <p className="lg:px-4 text-lg md:text-xl xl:text-[23px] line-clamp-5 overflow-hidden mb-3 lg:mb-5 font-normal">
                                    {t("bannerText2")}
                                </p>

                                <div>
                                </div>

                                <div data-aos="zoom-in" data-aos-duration="1000" >
                                    <Button component="a" size="lg" onClick={() => router.push("/search-properties")} className="border border-primary hover:border-primary !rounded-md !text-base !bg-black/40 hover:!bg-primary">
                                        {t("startSearch")}
                                    </Button>
                                </div>

                                <p className="lg:px-4 text-sm lg:text-md line-clamp-5 overflow-hidden font-normal my-3 lg:my-5">
                                    {t("subDesc")}
                                </p>
                            </div>

                            {totalProperties ? (
                                <div className='ms-auto flex justify-end mb-20 sm:mb-0' data-aos="zoom-in" data-aos-duration="1000" data-aos-offset="100" data-aos-delay="100">
                                    <div className="px-3 py-3 4xl:py-6 lg:px-4 border border-white/15 bg-white/5 text-center flex flex-col items-center justify-center max-w-3xs shadow-lg backdrop-blur-sm">
                                        <p className="text-white max-w-[180px] leading-relaxed text-xs md:text-sm">
                                            <span >
                                                {t.rich("portfolioSummary", {
                                                    b1: (chunks) => <span className="font-bold"><NumberDisplay value={totalProperties} /> {t("propertiesCount", { count: totalProperties })}</span>,
                                                    b2: (chunks) => <span className="font-bold"><NumberDisplay value={totalDevelopments} /></span>,
                                                    b3: (chunks) => <span className="font-bold">{t("developmentsCount", { count: totalDevelopments })}</span>,
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ) : <div></div>}
                        </div>
                    </div>

                    <div className="z-3 absolute bottom-0 w-full bg-white/40 backdrop-blur-xs text-black py-3 flex items-center justify-center">
                        <div className="container text-center mx-auto">
                            <p className="text-xs sm:text-sm md:text-base">
                                {t("bannerDesc")}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}