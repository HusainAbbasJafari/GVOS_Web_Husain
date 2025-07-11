"use client"
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import DynamicCard from "@/components/custom-ui/DynamicCard";
import bannerImage from "@/public/images/buy/banner6.jpg";
import { useTranslations } from "next-intl";

export default function FinanceYourFuture() {
    const t = useTranslations('Buy3');
    const tg = useTranslations('General');

    const bannerTitle = t.rich('bannerTitle', {
        span: (chunks) => <span className="font-alt flex">{chunks}</span>
    });

    const bannerDesc = t.rich('bannerDesc', {
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
                paraWidth="max-w-2xl"
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="flex flex-col gap-16">
                    <DynamicCard
                        image={`/images/buy/img16.png`}
                        title={t.rich(`title1`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc1`)}
                        isReverse={false}
                        index={0}
                        btnText={tg('readMore')}
                        url="/buy/personal_finance_your_way"
                    />

                    <DynamicCard
                        image={`/images/buy/img17.png`}
                        title={t.rich(`title2`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc2`)}
                        isReverse={true}
                        index={1}
                        btnText={tg('readMore')}
                        url="/buy/launch_your_french_property_empire"
                    />

                    <DynamicCard
                        image={`/images/buy/img18.png`}
                        title={t.rich(`title3`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc3`)}
                        isReverse={false}
                        index={2}
                        btnText={tg('readMore')}
                        url="/buy/smart_currency_exchange"
                    />
                </div>
            </div>

            <NewsLetter />
        </div>
    )
}