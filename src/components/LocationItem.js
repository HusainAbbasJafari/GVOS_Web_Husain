import Link from "next/link";
import { useTranslations } from "next-intl";
import { NumberDisplay } from "@/utility/general";

const LocationItem = ({ item }) => {
    const t = useTranslations('HomePage');
    return (
        <Link href={`/view-properties/${item.type}/${item.id}`}
            className="flex-grow text-sm bg-black/25 hover:bg-black/50 text-center px-3 py-2 rounded-full 
            border border-white hover:border-primary grid flex-col items-center justify-center group transition-all">
            <h5 className="text-white font-semibold transition-all truncate">
                {item.title}
            </h5>
            <small className="text-white group-hover:text-primary transition-all truncate">
                <NumberDisplay value={item.total_properties} /> {t("propertiesAvailable", { count: item.total_properties })}
            </small>
        </Link>
    );
}

export default LocationItem;