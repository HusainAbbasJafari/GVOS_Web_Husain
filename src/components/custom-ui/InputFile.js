'use client';

import { cn } from "@/lib/utils";

export function InputFile({
    name = "file",
    id = "file",
    placeholder = "No File Chosen",
    wrapperClass = "",
    buttonClass = "",
    fileNameClass = "",
    onChange, // added external onChange handler
}) {
    const handleChange = (e) => {
        const file = e.target.files?.[0];
        const fileName = file?.name || placeholder;

        const fileNameElement = document.getElementById(`${id}-name`);
        if (fileNameElement) {
            fileNameElement.textContent = fileName;
        }

        if (onChange && typeof onChange === "function") {
            onChange(file); // pass the uploaded file to the external handler
        }
    }

    return (
        <>
            <label htmlFor={id} className={cn("bg-white flex items-center border rounded-md overflow-hidden p-1 text-base cursor-pointer", wrapperClass)}>
                <span
                    className={cn(
                        "bg-primary/25 text-primary font-semibold px-4 py-2 cursor-pointer text-sm lh-1 text-nowrap",
                        buttonClass
                    )}
                >
                    Choose File
                </span>
                <span
                    id={`${id}-name`}
                    className={cn(
                        "ml-2 text-gray-400 truncate text-sm",
                        fileNameClass
                    )}
                >
                    {placeholder}
                </span>
            </label>
            <input
                id={id}
                name={name}
                type="file"
                className="hidden"
                onChange={handleChange}
            />
        </>
    )
}
