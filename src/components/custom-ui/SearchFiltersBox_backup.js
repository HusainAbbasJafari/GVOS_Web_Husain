"use client";

import SelectArrowDown from "@/components/custom-ui/SelectArrowDown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import bedIcon from "@/public/images/icons/bed-icon.svg";
import buildingIcon from "@/public/images/icons/building.svg";
import Image from "next/image";
import { BsCurrencyEuro, BsListStars } from "react-icons/bs";

import { SelectedItemsBadge } from "@/utility/general";
import { useTranslations } from "next-intl";
import { useState } from "react";


export default function SearchFiltersBox({ setFilters, searchType, setSearchType, masterSearchData, loading, resetFilters, handleSearch, hasFilters, setFilterPanel, isPanel }) {
    const t = useTranslations('Property');
    const tg = useTranslations('General');

    const [searchSelections, setSearchSelections] = useState([])

    const [selectedBudgets, setSelectedBudgets] = useState([]);
    const [selectedBedrooms, setSelectedBedrooms] = useState([]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedSpecificFeatureType, setSelectedSpecificFeatureType] = useState([]);
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
        setSelectedPropertyTypes([]);
        setSelectedSpecificFeatureType([]);
        resetFilters();
    };

    const findProperties = () => {
        handleSearch();
        if (isPanel) {
            setFilterPanel(false)
        }
    };

    return (
        <div className='flex flex-col justify-between gap-3 grow'>
            <div className="flex flex-col gap-3 grow px-3">
                <div className="flex gap-3 flex-wrap">
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

                {/* Budgets */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="flex justify-between items-center">
                            <BsCurrencyEuro className="text-primary" size={20} />
                            <span className="truncate me-auto">{t('budgets')}</span>
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

                {selectedBudgets.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                        {selectedBudgets.map((item) => (
                            <SelectedItemsBadge disabled={false} key={item.id} item={item} handleRemove={() => toggleSelection(
                                item,
                                selectedBudgets,
                                setSelectedBudgets,
                                'budgets'
                            )} />
                        ))}
                    </div>
                )}

                {/* Bedrooms */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="flex justify-between items-center">
                            <Image className="min-w-6 w-6" src={bedIcon} alt="bedrooms" />
                            <span className="truncate me-auto">{t('minBedrooms')}</span>
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

                {selectedBedrooms.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                        {selectedBedrooms.map((item) => (
                            <SelectedItemsBadge
                                disabled={false}
                                key={item.id}
                                item={item}
                                handleRemove={() => toggleSelection(
                                    item,
                                    selectedBedrooms,
                                    setSelectedBedrooms,
                                    'bedrooms'
                                )}
                            />
                        ))}
                    </div>
                )}

                {/* Property Type */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="flex justify-between items-center !py-1">
                            <Image className="min-w-[25px] w-[25px]" src={buildingIcon} alt="bedrooms" />
                            <span className="truncate me-auto">{t('propertyTypes')}</span>
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

                {selectedPropertyTypes.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                        {selectedPropertyTypes.map((item) => (
                            <SelectedItemsBadge
                                disabled={false}
                                key={item.id}
                                item={item}
                                handleRemove={() => toggleSelection(
                                    item,
                                    selectedPropertyTypes,
                                    setSelectedPropertyTypes,
                                    'propertyTypes'
                                )}
                            />
                        ))}
                    </div>
                )}

                {/* Specific Feature Type */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="flex justify-between items-center !py-1">
                            <BsListStars className="text-primary" size={20} />
                            <span className="truncate me-auto">{t('specificFeature')}</span>
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

                {selectedSpecificFeatureType.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                        {selectedSpecificFeatureType.map((item) => (
                            <SelectedItemsBadge
                                disabled={false}
                                key={item.id}
                                item={item}
                                handleRemove={() => toggleSelection(
                                    item,
                                    selectedSpecificFeatureType,
                                    setSelectedSpecificFeatureType,
                                    'specificRequirements'
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 mt-3 pt-4 border-t px-3">
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
