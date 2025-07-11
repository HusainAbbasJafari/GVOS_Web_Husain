"use client";

import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectedItemsBadge } from "@/utility/general";
import { Label } from "@radix-ui/react-label";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from 'react';
import { BiX } from "react-icons/bi";

export default function MultiSelect({ selectType, label, optionData, setSelectValue, selectValue, isGrouped, isMultiple, disabled = false, searchable = false, isRemoveAll, hideLabel = false, dropdownWidth }) {
    const t = useTranslations('Property');
    const tg = useTranslations('General');

    const [open, setOpen] = useState(false);

    const toggleMapFilterSelect = (item, type) => {
        setSelectValue((prev) => {
            if (isMultiple) {
                return prev.some((i) => i.id === item.id)
                    ? prev.filter((i) => i.id !== item.id)
                    : [...prev, { id: item.id, name: item.name }];
            } else {
                setOpen(false); // close popover on single select
                return [{ id: item.id, name: item.name }];
            }
        });
    };

    const removeMapItem = (item, type) => {
        setSelectValue((prev) => prev.filter((i) => i.id !== item.id));
    };

    const renderSelectedLabel = () => {
        if (isMultiple) {
            return (
                <span className="truncate">
                    {label ? `${tg("select")} ${label}` : tg("select")}
                </span>
            );
        } else {
            return (
                <span className={`truncate ${selectValue.length > 0 && "text-dark font-normal"}`}>
                    {selectValue.length > 0 ? selectValue[0].name : (label ? `${tg("select")} ${label}` : tg("select"))}
                </span>
            );
        }
    };

    return (
        <>
            {hideLabel ? null : (
                <Label className="text-sm font-medium text-muted-foreground mb-1 block">
                    {label}
                </Label>
            )}

            <Popover open={open} onOpenChange={setOpen} className={`${disabled ? "pointer-events-none opacity-50" : ""}`}>
                <div
                    variant="outline"
                    role="combobox"
                    className={`bg-white relative w-full min-h-[40px] border border-gray-200 rounded-md flex items-center ps-2 py-1 text-sm text-muted-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-wrap gap-1 ${(selectValue && selectValue.length > 0 && isRemoveAll) ? "pe-10" : "pe-6"}`}
                >
                    {isMultiple && selectValue && selectValue.length > 0 ? (
                        <>
                            {selectValue.map((item) => (
                                <SelectedItemsBadge disabled={disabled} key={item.id} item={item} handleRemove={() => removeMapItem(item, selectType)} />
                            ))}
                        </>
                    ) : (
                        <>
                            {renderSelectedLabel()}
                        </>
                    )}

                    {(isRemoveAll && selectValue.length > 0) && (
                        <div className="text-gray-400 hover:text-red-600 z-10 absolute right-5 cursor-pointer" onClick={() => setSelectValue([])}>
                            <BiX size={20} />
                        </div>
                    )}

                    <PopoverTrigger asChild className={`${disabled ? "pointer-events-none opacity-50 bg-gray-200" : ""}`}>
                        <div className="pe-1.5 absolute top-0 left-0 z-1 flex justify-end items-center w-full h-full">
                            <svg
                                className="w-4 h-4 ml-2 shrink-0 opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </PopoverTrigger>
                </div>

                <PopoverContent align="start" className={`${dropdownWidth ? dropdownWidth : "max-w-[280px]"} !p-2 max-h-[300px] overflow-y-auto`}>
                    <Command>
                        {searchable && (
                            <CommandInput
                                placeholder={tg("search") + "..."}
                                className="mb-1"
                                disabled={disabled}
                            />
                        )}

                        {isGrouped ? (
                            <>
                                {optionData && optionData.length > 0 && (
                                    optionData?.map((group) => (
                                        <CommandGroup
                                            key={group.name}
                                            heading={
                                                <div className="text-sm text-dark font-semibold">
                                                    {group.name}
                                                </div>
                                            }
                                        >
                                            {group?.items?.map((item) => (
                                                <CommandItem
                                                    key={item.id}
                                                    onSelect={() => toggleMapFilterSelect(item, selectType)}
                                                    className="cursor-pointer"
                                                >
                                                    {selectValue.some((d) => d.id === item.id) ? <CheckIcon className="size-4 mr-2" /> : null}
                                                    {item.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    ))
                                )}
                            </>
                        ) : (
                            <CommandGroup>
                                {optionData?.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        onSelect={() => toggleMapFilterSelect(item, selectType)}
                                        className="cursor-pointer"
                                    >
                                        {item.name}
                                        {selectValue.some((d) => d.id === item.id) ? <CheckIcon className="size-4" /> : null}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>

            {/* {isMultiple && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectValue.map((item) => (
                        <SelectedItemsBadge key={item.id} item={item} handleRemove={() => removeMapItem(item, selectType)} />
                    ))}
                </div>
            )} */}
        </>
    );
}
