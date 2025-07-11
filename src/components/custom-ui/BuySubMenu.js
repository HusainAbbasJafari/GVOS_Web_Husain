"use client";
import menuImgSummer from "@/public/images/menuImgSummer.jpg";
import menuImgWinter from "@/public/images/menuImgWinter.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useGlobalContext } from "@/app/context/GlobalContext";
import LazyImage from "../LazyImage";
import { getImageSrc } from "@/utility/general";


export default function BuySubMenu() {
    const { seasonType } = useGlobalContext();

    const router = useRouter();
    const tg = useTranslations('General');
    const buy1 = useTranslations('Buy1');
    const buy2 = useTranslations('Buy2');
    const buy3 = useTranslations('Buy3');

    const [searchType, setSearchType] = useState(["new_build", "property_for_sale"]);

    const handleViewProperties = () => {
        const filters = Array.isArray(searchType) ? searchType : [searchType];
        const queryString = new URLSearchParams();
        filters.forEach(filter => queryString.append('listing_type', filter));
        router.push(`/search-properties?${queryString.toString()}`);
    };

    return (
        <div className="lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto flex flex-col lg:flex-row gap-4 me-[-14px] pe-[14px]">
            <div className="h-full w-full max-w-[260px] text-center">
                <div className="w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden mb-2 mx-auto">
                    <LazyImage src={seasonType ? menuImgSummer : menuImgWinter} alt="property" className="h-full w-full object-cover" />
                </div>

                <div className="flex gap-3 flex-wrap my-6">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="new_build"
                            checked={searchType.includes("new_build")}
                            onCheckedChange={(checked) => {
                                setSearchType((prev) =>
                                    checked
                                        ? [...prev, "new_build"]
                                        : prev.filter((val) => val !== "new_build")
                                );
                            }}
                        />
                        <Label className="text-nowrap" htmlFor="new_build">{tg('newBuild')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="property_for_sale"
                            checked={searchType.includes("property_for_sale")}
                            onCheckedChange={(checked) => {
                                setSearchType((prev) =>
                                    checked
                                        ? [...prev, "property_for_sale"]
                                        : prev.filter((val) => val !== "property_for_sale")
                                );
                            }}
                        />
                        <Label className="text-nowrap" htmlFor="property_for_sale">{tg('propertyForSale')}</Label>
                    </div>
                </div>

                <Button component="a" size="lg" onClick={handleViewProperties} className="!rounded-full border border-primary hover:!bg-white hover:!text-primary">
                    {tg("viewProperties")}
                </Button>

                {/* <Link href="/search-properties" className="hover:text-primary mb-0">View all <span className="text-primary">{searchType}</span> properties</Link> */}
            </div>

            <div className="h-full flex flex-col lg:flex-row justify-between gap-3 lg:gap-4">
                <div className="lg:w-1/3 flex flex-col gap-3 bg-gray-50 rounded-2xl px-4 pt-5 pb-3 text-center">
                    <h3 className="py-2 text-lg leading-snug font-bold border-b-1 border-gray-300 min-h-16 flex items-center">
                        {buy1('title')}
                    </h3>

                    <ul className="list-none list-inside text-left space-y-2">
                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <Link href="/buy/france">
                                <p className="text-primary text-sm font-bold leading-tight mb-1">
                                    {buy1.rich('bannerTitle', {
                                        span: (chunks) => <span>{chunks}</span>
                                    })}
                                </p>

                                <p className="text-black font-normal text-xs">
                                    {buy1('menuDesc')}
                                </p>
                            </Link>
                        </li>

                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/vat" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy1.rich('second.bannerTitle', {
                                            span: (chunks) => <span>{chunks}</span>
                                        })}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy1('second.bannerDesc')}
                                    </p>
                                </Link>
                            </div>
                        </li>

                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/us" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy1.rich('third.bannerTitle', {
                                            span: (chunks) => <span>{chunks}</span>
                                        })}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy1('third.subTitle')}
                                    </p>
                                </Link>
                            </div>
                        </li>

                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/tax" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy1.rich('forth.bannerTitle', {
                                            span: (chunks) => <span>{chunks}</span>
                                        })}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy1('forth.subTitle')}
                                    </p>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="lg:w-1/3 flex flex-col gap-3 bg-gray-50 rounded-2xl px-4 pt-5 pb-3 text-center">
                    <h3 className="py-2 text-lg leading-snug font-bold border-b-1 border-gray-300 min-h-16 flex items-center">
                        {buy2('title')}
                    </h3>
                    <ul className="list-none list-inside text-left space-y-2">
                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/aftersales#aftersales_1" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy2('menuTitle1')}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy2('menuDesc1')}
                                    </p>
                                </Link>
                            </div>
                        </li>

                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/aftersales#aftersales_2" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy2('menuTitle2')}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy2('menuDesc2')}
                                    </p>
                                </Link>
                            </div>
                        </li>

                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/aftersales#aftersales_3" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy2('menuTitle3')}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy2('menuDesc3')}
                                    </p>
                                </Link>
                            </div>
                        </li>

                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/aftersales#aftersales_4" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy2('menuTitle4')}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy2('menuDesc4')}
                                    </p>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="lg:w-1/3 flex flex-col gap-3 bg-gray-50 rounded-2xl px-4 pt-5 pb-3 text-center">
                    <Link href="/buy/finance_your_french_future" className="py-2 text-lg leading-snug font-bold border-b-1 border-gray-300 min-h-16 flex items-center">
                        {buy3('title')}
                    </Link>

                    <ul className="list-disc list-inside text-left space-y-2">
                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/personal_finance_your_way" className="text-primary font-bold ">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy3('menuTitle1')}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {buy3('menuDesc1')}
                                    </p>
                                </Link>
                            </div>
                        </li>
                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/launch_your_french_property_empire" className="text-primary font-bold ">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy3('menuTitle2')}
                                    </p>

                                    <p className="text-black font-normal text-xs">
                                        {buy3('menuDesc2')}
                                    </p>
                                </Link>
                            </div>
                        </li>
                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/buy/smart_currency_exchange" className="text-primary font-bold ">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {buy3('menuTitle3')}
                                    </p>

                                    <p className="text-black font-normal text-xs">
                                        {buy3('menuDesc3')}
                                    </p>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}