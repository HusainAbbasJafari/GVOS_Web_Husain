'use client';

import { useState, useEffect, useRef, use } from 'react';

export default function LocationAutocomplete({ userLatLng, onSelect, googleSearchValue, setGoogleSearchValue, isRoundedFull }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFocusedOnce, setIsFocusedOnce] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.length > 1) {
                fetchAutocomplete(query);
            } else {
                setSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchAutocomplete = async (input) => {
        const response = await fetch(
            `/api/autocomplete?input=${encodeURIComponent(input)}&lat=${userLatLng.lat}&lng=${userLatLng.lng}`
        );
        const data = await response.json();
        setSuggestions(data.predictions || []);
        if (isFocusedOnce) {
            setShowDropdown(true);
            console.log("aadi test GA")
        }
    };

    const getPlaceDetails = async (placeId) => {
        const response = await fetch(`/api/place-details?placeId=${placeId}`);
        const data = await response.json();
        const loc = data.result.geometry.location;
        return {
            name: data.result.name,
            lat: loc.lat,
            lng: loc.lng,
        };
    };

    const handleSelect = async (item) => {
        const details = await getPlaceDetails(item.place_id);
        setQuery(details.name);
        setShowDropdown(false);
        onSelect?.(details); // { name, lat, lng }
    };

    useEffect(() => {
        if (googleSearchValue) {
            setQuery(googleSearchValue.name);
        }
    }, [googleSearchValue]);

    useEffect(() => {
        if (!query && isFocusedOnce) {
            setGoogleSearchValue('');
        }
    }, [query]);

    return (
        <div className="relative w-full max-w-md" ref={containerRef}>
            <input
                type="text"
                className={`bg-white ${isRoundedFull ? 'rounded-full' : "rounded-md"} w-full border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Search location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                    if (suggestions.length) {
                        setShowDropdown(true);
                    }
                }}
                onInput={() => {
                    console.log("aadi test GA2")
                    setIsFocusedOnce(true);
                }}
            />

            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
                    {suggestions.map((item) => (
                        <li
                            key={item.place_id}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                            {item.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
