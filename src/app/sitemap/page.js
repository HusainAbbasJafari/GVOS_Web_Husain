"use client";
import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import bannerImage from "@/public/images/menu1.png";
import {
    fetchFrenchAlpineTowns,
    fetchFrenchRivieraTowns,
    fetchLangudocRoussillonTowns,
    fetchAreaGuideList
} from '@/services/api';
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Button } from "@/components/ui/button";
import { SiteMapSkeleton } from "@/components/SiteMapSkeleton";

// Configuration object for different location types
const locationConfig = {
    frenchAlps: {
        title: "French Alpine",
        fetchData: fetchFrenchAlpineTowns
    },
    frenchRiviera: {
        title: "French Riviera",
        fetchData: fetchFrenchRivieraTowns
    },
    langudocRoussillon: {
        title: "Langudoc-Roussillon",
        fetchData: fetchLangudocRoussillonTowns
    }
};

const Sitemap = () => {
    const { setLoadingMain } = useGlobalContext();
    const tg = useTranslations('General');
    const th = useTranslations('Header');

    const [isReady, setIsReady] = useState(false);
    const [frenchAlpine, setFrenchAlpine] = useState([]);
    const [frenchRiviera, setFrenchRiviera] = useState([]);
    const [langudocRoussillon, setLangudocRoussillon] = useState([]);
    const [areaGuideData, setAreaGuideData] = useState([]);
    const [error, setError] = useState(null);
    const [sitemapLoading, setSitemapLoading] = useState(false);
 
    useEffect(() => {
        async function loadData() {
            try {
                setSitemapLoading(true);
                const FrenchAlpineData = await fetchFrenchAlpineTowns();
                setFrenchAlpine(FrenchAlpineData);

                const frenchRivieraData = await fetchFrenchRivieraTowns();
                setFrenchRiviera(frenchRivieraData);

                const langudocRoussillonData = await fetchLangudocRoussillonTowns();
                setLangudocRoussillon(langudocRoussillonData);

                const AreaGuideData = await fetchAreaGuideList({ type: "sitemap" });
                setAreaGuideData(AreaGuideData);

                setError(null);
            } catch (err) {
                console.error(`Error fetching data`, err);
                setError("Failed to load location data");
                setFrenchAlpine([]);
            } finally {
                setSitemapLoading(false);
                setTimeout(() => setIsReady(true), 100);
            }
        }
        loadData();
    }, []);
    return (
        <div className="bg-white">
            <section className="banner_secton">
                <div className="w-full h-80 overflow-hidden relative">
                    <LazyImage src={bannerImage} alt="property" className="w-full object-cover" />

                    <div className="absolute w-full h-full top-0 left-0 bg-black/50 flex items-center justify-center">
                        <h4 className="text-white text-5xl font-bold">
                            {tg('sitemap')}
                        </h4>
                    </div>
                </div>
            </section>

            <section className='container py-10'>
                {sitemapLoading ? (
                    <SiteMapSkeleton />
                ) : (
                    <>
                    {(frenchAlpine?.length > 0 || frenchRiviera?.length > 0 || langudocRoussillon?.length > 0) && (
                        <h5 className="text-primary text-3xl font-semibold mb-5">
                            {tg("quick")} {tg("searches")}
                        </h5>
                    )}

                    {(frenchAlpine && frenchAlpine.length > 0) && (
                        <div className="border border-gray-300 p-3 mb-6">
                            <h4 className="text-2xl text-dark font-medium mb-3">French Alpine</h4>

                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {frenchAlpine.map((item, index) => (
                                    <Link href={`/view-properties/${item.type}/${item.id}`} className="col-span-1 hover:text-primary" key={index}>
                                        <span className="text-md capitalize">
                                            {item.title.toLowerCase()}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {(frenchRiviera && frenchRiviera.length > 0) && (
                        <div className="border border-gray-300 p-3 mb-6">
                            <h4 className="text-2xl text-dark font-medium mb-3">French Riviera</h4>

                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {frenchRiviera.map((item, index) => (
                                    <Link href={`/view-properties/${item.type}/${item.id}`} className="col-span-1 hover:text-primary" key={index}>
                                        <span className="text-md capitalize">
                                            {item.title.toLowerCase()}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {(langudocRoussillon && langudocRoussillon.length > 0) && (
                        <div className="border border-gray-300 p-3 mb-6">
                            <h4 className="text-2xl text-dark font-medium mb-3">Langudoc Roussillon</h4>

                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {langudocRoussillon.map((item, index) => (
                                    <Link href={`/view-properties/${item.type}/${item.id}`} className="col-span-1 hover:text-primary" key={index}>
                                        <span className="text-md capitalize">
                                            {item.title.toLowerCase()}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {(areaGuideData && areaGuideData?.length > 0) && (
                        <h5 className="text-primary text-3xl font-semibold mt-10 mb-5">{tg("areaGuide")}</h5>
                    )}

                    {(areaGuideData && areaGuideData?.length > 0) && (
                        areaGuideData?.map((area) => (
                            <div key={area.id} className="border border-gray-300 p-3 mb-6">
                                <h4 className="text-2xl text-dark font-medium mb-3">
                                    <Link
                                        href={`/area-guides/${area.area_guide?.slug}`}
                                        className="col-span-1 hover:text-primary"
                                    >
                                        <span className="text-md capitalize">{area.name}</span>
                                    </Link>
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {area.morphable?.map((morphable) => (
                                        <Link
                                            key={morphable.id}
                                            href={`/area-guides/${morphable.area_guide?.slug}`}
                                            className="col-span-1 hover:text-primary"
                                        >
                                            <span className="text-md capitalize">{morphable.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    </>
                )}
                
            </section>

            <NewsLetter />
        </div>
    )
}

export default Sitemap;