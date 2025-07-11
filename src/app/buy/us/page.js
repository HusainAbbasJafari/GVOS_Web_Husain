"use client"
import CallToAction from "@/components/CallToAction";
import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import { Button } from "@/components/ui/button";
import bannerImage from "@/public/images/buy/banner3.jpg";
import { useTranslations } from "next-intl";
import { BsArrowRight, BsCheckCircle } from "react-icons/bs";
import { useState } from "react";
import GetCallBackForm from "@/components/custom-ui/GetCallBackForm";

export default function BuysUs() {
    const t = useTranslations('Buy1.third');
    const tg = useTranslations('General');

    const bannerTitle = t.rich('bannerTitle', {
        span: (chunks) => <span className="font-alt flex">{chunks}</span>
    });

    const bannerDesc = t.rich('bannerDesc', {
        bold1: (chunks) => <span className="font-medium">{chunks}</span>,
        bold2: (chunks) => <span className="font-medium">{chunks}</span>
    });
    const [getQuoteDialog, setGetQuoteDialog] = useState(false);

    const images = [
        {
            img: "/images/buy/img7.png",
            title: t('li1'),
        },
        {
            img: "/images/buy/img8.png",
            title: t('li2'),
        },
        {
            img: "/images/buy/img9.png",
            title: t('li3'),
        }
    ]


    return (
        <div className="bg-white">
            <CommonBanner
                title={bannerTitle}
                bannerImage={bannerImage}
                desc={bannerDesc}
                desc2=""
                avatars={[]}
                titleWidth="max-w-4xl"
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">

                <h3 className="text-3xl lg:text-4xl font-normal text-neutral-900 mb-14">
                    {t.rich(`title`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                </h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14">
                    {images.map((item, i) => (
                        <div key={i} className="col-span-1 aspect-[5/4] overflow-hidden relative">
                            <LazyImage src={item.img} alt="buy" className="object-cover h-full w-full" />
                            <div className="absolute top-0 left-0 w-full h-full flex items-end gradient_1 px-4 md:px-6 py-6">
                                <p className="text-white font-semibold">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='w-full border-t border-gray-300 my-14'></div>

                <div className="mb-10">
                    <p className="mb-10">
                        {t('para2')}
                    </p>

                    <h4 className="text-dark text-2xl font-medium mb-10">
                        {t('para3')}
                    </h4>

                    <div className="flex flex-col gap-4">
                        <h5 className="text-xl text-dark">
                            {t('para4')}
                        </h5>

                        <div className="flex gap-2">
                            <div>
                                <BsCheckCircle size={20} className="text-primary" />
                            </div>
                            {t("li4")}
                        </div>

                        <div className="flex gap-2">
                            <div>
                                <BsCheckCircle size={20} className="text-primary" />
                            </div>
                            {t("li5")}
                        </div>

                        <div className="flex gap-2">
                            <div>
                                <BsCheckCircle size={20} className="text-primary" />
                            </div>
                            {t("li6")}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
                    <h4 className="text-dark text-lg text-center font-medium">
                        {t('para5')}
                    </h4>

                    <Button onClick={() => setGetQuoteDialog(true) } className="group rounded-full border border-primary hover:bg-primary hover:text-white font-medium w-fit flex items-center gap-2 px-4 py-2">
                        {tg("getCallBack")}
                        <BsArrowRight
                            size={20}
                            className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 text-white"
                        />
                    </Button>
                </div>

                {/* <div className='flex gap-3 sm:gap-4 flex-wrap'>
                    <div className='bg-primary text-white flex justify-center items-center rounded-md px-4 py-2'>
                        {tg('exploreNice')}
                    </div>
                    <Button component="a" onClick={() => router.push("/search-properties")} className="h-full !bg-transparent border !border-gray-300 !text-gray-600 hover:!border-primary hover:!text-primary">
                        {tg('clickHere')}
                    </Button>
                </div> */}

                <CallToAction />
            </div>

            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction="CallBackNewLead" />
            <NewsLetter />
        </div>
    )
}