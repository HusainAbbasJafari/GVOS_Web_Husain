import placeholderImage from "@/public/images/placeholder.png";
import { X } from "lucide-react";
export const NumberDisplay = ({ value }) => {
    const formatted = new Intl.NumberFormat('en-US').format(value);
    return <span>{formatted}</span>;
};

export const getImageSrc = (url) => {
    if (url) {
        return typeof url === "object" ? url.src : url;
    }
    return typeof placeholderImage === "object" ? placeholderImage.src : placeholderImage;
};

export const imageErrorHandler = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = typeof placeholderImage === "object" ? placeholderImage.src : placeholderImage;
};

export const uniqueBeds = (units) => {
    return units.filter((unit, index) => index === units.findIndex(o => unit.bedroom === o.bedroom)).sort((a, b) => a.bedroom_order - b.bedroom_order)
}

export const SelectedItemsBadge = ({ disabled, item, handleRemove }) => {
    return (
        <div
            key={item.id}
            className={`border ${disabled ? "pointer-events-none opacity-50 border-gray-300 bg-muted" : "cursor-pointer bg-primary/95 hover:bg-white border-primary text-white hover:text-primary"} group px-2 py-1 rounded-md flex items-center gap-1 text-xs borde relative z-4`}
            onClick={handleRemove}
        >
            {item.name}
            <X
                className="w-3 h-3 group-hover:text-primary"
            />
        </div>
    )
}


export const handleMobileResize = (setIsMobile) => {
    const checkMobile = () => {
        const mobile = window.innerWidth < 520;
        setIsMobile((prev) => {
            if (prev !== mobile) {
                return mobile;
            }
            return prev;
        });
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Return cleanup function
    return () => {
        window.removeEventListener('resize', checkMobile);
    };
};