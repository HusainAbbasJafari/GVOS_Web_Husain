'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Optional: for class merging if you're using it

export default function Loader({ className = '', message = 'Loading...' }) {
    return (
        <div className={cn("cursor-wait z-50 fixed top-0 left-0 right-0 bottom-0 bg-black/5 flex flex-col items-center justify-center h-full py-10 text-white", className)}>
            {/* <Loader2 className="animate-spin w-10 h-10 text-primary" />
            <p className="text-sm mt-2">{message}</p> */}
            <div className="loader loader-1">
                <div className="loader-outter"></div>
                <div className="loader-inner"></div>
            </div>

        </div >
    );
}
