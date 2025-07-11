
import NewsLetter from "@/components/NewsLetter"
import CommonBanner from "@/components/custom-ui/CommonBanner"
import bannerImage from "@/public/images/rentBanner.jpeg";
import { useTranslations } from "next-intl";

export default function Rent() {
    const t = useTranslations('Sell1');
    const tg = useTranslations('General');

    return (
        <div className="bg-whitee">
            <CommonBanner   
                title={tg('comingSoon')}
                bannerImage={bannerImage}
                desc={t('bannerDesc')}
                desc2={t('bannerDesc2')}
                avatars={[]}
                titleWidth="max-w-2xl"             
            />
            <NewsLetter />
        </div>
    )
}