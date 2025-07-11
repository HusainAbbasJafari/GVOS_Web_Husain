"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import areaIocn from "@/public/images/icons/area.svg";
import bathIcon from "@/public/images/icons/bathroom.svg";
import bedIcon from "@/public/images/icons/bed-icon.svg";
import houseIcon from "@/public/images/icons/house.svg";
import placeholderImage from "@/public/images/placeholder.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsEnvelope, BsHeart, BsTelephone } from "react-icons/bs";
import GetQuoteForm from "./custom-ui/GetQuoteForm";
import SlickButton from "./custom-ui/SlickButton";
import HeroCarousel from "./HeroCaraousel";
import LazyImage from "./LazyImage";
import { Button } from "./ui/button";

const PropertyCardUnits = ({ item }) => {
    const t = useTranslations('Property');
    const tg = useTranslations('General');
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="h-full flex flex-col border border-zinc-150 property_card transition-all duration-300 rounded-3xl overflow-hidden">
            {/* Image section */}
            <div className="px-4 xl:px-6 pt-4 xl:pt-6">
                <div className="relative rounded-2xl">
                    <div className="absolute top-2 right-2 w-9 h-9 z-20 bg-white/80 flex items-center justify-center rounded-full">
                        <Image width={22} height={22} src={`/images/${item.type === 'new home' ? "new_homes.svg" : "resale_icon.svg"}`} alt="house-icon" />
                    </div>
                    <div className="w-full h-full aspect-[5/4] rounded-2xl overflow-hidden relative z-10">
                        {(!item?.images || item.images.length === 0) ? (
                            <img
                                className="aspect-[5/4] w-full h-full object-cover transition-transform duration-300"
                                src={placeholderImage.src}
                                alt={`property_${item.id}`}
                            />
                        ) : (item.images.length === 1) ? (
                            <LazyImage
                                className="aspect-[5/4] w-full h-full object-cover transition-transform duration-300"
                                src={item.images[0].url}
                                alt={`property_${item.id}`}
                                onError={(e) => {
                                    e.target.src = placeholderImage.src;
                                }}
                            />
                        ) : (
                            <HeroCarousel renderButtons={({ sliderRef }) => (
                                <SlickButton
                                    className="flex min-w-8 w-8"
                                    sliderRef={sliderRef}
                                    iconSize={14}
                                    type="type_2"
                                />
                            )}>
                                {item.images.map((image, index) => (
                                    <LazyImage
                                        key={index}
                                        className="aspect-[5/4] w-full h-full object-cover transition-transform duration-300"
                                        src={image.url}
                                        alt={`property_${item.id}`}
                                        onError={(e) => {
                                            e.target.src = placeholderImage.src;
                                        }}
                                    />
                                ))}
                            </HeroCarousel>
                        )}
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="grow flex flex-col justify-between">
                <div className="px-4 xl:px-6 py-4 ">
                    <div className="flex justify-between gap-3 h-[52px]">
                        <div className="flex flex-col justify-between grow">
                            <div className="grid">
                                {(item.geo_level_1) && (
                                    <h4 className="text-dark font-bold truncate text-base lh-1">
                                        {item.geo_level_1}
                                    </h4>
                                )}

                                {(item.geo_level_2) && (
                                    <h4 className="text-dark font-bold truncate text-sm">
                                        {item.geo_level_2}
                                    </h4>
                                )}
                                {(item.geo_level_3) && (
                                    <h4 className="text-dark font-bold truncate text-xs">
                                        {item.geo_level_3}
                                    </h4>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-primary font-bold whitespace-nowrap lh-1">
                                {item.property_price}
                            </h4>
                            {item.property_price_converted !== item.property_price && (
                                <span className="text-xs whitespace-nowrap">{item.property_price_converted}</span>
                            )}
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                        {item.type === 'new home' ? t("deliveryFrom") : t("OccupationFrom")}:  {item.delivery_date}
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2 xl:gap-3 p-4 xl:px-6 bg-gray-100 border-y border-slate-200">
                    <div
                        className="flex items-center gap-2 xl:gap-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 xl:gap-3">
                                        <Image className="min-w-6 w-6" src={bedIcon} alt="icon" />
                                        <span className="text-xs xl:text-sm text-dark font-medium text-nowrap">{item.bedroom}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent align="start" alignOffset={20}>
                                    <p>{t("title6")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    {item.type === 'resale' && (
                        <div className="flex items-center gap-2 xl:gap-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-2 xl:gap-3">
                                            <Image className="min-w-6 max-h-6" src={bathIcon} alt="icon" />
                                            <span className="text-xs xl:text-sm text-dark font-medium text-nowrap">{item.no_of_bathroom}</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent align="start" alignOffset={10}>
                                        <p>{t("title8")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                    <div
                        className="flex items-center gap-2 xl:gap-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 xl:gap-3">
                                        <Image className="min-w-6 w-6" src={houseIcon} alt="icon" />
                                        <span className="text-xs xl:text-sm text-dark font-medium text-nowrap">
                                            {item.size}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent align="start" alignOffset={10}>
                                    <p>{t("title2")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div
                        className="flex items-center gap-2 xl:gap-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 xl:gap-3">
                                        <Image className="min-w-6 w-6" src={areaIocn} alt="icon" />
                                        <span className="text-xs xl:text-sm text-dark font-medium text-nowrap">
                                            {item.outside_space}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent align="start" alignOffset={10}>
                                    <p>{t("title4")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                <div className="px-4 xl:px-6 pb-4 xl:pb-6 pt-4">
                    <div className="flex items-center justify-between">
                        <Link
                            target="_blank"
                            href={
                                item.type === 'new home'
                                    ? `/properties/new-homes/${item.development_uuid}`
                                    : `/properties/properties-for-sale/${item.uuid}`
                            }
                            passHref
                        >
                            <Button
                                className="!rounded-full text-sm font-semibold px-5 py-2"
                            >
                                {t('viewDetails')}
                            </Button>
                        </Link>
                        <div className="flex items-center gap-4 px-2">
                            <Link target="_blank" href="/contact-us" className="hover:text-[var(--primary)]">
                                <BsTelephone size={16} />
                            </Link>
                            <Link href="javascript:void(0)" className="hover:text-[var(--primary)]" onClick={() => setExpanded(true)}>
                                <BsEnvelope size={16} />
                            </Link>
                            <Link target="_blank" href="#" className="hover:text-[var(--primary)]">
                                <BsHeart size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <GetQuoteForm expanded={expanded} setExpanded={setExpanded}
                resaleProperty={item.type === 'resale' ? item.uuid : null}
                development={item.type === 'new home' ? item.development_uuid : null}
            />
        </div>
    );
}

export default PropertyCardUnits;