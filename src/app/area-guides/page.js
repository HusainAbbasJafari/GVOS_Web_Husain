"use client";
import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import bannerImage from "@/public/images/menu1.png";
import {
    fetchAreaGuideList
} from '@/services/api';
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AreaGuideSkeleton } from "@/components/AreaGuideSkeleton";

const AreaGuides = () => {
    const tg = useTranslations('General');
    const th = useTranslations('Header');

    const [areaGuideData, setAreaGuideData] = useState([]);
    const [areaGuideLoading, setAreaGuideLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                setAreaGuideLoading(true);
                const AreaGuideData = await fetchAreaGuideList({ type: "sitemap" });
                setAreaGuideData(AreaGuideData);
            } catch (err) {
                console.error(`Error fetching data`, err);
            } finally {
                setAreaGuideLoading(false);
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
                            {tg('areaGuide')}
                        </h4>
                    </div>
                </div>
            </section>

            <section className='container py-10'>
                {areaGuideLoading ? (
                    <AreaGuideSkeleton />
                ) : areaGuideData && areaGuideData?.length > 0 ? (
                    areaGuideData?.map((area, index) => (
                        <React.Fragment key={index}>
                            <h5 key={area.id} className="text-primary text-3xl font-semibold mb-2">
                                <Link
                                    href={`/area-guides/${area.area_guide?.slug}`}
                                    className="col-span-1 hover:text-primary"
                                >
                                    <span className="text-md capitalize">{area.name}</span>
                                </Link>
                            </h5>
                            <div className="border border-gray-300 p-3 mb-6">
                                {area.morphable?.length > 0 ? (
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
                                ) : (
                                    <p className="">{tg("noData")}</p>
                                )}
                            </div>
                        </React.Fragment>
                    ))
                ) : (
                    <p className="text-center">{tg("noData")}</p>
                )}
            </section>

            <NewsLetter />
        </div>
    )
}

export default AreaGuides;