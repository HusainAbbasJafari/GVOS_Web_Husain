"use client"
import { useGlobalContext } from "@/app/context/GlobalContext";
import CallToAction from "@/components/CallToAction";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import ContactSection from "@/components/custom-ui/ContactSection";
import DynamicCard from "@/components/custom-ui/DynamicCard";
import GetCallBackForm from "@/components/custom-ui/GetCallBackForm";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import bannerImage from "@/public/images/buy/banner8.png";
import img24Summer from "@/public/images/buy/img24_summer.jpg";
import img24Winter from "@/public/images/buy/img24_winter.jpg";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";

export default function PersonalFinance() {
    const t = useTranslations('Buy3.second');
    const tg = useTranslations('General');
    const { seasonType } = useGlobalContext();

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
                titleWidth="max-w-3xl"
                paraWidth="max-w-4xl"
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="flex flex-col gap-16">
                    <DynamicCard
                        image={`/images/buy/img23.jpg`}
                        title={t.rich(`title1`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc1`)}
                        isReverse={false}
                        index={0}
                    // btnText={tg('SWN')}
                    // url="/search-properties"
                    />

                    <div className="grid sm:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
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

                    <div className="flex justify-center">
                        <Button
                            variant={"outline"}
                            component="a"
                            onClick={() => handleButtonClick("CallBackCommercialFinance")}
                            className="px-5 !border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300"
                        >
                            {tg('getCallBack')}
                        </Button>
                    </div>

                    <DynamicCard
                        image={seasonType ? img24Summer : img24Winter}
                        title={t.rich(`title2`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                        })}
                        desc={t(`desc21`)}
                        // desc2={t.rich(`desc22`, {
                        //     link: (chunks) => <Link href="#" className="text-primary">{chunks}</Link>
                        // })}
                        isReverse={true}
                        index={2}
                    // btnText={tg('SWN')}
                    // url="/search-properties"
                    />

                    <div>
                        <h6 className="text-xl mb-6">
                            {t.rich(`subTitle1`, {
                                span: (chunks) => <span className="text-primary font-medium">{chunks}</span>
                            })}
                        </h6>

                        <div className="grid sm:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="col-span-1 border border-gray-200 p-4">
                                    <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                        {t('stepTitle' + (index + 4))}
                                    </p>

                                    <p>
                                        {t('stepDesc' + (index + 4))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h6 className="text-xl mb-6">
                            {t.rich(`subTitle2`, {
                                span: (chunks) => <span className="text-primary font-medium">{chunks}</span>
                            })}
                        </h6>

                        <div className="grid sm:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="col-span-1 border border-gray-200 p-4">
                                    <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                        {t('stepTitle' + (index + 7))}
                                    </p>

                                    <p>
                                        {t('stepDesc' + (index + 7))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-20">
                        <ContactSection
                            title={t("boxtitle1")}
                            desc={t("boxDesc11")}
                            btnText={tg("RACB")}
                            url="/contact-us"
                            isCallBack={true}
                            callBackAction={"CallBackCommercialFinance"}
                        />
                    </div>
                </div>

                <DynamicCard
                    image={`/images/buy/img25.jpg`}
                    title={t.rich(`title3`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                    desc={t(`desc3`)}
                    isReverse={false}
                    index={3}
                    btnText={tg('exploreEProperties')}
                    url="/search-properties"
                />

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 mb-20">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 10))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 10))}
                            </p>
                        </div>
                    ))}
                </div>

                <DynamicCard
                    image={`/images/buy/img19.jpeg`}
                    title={t.rich(`title4`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                    desc={t(`desc4`)}
                    isReverse={true}
                    index={4}
                // btnText={tg('SWN')}
                // url="/search-properties"
                />

                <div className="flex justify-center mt-10">
                    <Button
                        variant={"outline"}
                        component="a"
                        onClick={() => handleButtonClick("CallBackCommercialFinance")}
                        className="px-5 !border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300"
                    >
                        {tg('getCallBack')}
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 mb-20">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 14))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 14))}
                            </p>
                        </div>
                    ))}
                </div>

                <DynamicCard
                    image={`/images/buy/img27.jpg`}
                    title={t.rich(`title5`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                    desc={t(`desc5`)}
                    isReverse={false}
                    index={5}
                    btnText={tg('getCallBack')}
                    url="/search-properties"
                    isCallBack={true}
                    callBackAction={"CallBackNewLeadUSAResidentFianance"}
                />

                <div className="grid sm:grid-cols-3 gap-6 mt-10 mb-20">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 18))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 18))}
                            </p>
                        </div>
                    ))}
                </div>

                <DynamicCard
                    image={`/images/buy/img26.png`}
                    title={t.rich(`title6`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                    desc={t(`desc6`)}
                    isReverse={true}
                    index={6}
                    btnText={tg('SWN')}
                    url="/search-properties"
                />

                <div className="grid sm:grid-cols-2 gap-6 mt-10 mb-20">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('stepTitle' + (index + 21))}
                            </p>

                            <p>
                                {t('stepDesc' + (index + 21))}
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
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>
                </div>

                <Accordion type="single" collapsible className="w-full mb-10">
                    {[...Array(6)].map((_, index) => (
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

                    <div className="flex gap-2">
                        <div>
                            <BsCheckCircle size={20} className="text-primary" />
                        </div>
                        {t("li6")}
                    </div>

                    <div className="flex gap-2">
                        <div>
                            <BsCheckCircle size={20} className="text-primary" />
                        </div>
                        {t("li7")}
                    </div>
                </div>

                <div className="mt-20">
                    <ContactSection
                        title={t("boxtitle2")}
                        desc={t("boxDesc21")}
                        desc2={t("boxDesc22")}
                        btnText={tg("RACB")}
                        url="/contact-us"
                        isCallBack={true}
                        callBackAction={"CallBackCommercialFinance"}
                    />
                </div>

                <CallToAction />
            </div>
            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} />
            <NewsLetter />
        </div>
    )
}