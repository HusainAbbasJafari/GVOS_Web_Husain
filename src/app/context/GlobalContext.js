'use client';

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [loadingMain, setLoadingMain] = useState(false); // example state
    const [homeLoading, setHomeLoading] = useState(false); // example state
    const [seasonType, setSeasonType] = useState(false); // example state
    const [areaGuideSlug, setAreaGuideSlug] = useState(''); // example state
    const [language, setLanguage] = useState("en");
    const [selectedCurrency, setSelectedCurrency] = useState("EUR");
    const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState("€");
    const [isMapSplitSearch, setIsMapSplitSearch] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                loadingMain,
                setLoadingMain,
                homeLoading,
                setHomeLoading,
                seasonType,
                setSeasonType,
                areaGuideSlug,
                setAreaGuideSlug,
                language,
                setLanguage,
                selectedCurrency,
                setSelectedCurrency,
                selectedCurrencySymbol,
                setSelectedCurrencySymbol,
                setIsMapSplitSearch,
                isMapSplitSearch
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
