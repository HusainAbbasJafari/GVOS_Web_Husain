'use client';

import { Input } from "@/components/ui/input";
import newsletter1 from "@/public/images/newsletter.png";
import newsletter2 from "@/public/images/newsletter2.png";
import { getImageSrc } from "@/utility/general";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { joinNewsletter } from '@/services/api';
import { toast } from 'sonner';
import { useState } from 'react';
import Loader from '@/components/custom-ui/Loader';
import LazyImage from "./LazyImage";
import { useGlobalContext } from "@/app/context/GlobalContext";

const NewsLetter = () => {
    const { seasonType } = useGlobalContext();

    const th = useTranslations('Header');
    const t = useTranslations('Footer');
    const tg = useTranslations('General');

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            toast.error(t("fillEmail"), {
                description: t("emailCannotBeEmpty"),
            });
            setTimeout(() => {
                setLoading(false);
            }, 100);
            return;
        }
        if (!validateEmail(trimmedEmail)) {
            toast.error(t("invalidEmail"), {
                description: t("emailInvalid"),
            });
            setTimeout(() => {
                setLoading(false);
            }, 100);
            return;
        }
        try {
            const response = await joinNewsletter(trimmedEmail);
            toast.success(t("subscriptionSuccess"), {
                description: t("subscriptionSuccessDesc"),
            });
        } catch (error) {
            toast.error(t("subscriptionFailed"), {
                description: t("subscriptionFailedDesc"),
            });
        } finally {
            setEmail("");
            setLoading(false);
        }
    };

    return (

        <div className="bg-gray-200 relative md:min-h-[420px] xl:min-h-[450px] flex items-center justify-center flex-wrap">
            {loading && <Loader />}
            <div className="container flex justify-center md:justify-between text-center md:text-left lg:relative">
                <div className="max-w-xs lg:max-w-md py-6 flex flex-col justify-center items-center md:items-start">
                    <h4 className="text-4xl font-normal mb-3">
                        {t.rich('newsTitle', {
                            span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
                        })}
                    </h4>
                    <p className="mb-8 text-xs">
                        {t("newsDesc")}
                    </p>
                    <Input type="text" placeholder={t('enterYourEmail')} className="w-full !bg-white border-gray-50 !rounded-md !px-3 !py-2 !outline-0 !shadow-none !text-xs placeholder:text-xs" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Button onClick={handleSubmit} className="!rounded-md mt-5 px-5 w-fit">
                        {t('subscribe')}
                    </Button>
                </div>
            </div>

            <div className="hidden md:flex items-end justify-end md:absolute w-full max-w-lg lg:max-w-2xl xl:max-w-3xl h-full right-0 bottom-0">
                <LazyImage src={getImageSrc(seasonType ? newsletter2 : newsletter1)} alt="Team" className="object-contain max-h-[380px] xl:max-h-[420px]" />
            </div>
        </div>
    );
}

export default NewsLetter;