"use client";

import MultiSelect from "@/components/custom-ui/MultiSelect";
import { useTranslations } from "next-intl";

export default function TopFilters({
    setRegionSelected,
    regionSelected,
    regionOptions,
    deptSelected,
    setDeptSelected,
    deptOptions,
    cantonSelected,
    setCantonSelected,
    cantonOptions,
    setAreasSelected,
    areasSelected,
    areasOptions,
    setSubAreasSelected,
    subAreasSelected,
    subAreasOptions,
    setTownSelected,
    townSelected,
    townOptions,
    mapFilterType }) {

    const t = useTranslations('Property');
    const tg = useTranslations('General');

    return (
        <div className="container">
            <div className="bg-white rounded-xl p-3 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-3 mb-6">
                {(mapFilterType === "map") && (
                    <>
                        <div className="col-span-1">
                            <MultiSelect
                                selectType="region"
                                label={tg("region")}
                                optionData={regionOptions}
                                setSelectValue={setRegionSelected}
                                selectValue={regionSelected}
                                isRemoveAll={true}
                            />
                        </div>

                        <div className="col-span-1">
                            <MultiSelect
                                selectType="dept"
                                label={tg("departments")}
                                optionData={deptOptions}
                                setSelectValue={setDeptSelected}
                                selectValue={deptSelected}
                                isGrouped={true}
                                isMultiple={true}
                                disabled={regionSelected.length === 0}
                                searchable={true}
                                isRemoveAll={true}
                            />
                        </div>

                        <div className="col-span-1">
                            <MultiSelect
                                selectType="towns"
                                label={tg("towns")}
                                optionData={cantonOptions}
                                setSelectValue={setCantonSelected}
                                selectValue={cantonSelected}
                                isGrouped={true}
                                isMultiple={true}
                                disabled={deptSelected.length === 0}
                                searchable={true}
                            />
                        </div>
                    </>
                )}

                {mapFilterType === "location" && (
                    <>
                        <div className="col-span-1">
                            <MultiSelect
                                selectType="areasOfCountry"
                                label={tg("areasOfCountry")}
                                optionData={areasOptions}
                                setSelectValue={setAreasSelected}
                                selectValue={areasSelected}
                                isGrouped={true}
                                isMultiple={true}
                            />
                        </div>

                        <div className="col-span-1">
                            <MultiSelect
                                selectType="skiDomaine"
                                label={tg("skiDomaine")}
                                optionData={subAreasOptions}
                                setSelectValue={setSubAreasSelected}
                                selectValue={subAreasSelected}
                                isGrouped={true}
                                isMultiple={true}
                                disabled={areasSelected.length === 0}
                                searchable={true}
                            />
                        </div>

                        <div className="col-span-1">
                            <MultiSelect
                                selectType="town"
                                label={tg("town")}
                                optionData={townOptions}
                                setSelectValue={setTownSelected}
                                selectValue={townSelected}
                                isGrouped={true}
                                isMultiple={true}
                                disabled={subAreasSelected.length === 0}
                                searchable={true}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}