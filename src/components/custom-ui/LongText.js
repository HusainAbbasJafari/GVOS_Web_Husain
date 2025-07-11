'use client';

import { useState } from 'react';

export default function LongText({ text = '', limit = 150, className = '' }) {
    const [expanded, setExpanded] = useState(false);

    const isLong = text.length > limit;
    const displayText = expanded || !isLong ? text : text.slice(0, limit) + '...';

    return (
        <p className={className}>
            {displayText}
            {isLong && (
                <span
                    onClick={() => setExpanded(!expanded)}
                    className="text-primary font-semibold cursor-pointer ms-2"
                >
                    {expanded ? 'Read Less' : 'Read More'}
                </span>
            )}
        </p>
    );
}
