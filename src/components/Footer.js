import { useGlobalContext } from "@/app/context/GlobalContext";
import logo from "@/public/images/footer_logo.png";
import { useTranslations } from "next-intl";
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { fetchClientInfo } from "@/services/api";
import { useEffect, useState } from "react";

const Footer = () => {
    const { areaGuideSlug } = useGlobalContext();

    const th = useTranslations('Header');
    const t = useTranslations('Footer');
    const tg = useTranslations('General');

    const [clientInfo, setClientInfo] = useState(null);
    useEffect(() => {
        const fetchInfo = async () => {
            const info = await fetchClientInfo();
            setClientInfo(info);
        };
        fetchInfo();
    }, []);
    return (
        <footer className='bg-white relative'>
            <div className='bg-white'>
                <div className='container'>
                    <div className='py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center'>
                        <div className='col-span-1 md:col-span-4 lg:col-span-3'>
                            <div className="md:w-fit flex items-center flex-col gap-4 mb-5 md:mb-0">
                                <Link href="/">
                                    <Image src={logo} alt="GreenStone Logo" className='max-w-50' />
                                </Link>

                                <div className='flex gap-2 items-center'>
                                    {clientInfo && clientInfo?.branding?.facebook_url && (
                                        <Link href={clientInfo.branding.facebook_url} target="_blank" className='w-8 h-8 border border-gray-300 flex justify-center items-center'>
                                            <FaFacebookF size={16} className="text-primary" />
                                        </Link>
                                    )}
                                    {clientInfo && clientInfo?.branding?.instagram_url && (
                                        <Link href={clientInfo.branding.instagram_url} target="_blank" className='w-8 h-8 border border-gray-300 flex justify-center items-center'>
                                            <FaInstagram size={16} className="text-primary" />
                                        </Link>
                                    )}
                                    {clientInfo && clientInfo?.branding?.linkedin_url && (
                                        <Link href={clientInfo.branding.linkedin_url} target="_blank" className='w-8 h-8 border border-gray-300 flex justify-center items-center'>
                                            <FaLinkedinIn size={16} className="text-primary" />
                                        </Link>
                                    )}
                                    {clientInfo && clientInfo?.branding?.youtube_url && (
                                        <Link href={clientInfo.branding.youtube_url} target="_blank" className='w-8 h-8 border border-gray-300 flex justify-center items-center'>
                                            <FaYoutube size={16} className="text-primary" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='col-span-1 md:col-span-8 lg:col-span-9'>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 text-sm text-">
                                <div className='col-span-1 sm:col-span-1 md:col-span-2'>
                                    <h4 className="text-lg mb-3">{t('menu')}</h4>
                                    <ul className="space-y-2 mb-4">
                                        <li><Link href="/buy" className="font-normal hover:text-primary">{th('menu1')}</Link></li>
                                        <li><Link href="/sell/skyrocket" className="font-normal hover:text-primary">{th('menu2')}</Link></li>
                                        <li><Link href="/rent" className="font-normal hover:text-primary">{th('menu3')}</Link></li>
                                        <li><Link href="/area-guides" className="font-normal hover:text-primary">{th('menu4')}</Link></li>
                                        <li><Link href="/become-a-partner" className="font-normal hover:text-primary">{th('menu5')}</Link></li>
                                        <li><Link href="/contact-us" className="font-normal hover:text-primary">{tg('contactUs')}</Link></li>
                                    </ul>
                                </div>

                                <div className='col-span-1 sm:col-span-1 md:col-span-2'>
                                    <h4 className="text-lg mb-3">{t('quickLinks')}</h4>
                                    <ul className="space-y-2 mb-4">
                                        <li><Link href="/about-us" className="font-normal hover:text-primary">{tg('aboutUs')}</Link></li>
                                        <li><Link href="/team" className="font-normal hover:text-primary">{tg('meet')}</Link></li>
                                        <li><Link href="/careers" className="font-normal hover:text-primary">{tg('careers')}</Link></li>
                                        <li><Link href="/sitemap" className="font-normal hover:text-primary">{tg('sitemap')}</Link></li>
                                        <li><Link href="#" className="font-normal hover:text-primary">{t('reviews')}</Link></li>
                                        <li><Link href="#" className="font-normal hover:text-primary">{t('contactArea')}</Link></li>
                                        <li><Link href="#" className="font-normal hover:text-primary">{t('siteVisits')}</Link></li>
                                    </ul>
                                </div>

                                <div className='col-span-2 sm:col-span-2 md:col-span-3'>
                                    <h4 className="text-lg mb-3">{t('services')}</h4>
                                    <ul className="space-y-2">
                                        <li><Link href="become-a-partner" className="font-normal hover:text-primary">{t('service1')}</Link></li>
                                        <li><Link href="become-a-partner" className="font-normal hover:text-primary">{t('service2')}</Link></li>
                                        <li>
                                            <Link href="become-a-partner" className="font-normal hover:text-primary">
                                                <h5 className="text-sm font-semibold">{t('service3')}</h5>
                                            </Link>
                                            <ul className="ms-4 mt-1">
                                                <li><Link href="buy/finance_your_french_future" className="font-normal hover:text-primary">{t('service3a')}</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link href="become-a-partner" className="font-normal hover:text-primary">{t('service4')}</Link></li>
                                        <li><Link href="become-a-partner" className="font-normal hover:text-primary">{t('service5')}</Link></li>
                                        <li>
                                            <h5 className="text-sm font-semibold">{t('service6')}</h5>
                                            <ul className="ms-4 mt-1">
                                                <li><Link href="buy/aftersales" className="font-normal hover:text-primary">{t('service6a')}</Link></li>
                                                <li><Link href="buy/aftersales" className="font-normal hover:text-primary">{t('service6b')}</Link></li>
                                                <li><Link href="buy/aftersales" className="font-normal hover:text-primary">{t('service6c')}</Link></li>
                                            </ul>
                                        </li>

                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white border-t border-gray-200 pt-2 pb-4'>
                <div className='container'>
                    <div className="flex items-center md:justify-between gap-2 flex-col md:flex-row">
                        <p className="text-xs text-center">Copyright 2025 GREENSTONE. All rights reserved.</p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <div className="flex items-center gap-3">
                                <Link href="/terms-and-conditions" className="text-nowrap font-normal text-xs text-gray-500 hover:text-primary">{t('termsConditions')}</Link>
                                <Link href="/privacy-policy" className="text-nowrap font-normal text-xs text-gray-500 hover:text-primary">{t('privacyPolicy')}</Link>
                                <Link href="/cookie-policy" className="text-nowrap font-normal text-xs text-gray-500 hover:text-primary">{t('cookiePolicy')}</Link>
                            </div>
                            <div>
                                <img
                                    className="h-[60px]"
                                    src="/images/brands/mortagelogo_gray.png"
                                    alt="mortagelogo_gray"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;