'use client';

import { useEffect, useRef } from 'react';

export default function WavyTitle({ title, type, size, classList }) {
    const containerRef = useRef(null);
    const textSize = size ? size : 'text-4xl lg:text-5xl';

    useEffect(() => {
        const el = containerRef.current;
        const letters = el.querySelectorAll('.letter');

        // Set animation delays
        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.02}s`;
        });

        let lastScrollY = window.scrollY;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentScrollY = window.scrollY;
                const isScrollingDown = currentScrollY > lastScrollY;

                if (entry.isIntersecting && isScrollingDown) {
                    // Remove then re-add class to restart animation
                    el.classList.remove('animate');
                    // Trigger reflow (forces DOM to recognize the class removal)
                    void el.offsetWidth;
                    el.classList.add('animate');
                }

                lastScrollY = currentScrollY;
            },
            { threshold: 0.1 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <h4
            ref={containerRef}
            className={classList ? `${classList} wavy-title` : `${type === 2 && ''} font-bold text-dark ${textSize} wavy-title`}
        >
            {title.split('').map((char, i) => (
                <span key={i} className="letter">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </h4>
    );
}
