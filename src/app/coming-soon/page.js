import Image from "next/image"
import companyLogo from  "@/public/images/logo1.png"
import NewsLetter from "@/components/NewsLetter"
import { useTranslations } from "next-intl";

const ComingSoon = () => {

    const tg = useTranslations('General');

    return(
        <div className="bg-whitee">
            <div className="container h-[50vh] py-14">
                <div className="flex flex-col items-center justify-center h-full">
                    <Image src={companyLogo} width={300} height={300} alt="company-logo"  className="mb-2"/>
                    <p className="font-bold text-3xl text-neutral-900">
                        {tg('comingSoon')}
                    </p>
                </div>
            </div>

            <NewsLetter />
        </div>
    )
}

export default ComingSoon