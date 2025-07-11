"use client"
import CallToAction from "@/components/CallToAction";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import ContactSection from "@/components/custom-ui/ContactSection";
import DynamicCard from "@/components/custom-ui/DynamicCard";
import { Button } from "@/components/ui/button";
import bannerImage from "@/public/images/buy/banner5.jpg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GetCallBackForm from "@/components/custom-ui/GetCallBackForm";

export default function AfterSales() {
    const t = useTranslations('Buy2');
    const tg = useTranslations('General');

    const router = useRouter();
    const [getQuoteDialog, setGetQuoteDialog] = useState(false);

    const bannerTitle = t.rich('bannerTitle', {
        span: (chunks) => <span className="font-alt">{chunks}</span>
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
                titleWidth="max-w-3xl"
                paraWidth="max-w-2xl"
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="flex flex-col gap-16 mb-10">
                    <div className="scroll_top_margin size_xl" id="aftersales_1">
                        <DynamicCard
                            image={`/images/buy/img12.jpeg`}
                            label=""
                            title={t.rich(`title1`, {
                                span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                            })}
                            subTitle=""
                            desc={t(`para12`)}
                            desc2=""
                            isReverse={false}
                            index={0}
                            clickHereBtnText={tg('getCallBack')}
                            clickHereBtnUrl={`mailto:admin@greenstoneventures.co.uk?subject=${encodeURIComponent(t('title1a') + t('commonSub'))}`}
                            priceLabel={t(`priceLabel11`)}
                            priceLabelValue={t.rich("priceLabel12",
                                { cost: '€350', vat: '20%' },
                            )}
                            isCallBack={true}
                            callBackAction="CallBackNewLeadVatReclaimAccountManagement"
                        />
                    </div>
                    <div className="scroll_top_margin size_xl" id="aftersales_2">
                        <DynamicCard
                            image={`/images/buy/img13.jpg`}
                            label=""
                            title={t.rich(`title2`, {
                                span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                            })}
                            subTitle=""
                            desc={t(`para21`)}
                            desc2={t(`para22`)}
                            isReverse={true}
                            index={1}
                            subLine=""
                            btnText=""
                            url=""
                            priceLabel={t(`priceLabel21`)}
                            priceLabelValue={t.rich("priceLabel12",
                                { cost: '€540', vat: '20%' },
                            )}
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 1))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 1))}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center text-center gap-2 my-10 max-w-4xl mx-auto">
                    <p className="text-xl">
                        {t('findYourFavorite')}
                    </p>
                    <Button variant={"outline"} component="a" onClick={() => setGetQuoteDialog(true)} className="!border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300  px-5">
                        {tg('getCallBack')}
                    </Button>
                </div>

                <div className="scroll_top_margin size_xl" id="aftersales_3">
                    <DynamicCard
                        image={`/images/buy/img14.jpg`}
                        label=""
                        title={t.rich(`title3`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`para3`)}
                        isReverse={false}
                        index={0}
                        priceLabel={t(`priceLabel3`)}
                        priceLabelValue={t.rich("priceLabel31",
                            { cost: '€550', vat: '20%' },
                        )}
                        priceLabel2={t(`priceLabel3`)}
                        priceLabelValue2={t.rich("priceLabel32",
                            { cost: '€950', vat: '20%' },
                        )}
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-6 my-10">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle3' + (index + 1))}
                            </p>

                            <p>
                                {t('stepDesc3' + (index + 1))}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="mb-6">
                    {t("para31")}
                </p>

                <div className="flex flex-col items-center text-center gap-2 my-10 max-w-4xl mx-auto">
                    <p className="text-xl">
                        {t('findYourFavorite')}
                    </p>
                    <Button variant={"outline"} component="a" onClick={() => setGetQuoteDialog(true)} className="!border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300  px-5">
                        {tg('getCallBack')}
                    </Button>
                </div>

                <div className="scroll_top_margin size_xl" id="aftersales_4">
                    <DynamicCard
                        image={`/images/buy/img15.jpeg`}
                        label=""
                        title={t.rich(`title4`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`para4`)}
                        isReverse={true}
                        index={0}
                        priceLabel={t.rich(`priceLabel4`, {
                            span: (chunks) => <span className="flex">{chunks}</span>
                        })}
                        priceLabelValue={t.rich("priceLabel41",
                            { cost: '€450', vat: '20%' },
                        )}
                        // btnText={t('elevateYourStyle')}
                        clickHereBtnText={tg('getCallBack')}
                        clickHereBtnUrl={`mailto:admin@greenstoneventures.co.uk?subject=${encodeURIComponent(t('title4a') + t('commonSub'))}`}
                        isCallBack={true}
                        callBackAction="CallBackNewLeadUtilitiesSupport"
                    />
                </div>

                <div className="mt-20">
                    <ContactSection
                        title={t("boxtitle")}
                        desc={t("boxDesc")}
                        btnText={tg("LGS")}
                        url="/contact-us"
                    />
                </div>
                <CallToAction type="b" />
            </div>
            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction="CallBackNewLeadFurnitureDelivery" />
            <NewsLetter />
        </div>
    )
}