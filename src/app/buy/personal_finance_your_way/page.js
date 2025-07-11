"use client"
import CallToAction from "@/components/CallToAction";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import ContactSection from "@/components/custom-ui/ContactSection";
import DynamicCard from "@/components/custom-ui/DynamicCard";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import bannerImage from "@/public/images/buy/banner7.jpg";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { BsArrowRight, BsCheckCircle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GetCallBackForm from "@/components/custom-ui/GetCallBackForm";

export default function PersonalFinance() {
    const t = useTranslations('Buy3.first');
    const tg = useTranslations('General');
    const [getQuoteDialog, setGetQuoteDialog] = useState(false);
    const [callBackAction, setCallBackAction] = useState('');

    const bannerTitle = t.rich('bannerTitle', {
        span: (chunks) => <span className="font-alt">{chunks}</span>
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
                bannerImage={bannerImage}
                desc={bannerDesc}
                desc2=""
                avatars={[]}
                titleWidth="max-w-xl"
                paraWidth="max-w-3xl"
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="flex flex-col gap-16">
                    <DynamicCard
                        image={`/images/buy/img19.jpeg`}
                        title={t.rich(`title1`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc1`)}
                        isReverse={false}
                        index={0}
                        // btnText={tg('SWN')}
                        // url="/search-properties"
                        clickHereDesc={t('desc2')}
                        clickHereBtnText={tg('clickHere')}
                        clickHereBtnUrl="/search-properties"
                    />

                    {/* <DynamicCard
                        image={`/images/buy/img20.png`}
                        title={t.rich(`title2`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc21`)}
                        desc2={t.rich(`desc22`, {
                            link: (chunks) => <Link href="#" className="text-primary">{chunks}</Link>
                        })}
                        isReverse={true}
                        index={1}
                        btnText={tg('SWN')}
                        url="/search-properties"
                    /> */}
                </div>
            </div>

            <div className="bg-primary/5 py-16">
                <div className="container">
                    <div className="lg:px-32">
                        <h4 className="text-2xl lg:text-3xl font-medium text-center mb-4">
                            {t.rich(`boxTitle`, {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </h4>

                        <p className="mb-6 text-center">
                            {t('boxDesc')}
                        </p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="col-span-1 border border-gray-200 p-4">
                                    <p className="text-2xl mb-1 font-alt font-medium">
                                        {t('stepTitle' + (index + 5))}
                                    </p>

                                    <p>
                                        {t('stepDesc' + (index + 5))}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <Button onClick={() => handleButtonClick('CallBackPersonalFinance')} className="group rounded-full border border-primary hover:bg-primary hover:text-white font-medium w-fit flex items-center gap-2 px-4 py-2">
                                {tg("LGS")}
                                <BsArrowRight
                                    size={20}
                                    className="transition-all duration-300 ease-in-out group-hover:translate-x-2 text-white"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-16">
                <DynamicCard
                    image={`/images/buy/img21.jpeg`}
                    title={t.rich(`title3`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                    desc={t(`desc3`)}
                    isReverse={false}
                    index={2}
                    btnText={tg('getCallBack')}
                    isCallBack={true}
                    callBackAction={"CallBackUSAPersonalFinance"}
                />

                <div className="grid sm:grid-cols-3 gap-6 mt-10 mb-20">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 9))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 9))}
                            </p>
                        </div>
                    ))}
                </div>

                <DynamicCard
                    image={`/images/buy/img22.png`}
                    title={t.rich(`title4`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                    desc={t(`desc4`)}
                    isReverse={true}
                    index={3}
                    btnText={tg('getCallBack')}
                    isCallBack={true}
                    callBackAction={"CallBackNewBuildPersonalFinance"}
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-20">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 12))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 12))}
                            </p>
                        </div>
                    ))}

                    {[...Array(4)].map((_, index) => (
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

                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 my-10">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                            {tg.rich('faqTitle', {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </h2>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <p className="mb-4 max-w-xl">
                            {t('faqDesc')}
                        </p>
                    </div>
                </div>

                <Accordion type="single" collapsible className="w-full mb-10">
                    {[...Array(9)].map((_, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`} className="!border px-3 mb-3">
                            <AccordionTrigger type={2}>
                                {t(`ques${index + 1}`)}
                            </AccordionTrigger>
                            <AccordionContent>
                                {t.rich(`ans${index + 1}`, {
                                    font: (chunks) => <span className="font-bold">{chunks}</span>,
                                    font1: (chunks) => <span className="font-bold">{chunks}</span>
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="flex flex-col gap-4">
                    <h5 className="text-2xl lg:text2xl mb-3 font-medium">
                        {t('liTitle')}
                    </h5>

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

                    <div className="flex gap-2">
                        <div>
                            <BsCheckCircle size={20} className="text-primary" />
                        </div>
                        {t("li4")}
                    </div>

                    <div className="flex gap-2">
                        <div>
                            <BsCheckCircle size={20} className="text-primary" />
                        </div>
                        {t("li5")}
                    </div>
                </div>

                <div className="mt-20">
                    <ContactSection
                        title={t("boxtitle1")}
                        desc={t("boxDesc11")}
                        desc2={t("boxDesc12")}
                        btnText={tg("RACB")}
                        url="/contact-us"
                        isCallBack={true}
                        callBackAction={"CallBackPersonalFinance"}
                    />
                </div>

                <CallToAction />
            </div>
            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} />

            <NewsLetter />
        </div>
    )
}