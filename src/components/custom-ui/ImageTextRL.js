'use client';

import logoSm from "@/public/images/logo_sm_black.png";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LazyImage from "../LazyImage";
import { Button } from "../ui/button";
import GetCallBackForm from "./GetCallBackForm";

export default function ImageTextRL({ image, label, title, desc, isReverse, index, desc2, type, callBackAction, isHideSurname = false, showLogo = false }) {
    const tg = useTranslations('General');
    const router = useRouter();

    const [getQuoteDialog, setGetQuoteDialog] = useState(false);

    return (
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-10" data-aos={`${index % 2 === 0 ? 'zoom-in' : 'zoom-in'}`} data-aos-delay={50 * index} data-aos-offset="100">
            <div className={isReverse ? "sm:order-2" : ''}>
                <div className="aspect-[5/4] overflow-hidden">
                    <LazyImage src={image} alt="Team" className="object-cover h-full w-full" />
                </div>
            </div>

            <div className="grow flex flex-col justify-between">
                <div>
                    {type != 2 && (
                        <span className="text-2xl lg:text-3xl text-primary font-alt">{label}</span>
                    )}
                    
                    <h3 className="max-w-md text-3xl lg:text-4xl font-normal text-neutral-900 mb-2">
                        {title}
                    </h3>

                    {showLogo && (
                        <a target="_blank" href="https://www.gvoscrm.io" className='max-w-44 my-4'>
                            <img src={logoSm.src} />
                        </a>
                    )}
                </div>

                <div>
                    {type === 2 && (
                        <p className="max-w-xs text-xl text-primary font-alt mb-3">
                            {label}
                        </p>
                    )}

                    {desc && (
                        <p>
                            {desc}
                        </p>
                    )}

                    {desc2 && (
                        <p className="mt-5">
                            {desc2}
                        </p>
                    )}

                    <Button variant={"outline"} onClick={() => setGetQuoteDialog(true)} className="mt-5 px-5 !border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300">
                        {tg('getCallBack')}
                    </Button>
                </div>
            </div>

            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} isHideSurname={isHideSurname} />
        </div>
    );
}