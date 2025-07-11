import { getImageSrc } from '@/utility/general';
import { useEffect, useRef, useState } from 'react';

export default function LazyImage({ src, alt, ...rest }) {
    const imgRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                setIsVisible(true);
                observer.disconnect();
            }
        });

        const node = imgRef.current;
        if (node) {
            observer.observe(node);

            if (node.getBoundingClientRect().top < window.innerHeight) {
                requestAnimationFrame(() => {
                    setIsVisible(true);
                    observer.disconnect();
                });
            }
        }

        return () => observer.disconnect();
    }, []);

    const imageSrc = hasError || !isVisible
        ? '/images/placeholder.png'
        : getImageSrc(src);

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={hasError ? 'placeholder' : alt}
            onError={() => setHasError(true)}
            {...rest}
        />
    );
}
