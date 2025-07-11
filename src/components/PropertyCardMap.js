"use client";
import placeholderImage from "@/public/images/placeholder.png";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import SlickButton from "./custom-ui/SlickButton";
import HeroCarousel from "./HeroCaraousel";
import LazyImage from "./LazyImage";
import { Button } from "./ui/button";
import priceIcon from "@/public/images/icons/price-icon.svg";
import bedIcon from "@/public/images/icons/bed-icon.svg";
import Image from "next/image";

const PropertyCardMap = ({ item }) => {
    const t = useTranslations('Property');
    const tg = useTranslations('General');
    const [expanded, setExpanded] = useState(false);

    const [firstUnit, setFirstUnit] = useState(null);
    const [lastUnit, setLastUnit] = useState(null);

    useEffect(() => {
        if (item.properties) {
            setFirstUnit(item.properties[0]);
            setLastUnit(item.properties[item.properties.length - 1]);
        }
    }, [item.properties]);

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Image section */}
            <div className="">
                <div className="relative ">
                    <div className="w-full h-full aspect-[5/3] overflow-hidden">
                        {(!item?.images || item.images.length === 0) ? (
                            <img
                                className="aspect-[5/3] w-full h-full object-cover transition-transform duration-300"
                                src={placeholderImage.src}
                                alt={`property_${item.id}`}
                            />
                        ) : (item.images.length === 1) ? (
                            <LazyImage
                                className="aspect-[5/3] w-full h-full object-cover transition-transform duration-300"
                                src={item.images[0].url}
                                alt={`property_${item.id}`}
                                onError={(e) => {
                                    e.target.src = placeholderImage.src;
                                }}
                            />
                        ) : (
                            <HeroCarousel renderButtons={({ sliderRef }) => (
                                <SlickButton
                                    className="flex min-w-7 w-7"
                                    sliderRef={sliderRef}
                                    iconSize={12}
                                    type="type_2"
                                />
                            )}>
                                {item.images.map((image, index) => (
                                    <LazyImage
                                        key={index}
                                        className="aspect-[5/3] w-full h-full object-cover transition-transform duration-300"
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
                <div className="flex grow flex-col px-3 py-2 space-y-2">
                    <div className="h-fit w-full text-center">
                        {/* <h3 className="font-medium uppercase tracking-wide line-clamp-1">{item.geo_level_1}</h3>
                        <span className="text-[11px]">
                            {item.geo_level_2} {item.geo_level_3 ? `· ${item.geo_level_3}` : ''}
                        </span> */}

                        <h3 className={`font-medium line-clamp-1 text-center text-dark mb-1`}>{item.geo_level_1}</h3>
                        <span className={`text-xs flex flex-wrap justify-center items-center gap-1 lh-1 text-dark`}>
                            {item.geo_level_2}
                            {(item.geo_level_2 && item.geo_level_3) && (
                                <div className="inline-block w-[4px] h-[4px] bg-black/50 rounded-full"></div>
                            )}

                            {item.geo_level_3 && (
                                <>
                                    {item.geo_level_3}
                                </>
                            )}
                        </span>
                    </div>

                    <div className="mb-2 flex items-center space-x-3 text-xs">
                        <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500"></div>
                        <p>{item.type === 'new home' ? t("deliveryFrom") : t("OccupationFrom")}:  {item.delivery_date}</p>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500">
                        </div>
                    </div>

                    {item.type === 'new home' ? (
                        item.properties && item.properties.length > 1 ? (
                        <div className="space-y-1">
                            <p className="space-x-1 flex items-center">
                                <Image className="min-w-5 w-5" src={priceIcon} alt="icon" />
                                <span>{tg("from")} {firstUnit?.property_price} {lastUnit?.property_price && tg("to")} {lastUnit?.property_price}</span>
                            </p>

                            <p className="space-x-1 flex items-center">
                                <Image className="min-w-5 w-5" src={bedIcon} alt="icon" />
                                {firstUnit?.bedroom !== lastUnit?.bedroom ? (
                                    <span>{firstUnit?.bedroom} {lastUnit?.bedroom && tg("to")} {lastUnit?.bedroom}</span>
                                ) : (
                                    <span>{firstUnit?.bedroom}</span>
                                )}
                            </p>
                        </div>
                        ) : (
                        <div className="space-y-1">
                            <p className="space-x-1 flex items-center">
                                <Image className="min-w-5 w-5" src={bedIcon} alt="icon" />
                                <span>{firstUnit?.bedroom} {tg("from")}</span>
                                <Image className="min-w-5 w-5" src={priceIcon} alt="icon" />
                                <span>{firstUnit?.property_price}</span>
                            </p>
                        </div>
                        )
                        
                    ) : (
                        <div className="space-y-1">
                            <p>{item.bedroom} {tg("from")} {item.property_price}</p>
                        </div>
                    )}

                    <div className="text-center">
                        <Link
                            target="_blank"
                            href={
                                item.type === 'new home'
                                    ? `/properties/new-homes/${item.uuid}`
                                    : `/properties/properties-for-sale/${item.uuid}`
                            }
                            passHref
                        >
                            <Button
                                className="!rounded-full text-[12px] !font-normal h-auto !py-1.5 !px-3"
                            >
                                {t('viewDetails')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCardMap;