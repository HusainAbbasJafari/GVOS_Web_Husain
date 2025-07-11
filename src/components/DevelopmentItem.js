'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"; // Adjust the path if needed
import floorPlanImage from "@/public/images/floor-plan.png";
import placeholderImage from "@/public/images/placeholder.png";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LazyImage from "./LazyImage";
import { Button } from "./ui/button";

const DevelopmentItem = ({ item, session, setGetQuoteDialog, setIsCheckBox, setPropertyUuid }) => {
    const t = useTranslations('Property');
    const tg = useTranslations('General');
    const [open, setOpen] = useState(false)

    const handleFloorPlanClick = (e, canViewFloorPlan) => {
        if (session || canViewFloorPlan) {
            setOpen(true);
        } else {
            e.preventDefault();
            setGetQuoteDialog(true);
            setIsCheckBox(true);
            setPropertyUuid(item.uuid);
        }
    };
    return (
        <div className="flex flex-col justify-center border border-neutral-400 rounded-4xl overflow-hidden">
            <div className="aspect-square">
                <LazyImage
                    className="w-full h-full object-cover object-center"
                    src={item.floor_plan_url ? floorPlanImage : placeholderImage}
                    alt={item.floor_plan_url ? "Floor Plan" : "No Floor Plan Available"}
                    width={500}
                    height={500}
                />
            </div>

            <div className="flex flex-col bg-neutral-100 p-3 lg:p-4 border-t border-neutral-400">
                {/* Your unit info rows here */}

                <div
                    className="flex gap-2 w-full">
                    <span
                        className="w-1/2 text-xs text-end  my-1">
                        {t("unitNumber")}
                    </span>
                    <div
                        className="w-[1px] flex-grow border-r border-neutral-400">
                    </div>
                    <span
                        className="w-1/2 text-xs font-bold  my-1">
                        {item.unit}
                    </span>
                </div>

                <div
                    className="flex gap-2 w-full">
                    <span
                        className="w-1/2 text-xs text-end  my-1">
                        {t("price")}
                    </span>
                    <div
                        className="w-[1px] flex-grow border-r border-neutral-400">
                    </div>
                    <span
                        className="w-1/2 text-xs font-bold  my-1">
                        {item.property_price}
                        {item.property_price_converted !== item.property_price && (
                            <span className="text-xs font-light text-gray-500">{item.property_price_converted}</span>
                        )}
                    </span>

                </div>

                <div
                    className="flex gap-2 w-full">
                    <span
                        className="w-1/2 text-xs text-end  my-1">
                        {t("bed")}
                    </span>
                    <div
                        className="w-[1px] flex-grow border-r border-neutral-400">
                    </div>
                    <span
                        className="w-1/2 text-xs font-bold  my-1">
                        {item.bedroom}
                    </span>
                </div>
                <div
                    className="flex gap-2 w-full">
                    <span
                        className="w-1/2 text-xs text-end  my-1">
                        {t("size")}
                    </span>
                    <div
                        className="w-[1px] flex-grow border-r border-neutral-400">
                    </div>
                    <span
                        className="w-1/2 text-xs font-bold  my-1">
                        {item.size}
                    </span>
                </div>
                <div
                    className="flex gap-2 w-full">
                    <span
                        className="w-1/2 text-xs text-end  my-1">
                        {tg("outsideSpace")}
                    </span>
                    <div
                        className="w-[1px] flex-grow border-r border-neutral-400">
                    </div>
                    <span
                        className="w-1/2 text-xs font-bold  my-1">
                        {item.outside_space}
                    </span>
                </div>
                <div
                    className="flex gap-2 w-full">
                    <span
                        className="w-1/2 text-xs text-end my-1">
                        {t("reclaimableVat")}*
                    </span>
                    <div
                        className="w-[1px] flex-grow border-r border-neutral-400">
                    </div>
                    <span
                        className="w-1/2 text-xs font-bold  my-1">
                        {item.reclaimable_vat}
                    </span>
                </div>

                <div className="flex justify-center items-center pt-3">
                    <Dialog open={open} onOpenChange={setOpen} className="!p-1">
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className={`
                                border-primary bg-white !text-primary 
                                hover:bg-primary hover:!text-white 
                                text-base font-semibold py-1 transition-all
                                ${!item.floor_plan_url ? 'opacity-50 cursor-not-allowed !text-gray-500 hover:!text-gray-500' : ''}
                                `}
                                disabled={!item.floor_plan_url}
                                onClick={(e) => handleFloorPlanClick(e, item.can_view_floor_plan)}
                            >
                                {item.floor_plan_url ? t("viewFloorPlan") : "No Floor Plan"}
                            </Button>
                        </DialogTrigger>

                        {session || item.can_view_floor_plan && (
                            <DialogContent className="!max-w-7xl !w-[96%] !h-[96%] p-0 overflow-hidden !bg-transparent border-0 mt-10">
                                <DialogClose asChild></DialogClose>
                                <DialogTitle className="!hidden"></DialogTitle>
                                <DialogDescription className="!hidden"></DialogDescription>

                                <div className="w-full h-full mt-4 flex justify-center items-center">
                                    <iframe
                                        src={item.floor_plan_url}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 'none' }}
                                        title="Floor Plan"
                                    />
                                </div>
                            </DialogContent>
                        )}
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default DevelopmentItem;
