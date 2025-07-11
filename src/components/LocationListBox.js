"use client";
import frenchAlpineImg from "@/public/images/alpine.png";
import frenchAlpineIcon from "@/public/images/icons/french.png";
import langudocIcon from "@/public/images/icons/langudoc.png";
import rivieraIcon from "@/public/images/icons/riviera.png";
import langudocImg from "@/public/images/langudoc-img.jpeg";
import rivieraImg from "@/public/images/riviera_img.jpeg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchItemCaraousel from "./SearchItemCaraousel";
import { Button } from "./ui/button";
import GetCallBackForm from "./custom-ui/GetCallBackForm";

import {
    fetchFrenchAlpineTowns,
    fetchFrenchRivieraTowns,
    fetchLangudocRoussillonTowns
} from '@/services/api';
import LazyImage from "./LazyImage";

// Configuration object for different location types
const locationConfig = {
    frenchAlps: {
        title: "French Alpine",
        icon: frenchAlpineIcon,
        image: frenchAlpineImg,
        fetchData: fetchFrenchAlpineTowns
    },
    frenchRiviera: {
        title: "French Riviera",
        icon: rivieraIcon,
        image: rivieraImg,
        fetchData: fetchFrenchRivieraTowns
    },
    langudocRoussillon: {
        title: "Langudoc-Roussillon",
        icon: langudocIcon,
        image: langudocImg,
        fetchData: fetchLangudocRoussillonTowns
    }
};

export default function LocationListBox({ type, isEnd, order }) {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [towns, setTowns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const t = useTranslations('HomePage');
    const tg = useTranslations('General');

    // Get configuration for current type
    const config = locationConfig[type] || locationConfig.frenchAlps;
    const [getQuoteDialog, setGetQuoteDialog] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const response = await config.fetchData();
                setTowns(response);
                setError(null);
            } catch (err) {
                console.error(`Error fetching ${config.title} towns:`, err);
                setError("Failed to load location data");
                setTowns([]);
            } finally {
                setLoading(false);
                setTimeout(() => setIsReady(true), 100);
            }
        }
        loadData();
    }, [type]); // Re-run when type changes

    if (error) {
        return (
            <section className="container py-10 text-center">
                <p className="text-red-500">{error}</p>
                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="mt-4"
                >
                    Retry
                </Button>
            </section>
        );
    }

    return (
        <section>
            {isReady && (
                <>
                    <div className="container">
                        <div className="px-3 pt-10 pb-16 max-w-[800px] mx-auto">
                            <div className="flex justify-center items-center gap-3 mb-8">
                                <Image
                                    className="w-14 aspect-square"
                                    src={config.icon}
                                    alt={`${config.title} icon`}
                                />
                                <h1 className="text-4xl text-dark font-medium">
                                    {tg("quick")} <span className="font-alt">{config.title}</span> {tg("searches")}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white">
                        <div className="container">
                            <div data-aos={`${order % 2 === 0 ? 'zoom-in' : 'zoom-in'}`} data-aos-delay={50 * order} data-aos-offset={100 * order}>
                                <div className="px-3 pb-16 mx-auto">
                                    <div className={`lg:max-w-[900px] mx-auto relative rounded-2xl shadow-lg overflow-hidden flex ${isEnd ? 'justify-end' : ''} -translate-y-16`}>
                                        {/* Left Image Section */}
                                        <div className="w-full absolute h-full rounded-2xl">
                                            <LazyImage
                                                src={config.image}
                                                alt={config.title}
                                                className="w-full h-full object-center object-cover rounded-2xl"
                                            />
                                        </div>

                                        {/* Right Overlay Section */}
                                        <div className={`w-full max-w-[420px] h-[442px] flex flex-col relative p-3 sm:p-6 ${towns && towns.length > 0 ? 'bg-black/50' : ''}`}>
                                            {loading ? (
                                                <div className="text-center text-white">
                                                    Loading towns...
                                                </div>
                                            ) : (
                                                <SearchItemCaraousel
                                                    items={towns}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="flex flex-col items-center justify-center md:flex-row gap-3 mt-[-1.5rem]">
                                        <p className="text-lg">{t("whyNotReachLocalOffice")}</p>
                                        <Button
                                            variant="outline"
                                            onClick={() => setGetQuoteDialog(true)}
                                            className="border-gray-400 !bg-transparent !text-dark hover:border-primary hover:!bg-primary hover:!text-white !rounded-full text-base font-semibold !py-1 !transition-all"
                                        >
                                            {tg("clickHere")}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction="CallBackNewLead" />
                </>
            )}
        </section>
    );
}