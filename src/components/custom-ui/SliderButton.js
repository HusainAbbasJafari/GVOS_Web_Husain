import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const SliderButton = ({ className, iconSize, type, handlePrev, handleNext, iconColor, disablePrev, disableNext }) => {
    const next = () => {
        sliderRef.current && sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current && sliderRef.current.slickPrev();
    };

    const buttonClass = `border border-primary hover:scale-115 hover:bg-primary transition-all rounded-full aspect-square ${className} items-center justify-center`;
    const buttonBlack = `border border-white hover:scale-115 !text-white absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,.3)] hover:bg-[rgba(0,0,0,.5)] backdrop-blur-lg transition-all rounded-full aspect-square ${className} items-center justify-center`;

    const iconClass = `${iconColor ? `${iconColor} group-hover:text-white` : "text-dynamic group-hover:!text-white"}`

    return (
        <>
            <button disabled={disablePrev} onClick={handlePrev} className={`slick_btn btn_prev group ${type === "type_2" ? `${buttonBlack} left-4` : buttonClass}`}>
                <BsChevronLeft size={iconSize || 14} className={iconClass} />
            </button>

            <button disabled={disableNext} onClick={handleNext} className={`slick_btn btn_next group ${type === "type_2" ? `${buttonBlack} right-4` : buttonClass}`}>
                <BsChevronRight size={iconSize || 14} className={iconClass} />
            </button>
        </>
    );
};

export default SliderButton;
