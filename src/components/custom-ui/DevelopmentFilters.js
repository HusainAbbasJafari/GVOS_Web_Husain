"use client";

import SelectArrowDown from "@/components/custom-ui/SelectArrowDown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import areaIocn from "@/public/images/icons/area.svg";
import bedIcon from "@/public/images/icons/bed-icon.svg";
import { outsideSearchData } from "@/utility/data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsCurrencyEuro, BsPinMap } from "react-icons/bs";
import LocationMap from "../LocationMap";


export default function DevelopmentFilters({ setFilters, filters, masterSearchData, loading, setHasFilters, hasFilters, resetFilters, development }) {
    const t = useTranslations('Property');
    const tg = useTranslations('General');

    const [selectedBudgets, setSelectedBudgets] = useState([]);
    const [selectedBedrooms, setSelectedBedrooms] = useState([]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedSpecificFeatureType, setSelectedSpecificFeatureType] = useState([]);
    const [minOutsideSpace, setminOutsideSpace] = useState([]);
    const [showLocation, setShowLocation] = useState(false);

    const toggleSelection = (item, selected, setSelected, filterType) => {
        const isSelected = selected.some(selectedItem => selectedItem.id === item.id);

        let newSelected;

        if (isSelected) {
            newSelected = selected.filter(selectedItem => selectedItem.id !== item.id);
        } else {
            newSelected = [...selected, item];
        }

        setSelected(newSelected);
        setFilters(prev => ({
            ...prev,
            [filterType]: newSelected.map(item => item.id)
        }));
    };


    const clearAll = () => {
        if (!hasFilters) return;
        setSelectedBudgets([]);
        setSelectedBedrooms([]);
        setminOutsideSpace([]);
        setSelectedPropertyTypes([]);
        setSelectedSpecificFeatureType([]);
        resetFilters();
    };

    useEffect(() => {
        const hasActiveFilters =
            filters.budgets?.length > 0 ||
            filters.bedrooms?.length > 0 ||
            filters.propertyTypes?.length > 0 ||
            filters.minOutsideSpace?.length > 0 ||
            filters.specificRequirements?.length > 0 ||
            filters.sortBy;

        if (hasActiveFilters === true) {
            setHasFilters(hasActiveFilters);
        } else {
            setHasFilters(false);
        }
    }, [filters]);

    return (
        <section className='mb-5'>
            <div className="flex justify-between gap-3 flex-wrap">
                <div className='flex flex-col md:flex-row justify-between md:items-center gap-3'>
                    <div className='flex flex-wrap gap-2 lg:gap-3 grow'>
                        {/* Budgets */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="flex justify-between items-center">
                                    <BsCurrencyEuro className="text-primary" size={20} />
                                    <span className="truncate">{t('budgets')}</span>
                                    {selectedBudgets.length > 0 && <span className="text-md font-semibold">+{selectedBudgets.length}</span>}
                                    <SelectArrowDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-4">
                                {loading ? (
                                    <div className="p-2 text-center">Loading...</div>
                                ) : (
                                    masterSearchData.budgets?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={() => toggleSelection(
                                                { id: item.id, name: item.name },
                                                selectedBudgets,
                                                setSelectedBudgets,
                                                'budgets'
                                            )}
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={selectedBudgets.some(b => b.id === item.id)}
                                            />
                                            <span className="text-sm font-medium text-nowrap">{item.name}</span>
                                        </div>
                                    ))
                                )}
                            </PopoverContent>
                        </Popover>

                        {/* Bedrooms */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="flex justify-between items-center">
                                    <Image className="min-w-6 w-6" src={bedIcon} alt="bedrooms" />
                                    <span className="truncate">{t('minBedrooms')}</span>
                                    {selectedBedrooms.length > 0 && <span className="text-md font-semibold">+{selectedBedrooms.length}</span>}
                                    <SelectArrowDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-4">
                                {loading ? (
                                    <div className="p-2 text-center">Loading...</div>
                                ) : (
                                    masterSearchData.bedrooms?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={() => toggleSelection(
                                                { id: item.id, name: item.name },
                                                selectedBedrooms,
                                                setSelectedBedrooms,
                                                'bedrooms'
                                            )}
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={selectedBedrooms.some(b => b.id === item.id)}
                                            />
                                            <span className="text-sm font-medium text-nowrap">{item.name}</span>
                                        </div>
                                    ))
                                )}
                            </PopoverContent>
                        </Popover>

                        {/* Min Outside space(sqm) */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="flex justify-between items-center">
                                    <Image className="min-w-5 w-5" src={areaIocn} alt="bedrooms" />
                                    <span className="truncate">{t('minOutsideSpace')}</span>
                                    {minOutsideSpace.length > 0 && <span className="text-md font-semibold">+{minOutsideSpace.length}</span>}
                                    <SelectArrowDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-1">
                                {loading ? (
                                    <div className="p-2 text-center">Loading...</div>
                                ) : (
                                    outsideSearchData?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={() => toggleSelection(
                                                { id: item.id, name: item.name },
                                                minOutsideSpace,
                                                setminOutsideSpace,
                                                'minOutsideSpace'
                                            )}
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={minOutsideSpace.some(b => b.id === item.id)}
                                            />
                                            <span className="text-sm font-medium text-nowrap">{item.name}</span>
                                        </div>
                                    ))
                                )}
                            </PopoverContent>
                        </Popover>

                        {/* Property Type */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="flex justify-between items-center !py-1">
                                    <span className="truncate">{t('propertyTypes')}</span>
                                    {selectedPropertyTypes.length > 0 && <span className="text-md font-semibold">+{selectedPropertyTypes.length}</span>}
                                    <SelectArrowDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-4">
                                {loading ? (
                                    <div className="p-2 text-center">Loading...</div>
                                ) : (
                                    masterSearchData.propertyTypes?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={() => toggleSelection(
                                                { id: item.id, name: item.name },
                                                selectedPropertyTypes,
                                                setSelectedPropertyTypes,
                                                'propertyTypes'
                                            )}
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={selectedPropertyTypes.some(b => b.id === item.id)}
                                            />
                                            <span className="text-sm font-medium text-nowrap">{item.name}</span>
                                        </div>
                                    ))
                                )}
                            </PopoverContent>
                        </Popover>

                        {/* Specific Feature Type */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="flex justify-between items-center !py-1">
                                    <span className="truncate">{t('specificFeature')}</span>
                                    {selectedSpecificFeatureType.length > 0 && <span className="text-md font-semibold">+{selectedSpecificFeatureType.length}</span>}
                                    <SelectArrowDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-4">
                                {loading ? (
                                    <div className="p-2 text-center">Loading...</div>
                                ) : (
                                    masterSearchData.specificRequirements?.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={() => toggleSelection(
                                                { id: item.id, name: item.name },
                                                selectedSpecificFeatureType,
                                                setSelectedSpecificFeatureType,
                                                'specificRequirements'
                                            )}
                                        >
                                            <Checkbox
                                                id={item.id}
                                                checked={selectedSpecificFeatureType.some(b => b.id === item.id)}
                                            />
                                            <span className="text-sm font-medium text-nowrap">{item.name}</span>
                                        </div>
                                    ))
                                )}
                            </PopoverContent>
                        </Popover>

                        {hasFilters && (
                            <span
                                className="flex items-center text-primary/90 hover:text-primary hover:underline cursor-pointer transition-all text-md font-light"
                                onClick={clearAll}
                            >
                                <span className='font-semibold'>{tg('clearAll')}</span>
                            </span>
                        )}
                    </div>
                </div>

                <Button variant={"outline"} onClick={() => setShowLocation(true)}
                    className="!border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300 px-3">
                    <BsPinMap size={20} />
                    {tg("seeLocation")}
                </Button>
            </div>

            {/* <div className="mt-4 flex flex-wrap gap-2">
                {selectedBudgets.length > 0 && (
                    <div className="bg-white p-2 rounded-full flex gap-2 flex-wrap border border-gray-200">
                        {selectedBudgets.map((item) => (
                            <div
                                key={item.id}
                                className="cursor-pointer group flex gap-2 items-center bg-primary text-white py-2 ps-3 pe-2 rounded-full text-xs text-nowrap relative transition-all duration-200"
                                onClick={() => toggleSelection(
                                    item,
                                    selectedBudgets,
                                    setSelectedBudgets,
                                    'budgets'
                                )}
                            >
                                {item.name}
                                <div className="flex items-center justify-center bg-white rounded-full opacity-50 group-hover:opacity-100 transition-all duration-400">
                                    <BiX size={15} className="text-red-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedBedrooms.length > 0 && (
                    <div className="bg-white p-2 rounded-full flex gap-2 flex-wrap border border-gray-200">
                        {selectedBedrooms.map((item) => (
                            <div
                                key={item.id}
                                className="cursor-pointer group flex gap-2 items-center bg-primary text-white py-2 ps-3 pe-2 rounded-full text-xs text-nowrap relative transition-all duration-200"
                                onClick={() => toggleSelection(
                                    item,
                                    selectedBedrooms,
                                    setSelectedBedrooms,
                                    'bedrooms'
                                )}
                            >
                                {item.name}
                                <div className="flex items-center justify-center bg-white rounded-full opacity-50 group-hover:opacity-100 transition-all duration-400">
                                    <BiX size={15} className="text-red-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedPropertyTypes.length > 0 && (
                    <div className="bg-white p-2 rounded-full flex gap-2 flex-wrap border border-gray-200">
                        {selectedPropertyTypes.map((item) => (
                            <div
                                key={item.id}
                                className="cursor-pointer group flex gap-2 items-center bg-primary text-white py-2 ps-3 pe-2 rounded-full text-xs text-nowrap relative transition-all duration-200"
                                onClick={() => toggleSelection(
                                    item,
                                    selectedPropertyTypes,
                                    setSelectedPropertyTypes,
                                    'propertyTypes'
                                )}
                            >
                                {item.name}
                                <div className="flex items-center justify-center bg-white rounded-full opacity-50 group-hover:opacity-100 transition-all duration-400">
                                    <BiX size={15} className="text-red-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {minOutsideSpace.length > 0 && (
                    <div className="bg-white p-2 rounded-full flex gap-2 flex-wrap border border-gray-200">
                        {minOutsideSpace.map((item) => (
                            <div
                                key={item.id}
                                className="cursor-pointer group flex gap-2 items-center bg-primary text-white py-2 ps-3 pe-2 rounded-full text-xs text-nowrap relative transition-all duration-200"
                                onClick={() => toggleSelection(
                                    item,
                                    minOutsideSpace,
                                    setminOutsideSpace,
                                    'minOutsideSpace'
                                )}
                            >
                                {item.name}
                                <div className="flex items-center justify-center bg-white rounded-full opacity-50 group-hover:opacity-100 transition-all duration-400">
                                    <BiX size={15} className="text-red-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedSpecificFeatureType.length > 0 && (
                    <div className="bg-white p-2 rounded-full flex gap-2 flex-wrap border border-gray-200">
                        {selectedSpecificFeatureType.map((item) => (
                            <div
                                key={item.id}
                                className="cursor-pointer group flex gap-2 items-center bg-primary text-white py-2 ps-3 pe-2 rounded-full text-xs text-nowrap relative transition-all duration-200"
                                onClick={() => toggleSelection(
                                    item,
                                    selectedSpecificFeatureType,
                                    setSelectedSpecificFeatureType,
                                    'specificFeature'
                                )}
                            >
                                {item.name}
                                <div className="flex items-center justify-center bg-white rounded-full opacity-50 group-hover:opacity-100 transition-all duration-400">
                                    <BiX size={15} className="text-red-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {hasFilters && (
                    <span
                        className="flex items-center text-primary/90 hover:text-primary hover:underline cursor-pointer transition-all text-md font-light"
                        onClick={clearAll}
                    >
                        <span className='font-semibold'>{tg('clearAll')}</span>
                    </span>
                )}
            </div> */}

            <Dialog open={showLocation} onOpenChange={setShowLocation}>
                <DialogContent className="sm:max-w-xl !p-0 overflow-hidden">
                    <DialogHeader className="hidden">
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div className="grow h-90">
                        <LocationMap latitude={development?.latitude} longitude={development?.longitude} />
                    </div>

                    <DialogFooter className="hidden"> </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
