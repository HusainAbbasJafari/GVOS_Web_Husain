import { BsArrowLeft, BsArrowRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";

const SlickButton = ({ className, sliderRef, size, iconSize, type, arrowIcon, iconColor, leftClass, rightClass }) => {
    const next = () => {
        sliderRef.current && sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current && sliderRef.current.slickPrev();
    };

    const buttonClass = `border border-primary hover:scale-115 hover:bg-primary transition-all rounded-full min-w-${size} w-${size} aspect-square ${className} items-center justify-center`;
    const buttonBlack = `border border-white hover:scale-115 !text-white absolute top-1/2 -translate-y-1/2 bg-[rgba(0,0,0,.3)] hover:bg-[rgba(0,0,0,.5)] backdrop-blur-lg transition-all rounded-full aspect-square ${className} items-center justify-center`;

    const iconClass = `${iconColor ? `${iconColor} group-hover:text-white` : "text-white"}`

    return (
        <>
            <button className={`slick_btn btn_prev group ${type === "type_2" ? `${buttonBlack} ${leftClass ? leftClass : "left-4"} min-w-${size} w-${size}` : buttonClass}`} onClick={previous}>
                {arrowIcon ? (
                    <BsArrowLeft size={iconSize || 14} className={iconClass} />
                ) : (
                    <BsChevronLeft size={iconSize || 14} className={iconClass} />
                )}
            </button>

            <button className={`slick_btn btn_next group ${type === "type_2" ? `${buttonBlack} ${rightClass ? rightClass : "right-4"} min-w-${size} w-${size}` : buttonClass}`} onClick={next}>
                {arrowIcon ? (
                    <BsArrowRight size={iconSize || 14} className={iconClass} />
                ) : (
                    <BsChevronRight size={iconSize || 14} className={iconClass} />
                )}
            </button>
        </>
    );
};

export default SlickButton;
