"use client";
import { getImageSrc, imageErrorHandler } from "@/utility/general";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import LazyImage from "./LazyImage";

const PropertyUnitMap = ({ item, activeMarker }) => {
    const t = useTranslations('ViewProperties');
    const tg = useTranslations('General');
    // border rounded-lg p-2
    return (
        <div className={`h-full flex flex-col md:flex-row lg:flex-col xl:flex-row gap-2 p-2 rounded-3xl border ${item.id === activeMarker ? "border-primary" : "border-gray-300"} hover:border-primary transition-all duration-300`} id={`property_${item.id}`}>
            <div className="w-full h-[266.5px] md:w-1/2 lg:w-full xl:w-1/2">
                {item.master_image ? (
                    <LazyImage
                        src={getImageSrc(item.master_image)}
                        alt={`property_${item.id}`}
                        className="w-full h-full object-cover rounded-3xl"
                        onError={(e) => { imageErrorHandler(e) }}
                    />
                ) : (
                    <Skeleton className="w-full h-full rounded-3xl" />
                )}
            </div>

            <div className="flex flex-col justify-between grow gap-2">
                <div>
                    <div className="mb-3 flex flex-col justify-center">
                        <div className={`text-center mb-0`}>
                            <span className={`font-semibold text-sm ${item.id === activeMarker ? "text-primary" : "text-gray-700"}`}>
                                {item.town_name ? item.town_name : item.canton_name}
                            </span>
                        </div>

                        <div className="flex gap-2 justify-center mb-2">
                            <h6 className="text-dark text-xs font-bold">
                                {item.type === 'new home' ? tg("deliveryFrom") : tg("OccupationFrom")}:
                            </h6>
                            <h6 className="text-xs font-bold">{item.delivery_date}</h6>
                        </div>

                        <div className={`text-center mx-auto text-sm font-bold ${item.id === activeMarker ? "bg-primary text-white" : "bg-gray-200"} py-1 px-2 rounded-md`}>
                            {item.geo_level_1}
                        </div>
                    </div>

                    <div className="h-[140px] overflow-y-auto">
                        {item.type === 'new home' ? (
                            (item?.properties)?.map((property) => (
                                <div className="flex" key={property?.id}>
                                    <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                                        <div className='my-1'>
                                            <p className='mb-0 text-[0.75rem]'>{property?.bedroom} {tg("from")}</p>
                                        </div>
                                    </div>
                                    <div className="w-[1px] bg-gray-300"></div>
                                    <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                                        <div className='my-1'>
                                            <p className='text-[0.75rem] font-semibold mb-0 text-[#2E2E2E]'>{property?.property_price}</p>
                                            {property?.property_price_converted !== property?.property_price && (
                                                <p className='text-xs font-light text-gray-500'>{property?.property_price_converted}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex">
                                <div className="w-1/2 max-w-1/2 space-y-1 text-right mr-3">
                                    <div className='my-1'>
                                        <p className='mb-0 text-[0.75rem] lh-min'>{item?.bedroom} {tg("from")}</p>
                                    </div>
                                </div>
                                <div className="w-[1px] bg-gray-300"></div>
                                <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                                    <div className='my-1'>
                                        <p className='text-[0.75rem] font-semibold mb-0 text-[#2E2E2E]'>{item?.property_price}</p>
                                        {item?.property_price_converted !== item?.property_price && (
                                            <p className='text-xs font-light text-gray-500'>{item?.property_price_converted}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* <div className="w-[1px] bg-gray-300"></div>

                        <div className="w-1/2 max-w-1/2 text-left space-y-1 ml-3">
                            {item.type === 'new home' ? (
                                (item?.properties)?.map((property) => (
                                    <div className='my-1' key={property?.id}>
                                        <p className='text-[0.8rem] font-semibold mb-0 text-[#2E2E2E]'>{property?.property_price}</p>
                                        {property?.property_price_converted !== property?.property_price && (
                                            <p className='text-xs font-light text-gray-500'>
                                                {property?.property_price_converted}
                                            </p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className='my-1'>
                                    <p className='text-[0.8rem] font-semibold mb-0 text-[#2E2E2E]'>{item?.property_price}</p>
                                    {item?.property_price_converted !== item?.property_price && (
                                        <p className='text-xs font-light text-gray-500'>{item?.property_price_converted}</p>
                                    )}
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>

                <Link target="_blank" href={item.type === 'new home' ? `/properties/new-homes/${item.uuid}` : `/properties/properties-for-sale/${item.uuid}`} className={`text-center px-3 py-2 border ${item.id === activeMarker ? "text-primary border-primary" : "bg-blue-100 border-blue-400"} rounded-lg text-xs font-bold hover:bg-white hover:text-primary hover:border-primary`}>
                    {t("clickHereFullDetails")}
                </Link>
            </div>
        </div>
    );
}

export default PropertyUnitMap;
