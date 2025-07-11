"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import menuImgSummer from "@/public/images/menuImgSummer.jpg";
import menuImgWinter from "@/public/images/menuImgWinter.jpg";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LazyImage from "../LazyImage";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";


export default function AreaGuideSubMenu({ areaGuideList, setAreaGuideMenu }) {
    const { seasonType } = useGlobalContext();
    const router = useRouter();
    const tg = useTranslations('General');

    const [searchType, setSearchType] = useState(["new_build", "property_for_sale"]);

    const handleViewProperties = () => {
        const filters = Array.isArray(searchType) ? searchType : [searchType];
        const queryString = new URLSearchParams();
        filters.forEach(filter => queryString.append('listing_type', filter));
        router.push(`/search-properties?${queryString.toString()}`);
    };

    return (
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 me-[-14px] pe-[14px]">
        {/* <div className="min-h-[200px] lg:max-h-[200px] lg:overflow-y-auto flex flex-col lg:flex-row gap-4 me-[-14px] pe-[14px]"> */}
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

                {/* <Link href="/search-properties" className="lh-1 hover:text-primary">View all properties for sale in London</Link> */}
            </div>

            <div className="flex flex-col justify-center grow">
                <div className="h-full grow flex flex-col lg:flex-row justify-between gap-3">
                    {areaGuideList && areaGuideList?.length > 0 && (
                        areaGuideList?.map((item) => (
                            <div key={`area-${item.id}`} className="lg:w-1/3 flex flex-col gap-3 bg-gray-50 rounded-2xl px-3 pt-1 pb-3 text-center">
                                <h3 className="py-2 text-lg font-semibold text-primary border-b-1 border-gray-300">
                                    <Link href={`/area-guides/${item?.area_guide?.slug}`} className="hover:text-primary capitalize">
                                        {item.name}
                                    </Link>
                                </h3>

                                <div className="flex flex-col gap-3 text-center">
                                    {item?.morphable?.length > 0 && (
                                        item?.morphable?.slice(0, 6)?.map((morphable) => (
                                            <Link key={`morphable-${morphable.id}`} href={`/area-guides/${morphable?.area_guide?.slug}`} className="hover:text-primary capitalize">
                                                {morphable.name.toLowerCase()}
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="w-full mt-3 flex justify-center">
                    <Link onClick={() => setAreaGuideMenu(false)} href="/area-guides" className="border border-primary hover:bg-primary text-primary hover:text-white rounded-full px-4 py-2 text-sm">View all area guides</Link>
                </div>
            </div>
        </div>
    );
}