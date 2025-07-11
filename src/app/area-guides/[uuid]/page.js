"use client"
import { useGlobalContext } from '@/app/context/GlobalContext';
import { HomeSlider } from '@/components/custom-ui/HomeSlider';
import SlickButton from '@/components/custom-ui/SlickButton';
import HeroCarousel from '@/components/HeroCaraousel';
import HtmlRenderer from '@/components/HtmlRenderer';
import NewsLetter from '@/components/NewsLetter';
import { Button } from '@/components/ui/button';
import placeholderImage from "@/public/images/placeholder.png";
import { fetchAreaGuide } from '@/services/api';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import CallToAction from "@/components/CallToAction";
import CommonBanner from '@/components/custom-ui/CommonBanner';
import bannerImage from "@/public/images/sellBanner1.png";

const AreaGuide = () => {
    const { setLoadingMain } = useGlobalContext();
    const [areaGuideDetails, setAreaGuideDetails] = useState('');
    const [error, setError] = useState(false);

    const tg = useTranslations('General');
    const router = useRouter();
    const params = useParams();
    const uuid = params?.uuid;

    useEffect(() => {
        setLoadingMain(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingMain(true);
                const data = await fetchAreaGuide(uuid);
                if (!data) return router.push("/not-found");
                setAreaGuideDetails(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch area guide details');
                router.push(`/not-found`);
            } finally {
                setLoadingMain(false);
            }
        };

        if (uuid) {
            fetchData();
        }
    }, [uuid]);
    return (
        <div className='bg-whitee overflow-hidden'>
            <section className="relative bg-cover bg-center bg-no-repeat flex flex-col">
                {areaGuideDetails && areaGuideDetails.documents && areaGuideDetails.documents.length > 1 ? (
                    <HeroCarousel
                        renderButtons={({ sliderRef }) => (
                            <SlickButton
                                className="hidden md:flex min-w-8 w-8 !bg-primary !text-white !border-primary !rounded-none"
                                sliderRef={sliderRef}
                                iconSize={18}
                                type="type_2"
                                arrowIcon="true"
                            /> // leftclassName="left-[140px]" rightclassName="right-[140px]"
                        )}
                        styleType={1}
                    >
                        {areaGuideDetails.documents.map((item, index) => (
                            <HomeSlider
                                key={index}
                                item={item.url}
                                isHome={false}
                                isVideo={item?.url?.endsWith(".mp4") || item?.url?.endsWith(".mov")}
                                styleType={1}
                            />
                        ))}
                    </HeroCarousel>
                ) : areaGuideDetails && areaGuideDetails.documents && areaGuideDetails.documents.length === 1 ? (
                    <HomeSlider
                        key={0}
                        item={areaGuideDetails.documents[0].url}
                        isHome={false}
                        isVideo={areaGuideDetails.documents[0]?.url?.endsWith(".mp4") || areaGuideDetails.documents[0]?.url?.endsWith(".mov")}
                        styleType={1}
                    />
                ) : (
                    <CommonBanner
                        title={areaGuideDetails?.title}
                        bannerImage={bannerImage}
                        desc=""
                        desc2=""
                        avatars={[]}
                        titleWidth="max-w-4xl"
                        type={0}
                        areaGuideName={areaGuideDetails?.morphable?.name.toLowerCase()}
                        isAreaGuide
                    />
                )}

                <Link href="#arrowScrollSection" className="text-white z-10 absolute bottom-14 left-1/2 -translate-x-1/2 p-3 border rounded-full flex items-center justify-center arrow-bounce hover:border-primary bg-black/40 hover:bg-primary transition-all duration-300">
                    <BsArrowDown size={22} />
                </Link>
            </section>

            {areaGuideDetails && (
                <section className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                    <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10 lg:mt-0">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                                {areaGuideDetails?.title}
                                <span className='text-primary font-alt flex capitalize'>
                                    {tg('the')} {areaGuideDetails?.morphable?.name.toLowerCase()}
                                </span>
                            </h2>
                        </div>

                        <div className="col-span-1 md:col-span-3">
                            <p className="[&:not(:last-child)]:mb-4">
                                {areaGuideDetails?.short_description}
                            </p>
                        </div>
                    </div>

                    <div className='w-full border-t border-gray-300 my-14'></div>

                    {areaGuideDetails?.long_description && (
                        <div className='mb-2'>
                            <HtmlRenderer html={areaGuideDetails?.long_description} />
                        </div>
                    )}

                    <CallToAction type="a"
                        btn1Url={`/view-properties/${areaGuideDetails?.morphable?.type}/${areaGuideDetails?.morphable?.id}`}
                        btn1Text={tg('searchTheAvailabilitiesIn', { name: areaGuideDetails?.morphable?.name })}
                        btn2Url="/contact-us"
                        btn2Text={tg('contactUs')}
                        btn3Text={tg('wn3Title')}
                        btn3Url="/buy/france"
                    />
                </section>
            )}
            <NewsLetter />
        </div>
    )
}

export default AreaGuide;