'use client';

import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import TestimonialSlider from "@/components/TestimonialSlider";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import gvossymbol from "@/public/images/gvossymbol.png";
import logoSm from "@/public/images/logo_sm_black.png";
import partner from "@/public/images/static/partner.png";
import { useTranslations } from "next-intl";
import { BsGlobe } from "react-icons/bs";
import { IoLayersOutline } from "react-icons/io5";
import { RiLinksFill } from "react-icons/ri";

export default function BecomeAPartner() {
    const t = useTranslations('becomeAPartner');
    const tg = useTranslations('General');
    const tfaq = useTranslations('faq');

    const testimonial = [
        {
            name: "Louisa Acreman",
            designation: "Portes Du Soleil & Grand Massif Alpine Manager",
            src: "/",
            fallback: "LA",
            commentEn: "Our GVOS back-office CRM enables us to engage with clients professionally, efficiently, and with real impact. Having worked with numerous CRM systems over the past 20+ years for national developers, I can confidently say GVOS is the most intuitive by far. It streamlines the entire information-sharing process, saving hours typically spent preparing and sending development details.",
            commentFr: "Notre CRM GVOS back-office nous permet d'interagir avec les clients de manière professionnelle, efficace et avec un impact réel. Ayant travaillé avec de nombreux systèmes CRM au cours des 20 dernières années pour des développeurs nationaux, je peux affirmer avec confiance que GVOS est le plus intuitif de tous. Il simplifie tout le processus de partage d'informations, ce qui nous permet de gagner des heures que nous passions autrefois à préparer et envoyer des informations sur les développements.",
        },
        {
            name: "Oliver Pugh",
            designation: "Director Sphere Estates",
            src: "/",
            fallback: "OP",
            commentEn: "As a small team covering a huge geographical area, the challenge is to supply accurate and timely information to our buyers in an efficient way. Daniel and his Greenstone team have this in the GVOS platform and with their agile response we can supply timely solutions to produce the opportunities to make sales.",
            commentFr: "En tant qu'équipe réduite couvrant un vaste territoire géographique, le défi est de fournir des informations précises et opportunes à nos acheteurs de manière efficace. Daniel et son équipe Greenstone ont cela dans la plateforme GVOS et avec leur réponse agile, nous pouvons fournir des solutions opportunes pour produire des opportunités de vente.",
        },
        {
            name: "Nick Dowlatshahi",
            designation: "Founder Avecoeur",
            src: "/",
            fallback: "ND",
            commentEn: "Through Gvos we are able to designate the commission share structure depending on the tasks performed by each of our agencies for each sale through Gvos. It comes in particularly handy when you have a small team but know you can lean on your dependable partners within the network to look after portions or all of the sales cycle.",
            commentFr: "Using Gvos, we can allocate commission share structures based on each agency's contributions to the sales process. This is especially useful for smaller teams, as it allows us to rely on trusted partners within the network to manage parts or all of the sales cycle.",
        },
        {
            name: "Kim Eeles",
            designation: "Founder Blue Sky International property",
            src: "/",
            fallback: "KE",
            commentEn: "Gvos has reduced my workload tenfold, it does tasks that used to take me 30-40mins each, to doing it within 30secs. All the required properties, plans, brochures are there, all my deals and the stages they are at are visible, I can see when my partners are doing site visits, when they have closed deals, my fees & provisional cashflow, and notes all along the way. Quite remarkable really. Kim Eeles - Founder Blue Sky International property.",
            commentFr: "Gvos has significantly streamlined my workload, completing tasks in 30 seconds that previously took 30-40 minutes. It provides access to all required properties, plans, and brochures, while making the status of my deals and their stages visible. I can monitor my partners' site visits, deal closures, fees, provisional cashflow, and accompanying notes. Truly remarkable. Kim Eeles - Founder, Blue Sky International Property.",
        },
    ];

    const bannerTitle = t.rich('bannerTitle', {
        font: (chunks) => <span className="font-alt">{chunks}</span>,
        span: (chunks) => <span className="flex">{chunks}</span>
    });

    const bannerDesc = t.rich('bannerDesc', {
        font: (chunks) => <span className="font-bold">{chunks}</span>,
        font1: (chunks) => <span className="font-bold">{chunks}</span>,
        font2: (chunks) => <span className="font-bold">{chunks}</span>,
        font3: (chunks) => <span className="font-bold">{chunks}</span>,
        font4: (chunks) => <span className="font-bold">{chunks}</span>,
    });

    return (
        <div className="bg-whitee">
            {/* <CommonBanner
                title={bannerTitle}
                bannerImage={bannerImage}
                desc={bannerDesc}
                desc2=""
                avatars={[]}
                titleWidth="max-w-3xl"
                type={2}
            /> */}

            <CommonBanner
                title={bannerTitle}
                bannerImage="/videos/partner_banner.mov"
                desc={bannerDesc}
                desc2=""
                avatars={[]}
                titleWidth="max-w-3xl"
                type={2}
                isVideo
            />

            <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
                <div className="grid sm:grid-cols-2 gap-6 lg:gap-10 mb-16" data-aos="zoom-in" data-aos-delay="50" data-aos-offset="100">
                    <div>
                        <div className="aspect-[5/4] overflow-hidden">
                            <LazyImage src={partner.src} alt="Team" className="object-cover h-full w-full" />
                        </div>
                    </div>

                    <div className="grow flex flex-col justify-between">
                        <div>
                            <span className="text-2xl lg:text-3xl text-primary font-alt">
                                {t('label')}
                            </span>
                            <h3 className="max-w-md text-3xl lg:text-4xl font-normal text-neutral-900 mb-5">
                                {t('sectionTitle')}
                            </h3>

                            <a target="_blank" href="https://www.gvoscrm.io" className='flex max-w-36'>
                                <img className="w-full" src={logoSm.src} />
                            </a>
                        </div>

                        <div className="flex flex-col gap-3 justify-start">
                            <p>
                                {t('sectionPara')}
                            </p>

                            <a className="flex w-fit bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 py-2 has-[>svg]:px-3 rounded-md px-5" target="_blank" href="https://www.gvoscrm.io/">
                                {tg('visitGvos')}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="col-span-1 border border-gray-200 p-4">
                            <span className="w-8 h-8 flex justify-center items-center bg-primary text-white mb-6 text-xs">
                                0{index + 1}
                            </span>

                            <p className="text-2xl mb-1 font-alt text-primary font-medium">
                                {t('title' + (index + 1))}
                            </p>

                            <p>
                                {t('desc' + (index + 1))}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-sm text-primary mb-16">
                    {t('note')}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-16">
                    <div className="col-span-1 border border-primary/15 bg-primary/5 p-6 lg:p-8">
                        <img className="mb-8" src={gvossymbol.src} alt="logo" width={50} />

                        <p className="text-2xl mb-5">
                            {t.rich(`cardTitle1`, {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </p>

                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 text-sm">
                                <span className="w-5 flex justify-center">
                                    <BsGlobe size={18} className="text-primary" />
                                </span>
                                <div>
                                    <span className="font-semibold">{t('line1')}</span> : <a className="hover:text-primary" target="_blank" href="https://www.gvoscrm.io">www.gvoscrm.io</a>
                                </div>
                            </div>

                            <div className="flex gap-2 text-sm">
                                <span className="w-5 flex justify-center">
                                    <IoLayersOutline size={22} className="text-primary" />
                                </span>
                                <div>
                                    <span className="font-semibold">{t('line5')}</span> : {t('line6')}
                                </div>
                            </div>

                            <div className="flex gap-2 text-sm">
                                <span className="w-5 flex justify-center">
                                    <RiLinksFill size={18} className="text-primary" />
                                </span>
                                <div>
                                    <span className="font-semibold">{t('line3')}</span> : 0034JsUd0o
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 border border-primary/15 bg-primary/5 p-6 lg:p-8">
                        <img className="mb-8" src={gvossymbol.src} alt="logo" width={50} />

                        <p className="text-2xl mb-1">
                            {t.rich(`cardTitle2`, {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </p>

                        <p>
                            {t.rich("cardSubTitle", {
                                span: (chunks) => <a target="_blank" href="tel:02056242486" className="text-primary">{chunks}</a>
                            })}
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10 lg:mt-0 mb-5">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </h2>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <p className="mb-4">
                            {t('testimonialsDesc')}</p>
                    </div>
                </div>

                <div className="mb-16">
                    <TestimonialSlider items={testimonial} />
                </div>

                {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                    {testimonial && testimonial.map((item, index) => (
                        <div key={index} className="border p-6 flex flex-col justify-between">
                            <p className="mb-8">
                                {t(`testimonials${index + 1}`)}
                            </p>

                            <div className="flex items-center gap-4">
                                <Avatar key={index} className="w-14 h-14 border-2 border-white">
                                    <AvatarImage src={item.src} />
                                    <AvatarFallback>{item.fallback}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="text-lg font-semibold">{item.name}</h4>
                                    <p className="text-gray-500 text-sm">{item.designation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}

                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10 lg:mt-0 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                            {tg.rich('faqTitle', {
                                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                            })}
                        </h2>
                    </div>

                    {/* <div className="col-span-1 md:col-span-3">
                        <p className="mb-4 max-w-xl">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div> */}
                </div>

                <div>
                    <Accordion type="single" collapsible className="w-full">
                        {[...Array(5)].map((_, index) => (
                            <AccordionItem key={index} value={`item-${index + 1}`} className="!border px-3 mb-3">
                                <AccordionTrigger type={2}>
                                    {tfaq(`ques${index + 1}`)}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {tfaq.rich(`ans${index + 1}`, {
                                        font: (chunks) => <span className="font-bold">{chunks}</span>,
                                        font1: (chunks) => <span className="font-bold">{chunks}</span>
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            <NewsLetter />
        </div>
    )
}