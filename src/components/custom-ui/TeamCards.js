'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import LazyImage from "../LazyImage";
import { Button } from "../ui/button";
import TeamsImageSlide from "../TeamsImageSlider";

export default function TeamCards({ item, index, label, title, desc, desc2, desc3, desc4, desc5, btn1, btn2, url1, url2 }) {
    const tg = useTranslations('General');
    const router = useRouter();

    // console.log(item, "aaditest");

    return (
        <div className="[&:not(:last-child)]:pb-14 [&:not(:last-child)]:border-b" data-aos={`${index % 2 === 0 ? 'zoom-in' : 'zoom-in'}`} data-aos-delay={50 * index} data-aos-offset="100">
            {/* <div className="grid sm:grid-cols-3 gap-6 mb-6">
                <div className="aspect-[5/4] overflow-hidden">
                    <LazyImage src={`/images/static/team${index + 1}1.png`} alt="Team" className="object-cover h-full w-full" />
                </div>

                <div className="aspect-[5/4] overflow-hidden">
                    <LazyImage src={`/images/static/team${index + 1}2.png`} alt="Team" className="object-cover h-full w-full" />
                </div>

                {(index === 0 || index === 2) && (
                    <div className="aspect-[5/4] overflow-hidden">
                        <LazyImage src={`/images/static/team${index + 1}3.png`} alt="Team" className="object-cover h-full w-full" />
                    </div>
                )}
            </div> */}
            
            {item.images && item.images.length > 0 && (
                <TeamsImageSlide images={item.images} />
            )}

            <div className="grow flex flex-col justify-between mt-6">
                <div className="flex justify-between items-center gap-4 mb-3">
                    <div>
                        <h3 className="max-w-md text-2xl font-normal text-neutral-900">
                            {title}
                        </h3>
                        <p className="text-xl text-primary font-alt">
                            {label}
                        </p>
                    </div>
                    <div>
                        <div className='flex gap-2 justify-center items-center'>
                            {item.linkedin && (
                                <Link href={item.linkedin} target="_blank" className='w-8 h-8 border border-gray-300 flex justify-center items-center'>
                                    <FaLinkedinIn size={16} className="text-primary" />
                                </Link>
                            )}
                            {item.instagram && (
                                <Link href={item.instagram} target="_blank" className='w-8 h-8 border border-gray-300 flex justify-center items-center'>
                                    <FaInstagram size={16} className="text-primary" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {[desc, desc2, desc3, desc4, desc5].map((text, idx) => (
                    text && <p key={idx} className={idx > 0 ? 'mt-5' : ''}>{text}</p>
                ))}

                {[btn1, btn2].map((btn, idx) => (
                    btn && (
                        <Button
                            key={idx}
                            onClick={() => router.push(idx === 0 ? url1 : url2)}
                            className="!rounded-md mt-5 px-5 w-fit"
                        >
                            {btn}
                        </Button>
                    )
                ))}
            </div>
        </div>
    );
}
