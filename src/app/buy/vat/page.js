"use client"
import CallToAction from "@/components/CallToAction";
import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import DynamicCard from "@/components/custom-ui/DynamicCard";
import { Button } from "@/components/ui/button";
import bannerImage from "@/public/images/buy/banner2.jpg";
import { useTranslations } from "next-intl";
import { BsCheckCircle } from "react-icons/bs";

export default function BuyVat() {
    const t = useTranslations('Buy1.second');
    const tg = useTranslations('General');

    const bannerTitle = t.rich('bannerTitle', {
        span: (chunks) => <span className="font-alt flex">{chunks}</span>
    });

    const bannerDesc = t.rich('para', {
        bold1: (chunks) => <span className="font-medium">{chunks}</span>,
        bold2: (chunks) => <span className="font-medium">{chunks}</span>
    });

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
                <div className="flex flex-col gap-16">

                    <div className="grid sm:grid-cols-2 gap-6 lg:gap-10" data-aos="zoom-in" data-aos-delay={50 * 0} data-aos-offset="100">
                        <div>
                            <div className="aspect-[5/4] overflow-hidden">
                                <LazyImage src="/images/buy/img31.png" alt="Team" className="object-cover h-full w-full" />
                            </div>
                        </div>

                        <div className="grow flex flex-col justify-between">
                            <div>
                                <h3 className="max-w-md text-3xl lg:text-4xl font-normal text-neutral-900 mb-2">
                                    {t.rich(`title1`, {
                                        span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                                    })}
                                </h3>
                            </div>

                            <div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-2">
                                        <div>
                                            <BsCheckCircle size={20} className="text-primary" />
                                        </div>
                                        {t("li1")}
                                    </div>

                                    <div className="flex gap-2">
                                        <div>
                                            <BsCheckCircle size={20} className="text-primary" />
                                        </div>
                                        {t("li2")}
                                    </div>

                                    <div className="flex gap-2">
                                        <div>
                                            <BsCheckCircle size={20} className="text-primary" />
                                        </div>
                                        {t("li3")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DynamicCard
                        image={`/images/buy/img5.png`}
                        label=""
                        title={t.rich(`title2`, {
                            span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                        })}
                        subTitle={t(`para21`)}
                        desc={t(`para22`)}
                        desc2={t(`para23`)}
                        isReverse={true}
                        index={0}
                        subLine={t("para24")}
                        btnText={tg('diveIn')}
                        url="/search-properties?listing_type=new_build"
                    />

                    <DynamicCard
                        image={`/images/buy/img6.png`}
                        label=""
                        title={t.rich(`title3`, {
                            span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                        })}
                        subTitle={t(`para31`)}
                        desc={t(`para32`)}
                        desc2={t(`para33`)}
                        desc3={t(`para34`)}
                        isReverse={false}
                        index={1}
                        btnText={tg('getCallBack')}
                        isCallBack
                        callBackAction="CallBackNewLead"
                    />
                </div>

                <CallToAction
                    btn3Url="/buy/aftersales"
                    btn3Text={tg.rich("wn3Vat", {
                        br: (chunks) => (
                            <span className="block">{chunks}</span>
                        ),
                        br1: (chunks) => (
                            <span className="block">{chunks}</span>
                        ),
                    })}
                />
            </div>

            <NewsLetter />
        </div>
    )
}