"use client"
import CallToAction from "@/components/CallToAction";
import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import { Button } from "@/components/ui/button";
import bannerImage from "@/public/images/buy/banner4.jpg";
import { useTranslations } from "next-intl";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import GetCallBackForm from "@/components/custom-ui/GetCallBackForm";

const lmnpData = [
    { component: 'Structural Work (Main Frame)', period: '50 to 80 years', share: '40% to 55%' },
    { component: 'Roof', period: '25 years', share: '10%' },
    { component: 'Exterior Joinery', period: '20 to 25 years', share: '5% to 10%' },
    { component: 'Electrical Installations', period: '20 to 30 years', share: '5% to 10%' },
    { component: 'Waterproofing', period: '15 to 25 years', share: '5% to 8%' },
    { component: 'Interior Fittings', period: '12 to 15 years', share: '8% to 10%' },
    { component: 'Exterior Fittings', period: '15 years', share: '5% to 8%' },
    { component: 'Fitted Kitchen', period: '10 years', share: '5% to 7%' },
    { component: 'Plumbing / Heating', period: '10 to 15 years', share: '5% to 7%' },
    { component: 'Floor Coverings', period: '5 to 10 years', share: '2% to 5%' },
    { component: 'Paint / Wallpaper', period: '10 years', share: '2% to 4%' },
    { component: 'Furniture (Beds, Tables)', period: '5 to 10 years', share: '5% to 10%' },
    { component: 'Appliances', period: '5 to 10 years', share: '3% to 5%' }
];
export default function BuyTax() {
    const t = useTranslations('Buy1.forth');
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

    const images = [
        {
            img: "/images/buy/img10.png",
        },
        {
            img: "/images/buy/img11.png",
        }
    ]

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
                titleWidth="max-w-4xl"
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <h3 className="text-3xl lg:text-4xl font-normal text-neutral-900 mb-14">
                    {t.rich(`title`, {
                        span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>
                    })}
                </h3>

                <div className="grid sm:grid-cols-2 gap-6 mb-14">
                    {images.map((item, i) => (
                        <div key={i} className="col-span-1 aspect-[5/3] overflow-hidden relative">
                            <LazyImage src={item.img} alt="buy" className="object-cover object-top h-full w-full" />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 mb-10 border border-primary rounded-3xl p-6">
                    <p>
                        {t('para2')}
                    </p>

                    <p>
                        {t('para3')}
                    </p>

                    <p>
                        {t('para4')}
                    </p>

                    <p>
                        {t('para5')}
                    </p>

                    <p>
                        {t('para6')}
                    </p>
                </div>
                <div className="flex justify-center mb-10">
                    <Button
                        variant={"outline"}
                        component="a"
                        onClick={() => handleButtonClick('CallBackIncomeTaxPage')}
                        className="px-5 !border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300 group"
                    >
                        {tg('getCallBack')}
                        <BsArrowRight
                            size={20}
                            className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 text-primary group-hover:text-white"
                        />
                    </Button>
                </div>
                <div className="flex flex-col gap-4 mb-10">
                    <h3 className="text-2xl lg:text-3xl font-normal mb-4">
                        {t.rich(`lmnpTitle`, {
                            span: (chunks) => <span className="text-primary font-alt flex">{chunks}</span>,
                            bold: (chunks) => <span className="font-bold">{chunks}</span>
                        })}
                    </h3>

                    <div className="rounded-lg overflow-hidden border border-primary">
                        <div className="overflow-x-auto ">
                            <table className="min-w-full md:text-lg text-left">
                                <thead className="bg-primary/15">
                                    <tr>
                                        <th className="border-r border-primary px-4 py-2 text-sm">{t('component')}</th>
                                        <th className="border-r border-primary px-4 py-2 text-sm">{t('depreciationPeriod')}</th>
                                        <th className="px-4 py-2 text-sm">{t('estimatedShare')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lmnpData.map((item, idx) => (
                                        <tr key={idx} className="border-t border-primary">
                                            <td className="border-r border-primary px-4 py-2 text-sm">{item.component}</td>
                                            <td className="border-r border-primary px-4 py-2 text-sm">{item.period}</td>
                                            <td className="px-4 py-2 text-sm">{item.share}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
                    <h4 className="text-dark text-lg text-center font-medium">
                        {t('para7')}
                    </h4>

                    <Button onClick={() => handleButtonClick('CallBackNewLeadIncomeDepreciation')} className="group rounded-full border border-primary hover:bg-primary hover:text-white font-medium w-fit flex items-center gap-2 px-4 py-2">
                        {tg("getCallBack")}
                        <BsArrowRight
                            size={20}
                            className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 text-white"
                        />
                    </Button>
                </div>

                <CallToAction />
            </div>
            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} />
            <NewsLetter />
        </div>
    )
}