import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
// import "react-phone-number-input/style.css";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const PhoneInput = React.forwardRef(({ className, onChange, value, ...props }, ref) => {
    return (
        <RPNInput.default
            ref={ref}
            className={cn("flex w-full", className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={false}
            value={value || undefined}
            onChange={(value) => onChange?.(value || "")}
            {...props}
        />
    );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
    <Input
        className={cn("rounded-e-md rounded-s-none", className)}
        {...props}
        ref={ref}
    />
));
InputComponent.displayName = "InputComponent";

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }) => {
    const scrollAreaRef = React.useRef(null);
    const [searchValue, setSearchValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex !gap-[2px] rounded-e-none rounded-s-md border-r-0 !ps-2 focus:z-10 h-10 bg-gray-100"
                    disabled={disabled}
                >
                    <FlagComponent country={selectedCountry} countryName={selectedCountry} />
                    <ChevronsUpDown
                        className={cn(
                            "-mr-2 size-4 opacity-50",
                            disabled ? "hidden" : "opacity-100"
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        value={searchValue}
                        onValueChange={(value) => {
                            setSearchValue(value);
                            setTimeout(() => {
                                if (scrollAreaRef.current) {
                                    const viewportElement = scrollAreaRef.current.querySelector(
                                        "[data-radix-scroll-area-viewport]"
                                    );
                                    if (viewportElement) {
                                        viewportElement.scrollTop = 0;
                                    }
                                }
                            }, 0);
                        }}
                        placeholder="Search country..."
                    />
                    <CommandList>
                        <ScrollArea ref={scrollAreaRef} className="h-72">
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                            onSelectComplete={() => setIsOpen(false)}
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange,
    onSelectComplete,
}) => {
    const handleSelect = () => {
        onChange(country);
        onSelectComplete();
    };

    return (
        <CommandItem className="gap-2" onSelect={handleSelect}>
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-sm">{countryName}</span>
            <span className="text-sm text-foreground/50">
                +{RPNInput.getCountryCallingCode(country)}
            </span>
            <CheckIcon
                className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
            />
        </CommandItem>
    );
};

const FlagComponent = ({ country, countryName }) => {
    const Flag = flags[country];

    return (
        <span className="flex h-6 w-8 overflow-hidden rounded-xs [&_svg:not([class*='size-'])]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

export { PhoneInput };
