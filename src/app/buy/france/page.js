import CallToAction from "@/components/CallToAction";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import DynamicCard from "@/components/custom-ui/DynamicCard";
import bannerImage from "@/public/images/buy/banner1.jpg";
import { useTranslations } from "next-intl";

export default function BuyFrance() {

    const t = useTranslations('Buy1');
    const tg = useTranslations('General');

    const bannerTitle = t.rich('bannerTitle', {
        span: (chunks) => <span className="font-alt flex">{chunks}</span>
    });

    return (
        <div className="bg-white">
            <CommonBanner
                title={bannerTitle}
                bannerImage={bannerImage}
                desc={t('bannerDesc')}
                desc2=""
                avatars={[]}
                titleWidth="max-w-4xl"
                paraWidth="max-w-3xl"
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10 lg:mt-0 mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                            {t.rich('title11', {
                                span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                            })}
                        </h2>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <p className="max-w-xl">
                            {t('desc11')}
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <span className="w-8 h-8 flex justify-center items-center bg-primary text-white mb-6 text-xs">
                                0{index + 1}
                            </span>

                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 1))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 1))}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-16">
                    <DynamicCard
                        image={`/images/buy/img1.png`}
                        label=""
                        title={t.rich(`second.bannerTitle`, {
                            span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                        })}
                        subTitle={t(`second.bannerDesc`)}
                        desc={t.rich(`second.para`, {
                            bold1: (chunks) => <span className="font-medium">{chunks}</span>,
                            bold2: (chunks) => <span className="font-medium">{chunks}</span>
                        })}
                        isReverse={false}
                        index={0}
                        btnText={tg('readMore')}
                        url="/buy/vat"
                    />

                    <DynamicCard
                        image={`/images/buy/img2.png`}
                        label=""
                        title={t.rich(`third.bannerTitle`, {
                            span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                        })}
                        subTitle={t(`third.subTitle`)}
                        desc={t.rich(`third.para`, {
                            bold1: (chunks) => <span className="font-medium">{chunks}</span>,
                            bold2: (chunks) => <span className="font-medium">{chunks}</span>
                        })}
                        isReverse={true}
                        index={1}
                        btnText={tg('readMore')}
                        url="/buy/us"
                    />

                    <DynamicCard
                        image={`/images/buy/img3.png`}
                        label=""
                        title={t.rich(`forth.bannerTitle`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        subTitle={t(`forth.bannerDesc`)}
                        desc={t.rich(`forth.para1`, {
                            bold1: (chunks) => <span className="font-medium">{chunks}</span>,
                            bold2: (chunks) => <span className="font-medium">{chunks}</span>
                        })}
                        desc2={t.rich(`forth.para2`, {
                            bold1: (chunks) => <span className="font-medium">{chunks}</span>,
                            bold2: (chunks) => <span className="font-medium">{chunks}</span>
                        })}
                        isReverse={false}
                        index={2}
                        btnText={tg('readMore')}
                        url="/buy/tax"
                    />
                </div>

                <CallToAction type="a"
                    btn3Text={t('ctabtnText3')}
                    btn3Url="/buy/personal_finance_your_way"
                />
            </div>

            <NewsLetter />
        </div>
    )
}