"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";


export default function SellSubMenu() {
    const sell1 = useTranslations('Sell1');
    const sell2 = useTranslations('Sell2');
    return (
        <div className="lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto flex flex-col lg:flex-row gap-4 me-[-14px] pe-[14px]">
            <div className="h-full flex flex-col gap-3">
                <div className="flex flex-col gap-3 bg-gray-50 rounded-2xl px-4 py-3 text-center">
                    <ul className="list-none list-inside text-left space-y-2">
                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <Link href="/sell/skyrocket">
                                <p className="text-primary text-sm font-bold leading-tight mb-1">
                                    {sell1("menuTitle")}
                                </p>

                                <p className="text-black font-normal text-xs">
                                    {sell1("menuDesc")}
                                </p>
                            </Link>
                        </li>

                        <li className="flex items-start gap-2 p-2 border border-transparent hover:border-primary rounded-2xl hover:bg-white transition-colors">
                            <div>
                                <Link href="/sell/elevate" className="text-primary font-bold">
                                    <p className="text-primary text-sm font-bold leading-tight mb-1">
                                        {sell2("menuTitle")}
                                    </p>
                                    <p className="text-black font-normal text-xs">
                                        {sell2("menuDesc")}
                                    </p>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}