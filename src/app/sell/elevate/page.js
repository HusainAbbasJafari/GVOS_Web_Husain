'use client';

import NewsLetter from "@/components/NewsLetter";
import ImageTextRL from "@/components/custom-ui/ImageTextRL";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import bannerImage from "@/public/images/sellbanner2.jpg";
import { useTranslations } from "next-intl";
import CallToAction from "@/components/CallToAction";
import { fetchOverviewStats } from "@/services/api";
import { useState, useEffect } from "react";

export default function SellElevate() {
    const t = useTranslations('Sell2');
    const tg = useTranslations('General');
    const [overviewStats, setOverviewStats] = useState([]);

    const bannerTitle = t.rich('bannerTitle', {
        font: (chunks) => <span className="font-alt">{chunks}</span>,
        span: (chunks) => <span className="flex">{chunks}</span>
    });

    useEffect(() => {
        async function loadData() {
            try {
                const overviewStats = await fetchOverviewStats();
                setOverviewStats(overviewStats);

            } catch (error) {
                console.error('Error loading master search data:', error);
            }
        }
        loadData();
    }, []);

    return (
        <div className="bg-whitee">
            <CommonBanner
                title={bannerTitle}
                bannerImage={bannerImage}
                desc={t('bannerDesc')}
                desc2={t('bannerDesc2')}
                avatars={[]}
                titleWidth="max-w-4xl"
                type={1}
                count={overviewStats?.advisors_count ?? 0}
                isCallBack={true}
                isHideSurname={true}
                callBackAction={"CallBackNewDeveloper"}
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10 lg:mt-0 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </h2>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <p className="mb-4 max-w-xl">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 lg:mt-0">
                            {[
                                { label: tg('experience'), value: tg('experienceVal', { count: 25 }) },
                                { label: tg('projectsDone'), value: (overviewStats?.projects_count ?? 0) + "+" },
                                { label: tg('satisfiedClients'), value: (overviewStats?.sales_count ?? 0) + "+" },
                                { label: tg('advisors'), value: (overviewStats?.advisors_count ?? 0) + "+" },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl lg:text-3xl font-bold text-neutral-900">{stat.value}</div>
                                    <div className="text-sm text-muted">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-14">
                    {[...Array(6)].map((_, i) => (
                        <ImageTextRL
                            key={i}
                            image={`/images/sell/img2${i + 1}.png`}
                            label={t(`label${i + 1}`)}
                            title={i === 3 ? (
                                t.rich(`title${i + 1}`, {
                                    a: (chunks) => (
                                        <a target="_blank" href="https://www.gvoscrm.io" className="hover:text-primary">
                                            {chunks}
                                        </a>
                                    ),
                                })
                            ) :
                                t(`title${i + 1}`)
                            }
                            desc={t(`desc${i + 1}`)}
                            isReverse={(i + 1) % 2 === 0}
                            index={i}
                            callBackAction={"CallBackNewDeveloper"}
                            isHideSurname={true}
                            showLogo={i === 3 ? true : false}
                        />
                    ))}
                </div>

                <CallToAction />
            </div>

            <NewsLetter />
        </div>
    )
}