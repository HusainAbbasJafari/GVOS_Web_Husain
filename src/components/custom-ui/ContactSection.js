'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "../ui/button";
import { useState } from "react";
import GetCallBackForm from "./GetCallBackForm";

export default function ContactSection({ title, desc, desc2, btnText, url, descClass, isCallBack, callBackAction }) {
    const tg = useTranslations('General');
    const router = useRouter();
    const [getQuoteDialog, setGetQuoteDialog] = useState(false);

    return (
        <div className="bg-primary py-8 px-5 lg:px-8 flex flex-col items-center justify-center gap-4">
            {title && (
                <h5 className='text-3xl text-white text-center font-alt'>
                    {title}
                </h5>
            )}

            {desc && (
                <p className={`text-white text-center mb-2 ${descClass ? descClass : 'max-w-4xl'}`}>
                    {desc}
                </p>
            )}

            {desc2 && (
                <p className='max-w-4xl text-white text-center mb-2'>
                    {desc2}
                </p>
            )}

            {btnText && (
                <>
                {isCallBack ? (
                    <Button onClick={() => setGetQuoteDialog(true)} className="group !rounded-full border border-white !bg-white hover:!bg-transparent !text-black/90 hover:!text-white font-medium w-fit flex items-center gap-2 px-4 py-2">
                        {btnText}
                        <BsArrowRight
                            size={20}
                            className="transition-all duration-300 ease-in-out group-hover:translate-x-2 text-primary group-hover:text-white"
                        />
                    </Button>
                ) : (
                    <Link href="/contact-us" className="group rounded-full border border-white bg-white hover:bg-transparent hover:text-white font-medium w-fit flex items-center gap-2 px-4 py-2">
                        {btnText}
                        <BsArrowRight
                            size={20}
                            className="transition-all duration-300 ease-in-out group-hover:translate-x-2 text-primary group-hover:text-white"
                        />
                    </Link>
                )}
                </>
            )}

            <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} />
        </div>
    );
}