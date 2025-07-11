"use client"
import CallToAction from "@/components/CallToAction";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import ContactSection from "@/components/custom-ui/ContactSection";
import DynamicCard from "@/components/custom-ui/DynamicCard";
import { useTranslations } from "next-intl";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import GetCallBackForm from "@/components/custom-ui/GetCallBackForm";

export default function SmartCurrencyExchange() {
    const t = useTranslations('Buy3.third');
    const tg = useTranslations('General');
    const [getQuoteDialog, setGetQuoteDialog] = useState(false);
    const [callBackAction, setCallBackAction] = useState('');

    const bannerTitle = t.rich('bannerTitle', {
        span: (chunks) => <span className="font-alt flex">{chunks}</span>
    });

    const bannerDesc = t.rich('bannerDesc', {
        bold1: (chunks) => <span className="font-medium">{chunks}</span>,
        bold2: (chunks) => <span className="font-medium">{chunks}</span>
    });

    const handleButtonClick = (action) => {
        setGetQuoteDialog(true);
        setCallBackAction(action);
    };
    
    return (
        <div className="bg-white">
            <CommonBanner
                title={bannerTitle}
                bannerImage="/videos/buy_smart.mov"
                desc={bannerDesc}
                desc2=""
                avatars={[]}
                titleWidth="max-w-3xl"
                paraWidth="max-w-3xl"
                isVideo
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="flex flex-col gap-16">
                    <DynamicCard
                        image={`/images/buy/img29.png`}
                        title={t.rich(`title1`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc1`)}
                        isReverse={false}
                        index={0}
                        btnText={tg('getCallBack')}
                        isCallBack={true}
                        callBackAction={"CallBackNewLeadCurrencyExchange"}
                    />

                    <DynamicCard
                        image={`/images/buy/img30.png`}
                        title={t.rich(`title2`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc2`)}
                        isReverse={true}
                        index={1}
                        btnText={tg('ReachoutToYourAdvisor')}
                        isCallBack={true}
                        callBackAction={"CallBackNewLeadCurrencyExchange"}
                    />

                    <DynamicCard
                        image={`/images/buy/img31_1.jpg`}
                        title={t.rich(`title3`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc3`)}
                        isReverse={false}
                        index={2}
                        btnText={tg('talkWithUs')}
                        isCallBack={true}
                        callBackAction={"CallBackNewLeadCurrencyExchange"}
                    />

                    <DynamicCard
                        image={`/images/buy/img32.png`}
                        title={t.rich(`title4`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc4`)}
                        isReverse={true}
                        index={3}
                        btnText={tg('getCallBack')}
                        isCallBack={true}
                        callBackAction={"CallBackNewLeadCurrencyExchange"}
                    />
                </div>
            </div>

            <div className="bg-primary/5 py-16">
                <div className="container">
                    <div className="lg:px-32">
                        <h4 className="text-2xl lg:text-3xl font-medium text-center mb-6">
                            {t.rich(`boxTitle1`, {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </h4>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="col-span-1 border border-gray-200 p-4">
                                    <p className="text-2xl mb-1 font-alt font-medium">
                                        {t('stepTitle' + (index + 1))}
                                    </p>

                                    <p>
                                        {t('stepDesc' + (index + 1))}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <Button onClick={() => handleButtonClick('ContactCurrencyRequirement')} className="group rounded-full border border-primary hover:bg-primary hover:text-white font-medium w-fit flex items-center gap-2 px-4 py-2">
                                {tg("LGS")}
                                <BsArrowRight
                                    size={20}
                                    className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 text-white"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pb-16">
                <div className="mt-20">
                    <ContactSection
                        title={t("boxTitle2")}
                        desc={t("boxDesc2")}
                        btnText={tg("RACB")}
                        url="/contact-us"
                        isCallBack={true}
                        callBackAction={"ContactCurrencyRequirement"}
                    />
                </div>

                <CallToAction />
            </div>
            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} />

            <NewsLetter />
        </div>
    )
}