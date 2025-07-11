
"use client";

import NewsLetter from "@/components/NewsLetter";
import logo from "@/public/images/logo1.png";
import { fetchGuidelines } from '@/services/api';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useGlobalContext } from "../context/GlobalContext";

export default function Terms() {
    const { loadingMain, setLoadingMain } = useGlobalContext();

    const [termsAndConditions, setTermsAndConditions] = useState([]);
    const [error, setError] = useState(null);
    const t = useTranslations('Footer');
    const tg = useTranslations('General');

    useEffect(() => {
        setLoadingMain(true);
        const fetchGuidelinesData = async () => {
            try {
                const data = await fetchGuidelines('web-cookie-policy');
                setTermsAndConditions(data);
                setLoadingMain(false);
            } catch (error) {
                setError(error);
                setLoadingMain(false);
            }
        };
        fetchGuidelinesData();
    }, []);

    return (
        <section className="bg-whitee">
            <div className="py-10 container mx-auto">
                <div className="flex justify-center items-center py-5">
                    <div className="w-full max-w-[220px]">
                        <Image className="w-full h-full" src={logo} alt="Profile Image" />
                    </div>
                </div>

                <div className="bg-white border border-gray-300 shadow-md rounded-lg flex flex-col justify-center gap-4">
                    <div className="border-b border-gray-300 p-5">
                        <h4 className="text-lg font-bold">{t('cookiePolicy')}</h4>
                    </div>

                    <div className="flex flex-col gap-5 p-5">
                        {loadingMain ? (
                            <div className="p-2 text-center">{tg('loading')}...</div>
                        ) : error ? (
                            <p className="text-red-500">{error.message}</p>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: termsAndConditions.content }} />
                        )}
                    </div>
                </div>
            </div>

            <NewsLetter />
        </section>
    );
}