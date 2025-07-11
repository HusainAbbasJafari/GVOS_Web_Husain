'use client';

import { GlobalProvider } from './context/GlobalContext';

export function Providers({ children }) {
    return (
        <GlobalProvider>
            {children}
        </GlobalProvider>
    );
}
