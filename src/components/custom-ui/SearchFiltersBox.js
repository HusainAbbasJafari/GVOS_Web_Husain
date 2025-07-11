"use client";

import SelectArrowDown from "@/components/custom-ui/SelectArrowDown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import areaIocn from "@/public/images/icons/area.svg";
import bedIcon from "@/public/images/icons/bed-icon.svg";
import Image from "next/image";
import { BsCurrencyEuro } from "react-icons/bs";

import { outsideSearchData } from "@/utility/data";
import { useTranslations } from "next-intl";
import { useState } from "react";


export default function SearchFiltersBox({ setFilters, searchType, setSearchType, masterSearchData, loading, resetFilters, setFilterPropertes, hasFilters, setFilterPanel, isPanel }) {
    const t = useTranslations('Property');
    const tg = useTranslations('General');

    const [searchSelections, setSearchSelections] = useState([])

    const [selectedBudgets, setSelectedBudgets] = useState([]);
    const [selectedBedrooms, setSelectedBedrooms] = useState([]);
    const [minOutsideSpace, setminOutsideSpace] = useState([]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedSpecificFeatureType, setSelectedSpecificFeatureType] = useState([]);
    const toggleSelection = (item, selected, setSelected, filterType) => {
        const isSelected = selected.some(selectedItem => selectedItem.id === item.id);
    
        let newSelected;
    
        if (filterType === 'minOutsideSpace') {
            newSelected = isSelected ? [] : [item]; // Only allow one selected item
        } else {
            if (isSelected) {
                newSelected = selected.filter(selectedItem => selectedItem.id !== item.id);
            } else {
                newSelected = [...selected, item];
            }
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
        setFilterPanel(false)
    };

    const findProperties = () => {
        setFilterPropertes(true);
        if (isPanel) {
            setFilterPanel(false)
        }
    };

    return (
        <div className='flex flex-col justify-between gap-3 grow overflow-y-auto'>
            <div className="flex flex-col gap-3 px-3 grow">
                <div className="flex gap-3 flex-wrap mb-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="new_build"
                            checked={searchType.includes("new_build")}
                            disabled={searchType.length === 1 && searchType.includes("new_build")}
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
                            disabled={searchType.length === 1 && searchType.includes("property_for_sale")}
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

                {/* Budgets */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size={"lg"} className="flex justify-between items-center !px-3">
                            <BsCurrencyEuro className="text-primary" size={20} />

                            {selectedBudgets.length > 0 ? (
                                <span className="truncate me-auto">
                                    {selectedBudgets[0]?.name}
                                </span>
                            ) : (
                                <span className="truncate me-auto">{t('budgets')}</span>
                            )}

                            {selectedBudgets.length > 1 && <span className="text-base font-semibold">+{selectedBudgets.length - 1}</span>}

                            <SelectArrowDown />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="z-[999] w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-1">
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
                        <Button variant="outline" size={"lg"} className="flex justify-between items-center !px-3">
                            <Image className="min-w-6 w-6" src={bedIcon} alt="bedrooms" />

                            {selectedBedrooms.length > 0 ? (
                                <span className="truncate me-auto">
                                    {selectedBedrooms[0]?.name}
                                </span>
                            ) : (
                                <span className="truncate me-auto">{t('minBedrooms')}</span>
                            )}

                            {selectedBedrooms.length > 1 && <span className="text-base font-semibold">+{selectedBedrooms.length - 1}</span>}

                            <SelectArrowDown />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="z-[999] w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-1">
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
                        <Button variant="outline" size={"lg"} className="flex justify-between items-center !px-3">
                            <Image className="min-w-6 w-6" src={areaIocn} alt="minOutsideSpace" />

                            {minOutsideSpace.length > 0 ? (
                                <span className="truncate me-auto">
                                    {minOutsideSpace[0]?.name}
                                </span>
                            ) : (
                                <span className="truncate me-auto">{t('minOutsideSpace')}</span>
                            )}

                            {minOutsideSpace.length > 1 && <span className="text-base font-semibold">+{minOutsideSpace.length - 1}</span>}

                            <SelectArrowDown />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="z-[999] w-fit min-w-[180px] !p-1 max-h-[300px] overflow-y-auto !pe-1">
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
                
                {/* Property Types */}
                <div>
                    <div className="flex justify-between items-center !py-1 gap-1 font-semibold mb-1">
                        {/* <Image className="min-w-[25px] w-[25px]" src={buildingIcon} alt="bedrooms" /> */}
                        <span className="truncate me-auto">{t('propertyTypes')}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {loading ? (
                            <div className="p-2 text-center">Loading...</div>
                        ) : (
                            masterSearchData.propertyTypes?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2 hover:text-primary rounded-md cursor-pointer w-fit"
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
                    </div>
                </div>

                {/* Specific Feature Type */}
                <div>
                    <div className="flex justify-between items-center !py-1 gap-1 font-semibold mb-1">
                        {/* <BsListStars className="text-primary" size={20} /> */}
                        <span className="truncate me-auto">{t('specificFeature')}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {loading ? (
                            <div className="p-2 text-center">Loading...</div>
                        ) : (
                            masterSearchData.specificRequirements?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2 hover:text-primary rounded-md cursor-pointer w-fit"
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
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t px-3">
                <Button size="lg" className="grow" onClick={() => { findProperties() }}>
                    {tg("findProperties")}
                </Button>

                {hasFilters && (
                    <Button size="lg" className="!py-.5 !px-0 !h-auto !text-base !bg-transparent !text-gray-700 border-b-2 border-transparent hover:!border-primary rounded-none" onClick={() => { clearAll() }}>
                        {tg("clearFilters")}
                    </Button>
                )}
            </div>
        </div>
    );
}
