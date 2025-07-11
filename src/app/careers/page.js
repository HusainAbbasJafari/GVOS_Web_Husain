'use client';

import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import ContactSection from "@/components/custom-ui/ContactSection";
import { InputFile } from "@/components/custom-ui/InputFile";
import Loader from "@/components/custom-ui/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import career1 from "@/public/images/static/career_1.jpg";
import bannerImage from "@/public/images/static/career_banner.jpg";
import { submitCareersForm, fetchAdvisorCount } from "@/services/api";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsArrowRight, BsClock } from 'react-icons/bs';
import { LuMapPin } from "react-icons/lu";
import { toast } from "sonner";
import { useGlobalContext } from "../context/GlobalContext";

export default function Careers() {
    const { language } = useGlobalContext();
    const t = useTranslations('careers');
    const tg = useTranslations('General');
    const tf = useTranslations('form');

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [resume, setResume] = useState("");
    const [advisorCount, setAdvisorCount] = useState([]);

    const testimonial = [
        {
            name: "Louisa Acreman",
            designation: "Real Estate Advisor",
            src: "/",
            fallback: "LA",
            commentEn: "Working alongside Daniel and Bouchra is an absolute pleasure and knowing that I am supported by such an experienced and dedicated team, means that I can spend time what I do best, Selling and Managing my network, and can leave the French admin hurdles to be looked after by my French speaking colleagues. ",
            commentFr: "Travailler aux côtés de Daniel et Bouchra est un plaisir absolu et savoir que je suis soutenu par une équipe aussi expérimentée et dévouée signifie que je peux me concentrer sur ce que je fais de mieux, vendre et gérer mon réseau, et laisser les obstacles administratifs français être pris en charge par mes collègues francophones."
        },
        {
            name: "Bouchra Sahiti",
            designation: "Head of Sales Progression",
            src: "/",
            fallback: "BS",
            commentEn: "Over the years we'd created a great working dynamic with Daniel and Louisa, they are great fun and absoloutly lovely to deal with on a daily basis. Being in a naturally positive and progressive enviroment makes what we do so much easier when challenges cross our paths. Looking forward to the years ahead",
            commentFr: "Au fil des ans, nous avons créé une excellente dynamique de travail avec Daniel et Louisa, ils sont très agréables et absolument charmants à traiter au quotidien. Etre dans un environnement naturellement positif et progressif rend ce que nous faisons tellement plus facile lorsque des défis se présentent. Nous nous réjouissons des années à venir",
        },
        
    ];

    const bannerTitle = t.rich('bannerTitle', {
        font: (chunks) => <span className="font-alt">{chunks}</span>,
        span: (chunks) => <span className="flex">{chunks}</span>
    });

    const validateEmail = (email) => {
        // Regular expression for a valid email address
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Trim all values
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedLocation = location.trim();

        // Validate trimmed values
        if (
            !trimmedName ||
            !trimmedEmail ||
            !trimmedLocation
        ) {
            toast.error("Please fill out all fields", {
                description: "Fields cannot be empty or just spaces.",
            });
            setTimeout(() => {
                setLoading(false);
            }, 100);
            return;
        }

        // Validate email format
        if (!validateEmail(trimmedEmail)) {
            toast.error("Invalid email address", {
                description: "Please enter a valid email address.",
            });
            setTimeout(() => {
                setLoading(false);
            }, 100);
            return;
        }

        try {
            const formData = {
                name: trimmedName,
                email: trimmedEmail,
                location: trimmedLocation,
                resume: resume
            };

            const res = await submitCareersForm(formData);

            if (res && res.status === true) {
                toast.success("Request submitted!", {
                    description: "We'll get back to you shortly.",
                });

                setName("");
                setEmail("");
                setLocation("");
                setResume("")
            } else {
                const errorsMsg = res?.response?.data?.errors;

                toast.error(res?.response?.data?.message || "Submission failed", {
                    description: errorsMsg.name || errorsMsg.email || errorsMsg.location || errorsMsg.resume || "Something went wrong."
                });
            }

            setTimeout(() => {
                setLoading(false);
            }, 100);

        } catch (error) {
            toast.error("Submission failed", {
                description: error?.response?.data?.message || "Something went wrong.",
                action: {
                    label: "Retry",
                    onClick: handleSubmit,
                },
            });

            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    };

    useEffect(() => {
        async function loadData() {
            try {
                const advisorCount = await fetchAdvisorCount();
                setAdvisorCount(advisorCount);

            } catch (error) {
                console.error('Error loading master search data:', error);
            }
        }
        loadData();
    }, []);

    if (loading) return <Loader message="Please Wait..." />;

    return (
        <div className="bg-whitee">
            <CommonBanner
                title={bannerTitle}
                bannerImage={bannerImage}
                desc={t('bannerDesc')}
                desc2=""
                avatars={[]}
                titleWidth="max-w-2xl"
                type={2}
                isCareers={true}
            />

            <div className="careers_b">
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
                            <p className="max-w-xl">
                                {t('desc')}
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="col-span-1 border border-gray-200 p-4">
                                <img className="mb-8" src={`/images/icons/icon${index + 1}.png`} alt={`icon${index}`} width={50} />

                                <p className="text-2xl mb-5">
                                    {t.rich(`cardTitle${index + 1}`, {
                                        span: (chunks) => <span className="text-primary font-alt">{chunks}</span>,
                                        flex: (chunks) => <span className="flex">{chunks}</span>
                                    })}
                                </p>

                                <p>
                                    {t.rich(`cardDesc${index + 1}`, {
                                        bold: (chunks) => <span className="font-bold">{chunks}</span>,
                                        bold1: (chunks) => <span className="font-bold">{chunks}</span>,
                                        bold2: (chunks) => <span className="font-bold">{chunks}</span>
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 lg:gap-10 mb-20" data-aos="zoom-in" data-aos-delay="50" data-aos-offset="100">
                        <div className="sm:order-2">
                            <div className="aspect-[5/4] overflow-hidden">
                                <LazyImage src={career1.src} alt="Team" className="object-cover h-full w-full" />
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

                                <p>
                                    {t.rich("sectionDesc", {
                                        bold: (chunks) => <span className="font-bold">{chunks}</span>,
                                        bold1: (chunks) => <span className="font-bold">{chunks}</span>,
                                        bold2: (chunks) => <span className="font-bold">{chunks}</span>
                                    })}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: t('badge1'), value: (advisorCount?.advisors_count ?? 0) + "+" },
                                    { label: t('badge2'), value: (advisorCount?.countries_count ?? 0) + "+" },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-2xl lg:text-3xl font-bold text-neutral-900">{stat.value}</div>
                                        <div className="text-sm text-muted">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mb-20">
                        <ContactSection
                            desc={t.rich("contactUsDesc", {
                                font1: (chunks) => <span className="font-alt">{chunks}</span>,
                                font2: (chunks) => <span className="font-alt">{chunks}</span>
                            })}
                            descclassName="max-w-2xl text-2xl"
                            btnText={tg("contactUs")}
                            url="/contact-us"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6 mb-20">
                        {testimonial && testimonial.map((item, index) => (
                            <div key={index} className="border p-6">
                                <p className="mb-8">
                                    {language === 'en' ? item.commentEn : item.commentFr}
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
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 my-10 scroll_top_margin size_xl" id="currentOpenings">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
                                {t.rich('currentOpenings', {
                                    font: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                                })}
                            </h2>
                        </div>

                        <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
                            <p className="max-w-xl">
                                {t("currentOpeningsDesc")}
                            </p>

                            <p className="max-w-xl">
                                {t("currentOpeningsDesc1")}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mb-20">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-10 border p-3 lg:p-5">
                                <div>
                                    <h4 className="text-2xl font-medium">
                                        {t("coTitle" + (index + 1))}
                                    </h4>

                                    <div className="flex items-center gap-4 my-4">
                                        <div className="flex items-center gap-2">
                                            <BsClock size={20} className="text-primary" />
                                            <span>{t("coJobType" + (index + 1))}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <LuMapPin size={22} className="text-primary" />
                                            <span>
                                                {t("coLocation" + (index + 1))}
                                            </span>
                                        </div>
                                    </div>

                                    <p>
                                        {t("coDesc" + (index + 1))}
                                    </p>
                                </div>

                                <div>
                                    <Button type="button" className="!rounded-none !py-3 !px-5 !h-auto">
                                        {tg("applyNow")}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 border border-primary/15 bg-primary/5 grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Side */}
                        <div>
                            <h2 className="text-4xl">
                                {t.rich('formTitle', {
                                    font: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                                })}
                            </h2>
                            <p className="mt-6">
                                {t('formDesc')}
                            </p>
                        </div>

                        {/* Right Side - Form */}
                        <form className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="font-semibold block mb-1">
                                    {tf("label1")}
                                </Label>
                                <Input
                                    className="bg-white text-sm !rounded-md px-4"
                                    id="name"
                                    type="text"
                                    placeholder={tf("placeHolder1")}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" className="font-semibold block mb-1">
                                    {tf("label2")}
                                </Label>
                                <Input
                                    className="bg-white text-sm !rounded-md px-4"
                                    id="email"
                                    type="email"
                                    placeholder={tf("placeHolder2")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="location" className="font-semibold block mb-1">
                                    {tf("label3")}
                                </Label>
                                <Input
                                    className="bg-white text-sm !rounded-md px-4"
                                    id="location"
                                    type="text"
                                    placeholder={tf("placeHolder3")}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="resumeUpload" className="font-semibold block mb-1">
                                    {tf("label4")}
                                </Label>
                                <InputFile
                                    name="resume"
                                    id="resumeUpload"
                                    placeholder={tf("placeHolder4")}
                                    wrapperclassName="bg-white text-sm !rounded-md"
                                    buttonclassName="bg-blue-100 text-blue-600"
                                    fileNameclassName="text-blue-400"
                                    onChange={(file) => setResume(file)}
                                />
                            </div>

                            <Button
                                type="button" onClick={handleSubmit}
                                className="!rounded-md w-full mt-6 bg-primary/95 hover:bg-primary py-3"
                            >
                                {tf("submit")}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>

            <NewsLetter />
        </div>
    )
}