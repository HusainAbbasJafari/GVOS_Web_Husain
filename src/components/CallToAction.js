import Link from "next/link";
import { useTranslations } from "next-intl";
import { BsArrowRight } from "react-icons/bs";

const CallToAction = ({ type = "a", btn1Url, btn1Text, btn2Url, btn2Text, btn3Url, btn3Text }) => {
    const tg = useTranslations('General');
    if (type === "a") {

    }
    return (
        <div className="pt-14 mx-auto">
            <h2 className="text-3xl text-dark font-medium mb-5 text-center">
                {tg.rich(`${type === "a" ? "whatNext" : "whatElse"}`, {
                    span: (chunks) => (
                        <span className="text-primary font-alt">{chunks}</span>
                    ),
                })}
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 max-w-2xl mx-auto text-center">
                <div className="col-span-1">
                    <div className="h-full" data-aos="fade-right" data-aos-duration="1000">
                        <Link
                            href={`${btn1Url ? btn1Url : "/search-properties"}`}
                            className="group relative text-sm text-primary flex flex-col justify-between items-center border hover:border-primary transition-colors rounded-3xl p-2 sm:p-4 h-full overflow-hidden gap-3"
                        >
                            <div></div>
                            <div className="flex items-center gap-2">
                                {/* <BsPersonCircle size={25} /> */}
                                <span className="text-dark font-medium text-center max-w-[100px]">
                                    {btn1Text ? btn1Text : (
                                        tg.rich("wn1", {
                                            br: (chunks) => (
                                                <span className="block">{chunks}</span>
                                            ),
                                            br1: (chunks) => (
                                                <span className="block">{chunks}</span>
                                            ),
                                        })
                                    )}
                                </span>
                            </div>
                            <BsArrowRight
                                size={25}
                                className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 min-w-6"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="h-full" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="100">
                        <Link
                            href={`${btn2Url ? btn2Url : "/become-a-partner"}`}
                            className="group relative text-sm text-primary flex flex-col justify-between items-center border hover:border-primary transition-colors rounded-3xl p-2 sm:p-4 h-full overflow-hidden gap-3"
                        >   
                        <div></div>
                            <div className="flex items-center gap-2">
                                <span className="text-dark font-medium text-center max-w-[100px]">
                                    {btn2Text ? btn2Text : (
                                        tg.rich("wn2", {
                                            br: (chunks) => (
                                                <span className="block">{chunks}</span>
                                            ),
                                            br1: (chunks) => (
                                                <span className="block">{chunks}</span>
                                            ),
                                        })
                                    )}
                                </span>
                            </div>

                            <BsArrowRight
                                size={25}
                                className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 min-w-6"
                            />
                        </Link>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="h-full" data-aos="fade-right" data-aos-duration="1400" data-aos-delay="200">
                        <Link
                            href={`${btn3Url ? btn3Url : "/buy/france"}`}
                            className="group relative text-sm text-primary flex flex-col justify-between items-center border hover:border-primary transition-colors rounded-3xl p-2 sm:p-4 h-full overflow-hidden gap-3"
                        >
                            <div></div>
                            <div className="flex items-center gap-2">
                                {/* <Image src={searchIcon} alt="person_icon" height={25} /> */}
                                <span className="text-dark font-medium text-center max-w-[100px]">
                                    {btn3Text ? btn3Text : (
                                        tg.rich("wn3", {
                                            br: (chunks) => (
                                                <span className="block">{chunks}</span>
                                            ),
                                            br1: (chunks) => (
                                                <span className="block">{chunks}</span>
                                            ),
                                        })
                                    )}

                                </span>
                            </div>

                            <BsArrowRight
                                size={25}
                                className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 min-w-6"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CallToAction;