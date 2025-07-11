'use client';

import { use, useEffect, useState } from 'react';
import { GoogleMapsProvider } from '@/components/GoogleMapsProvider';
import MapSplit from '@/components/MapSplit';
import { fetchMapProperties, fetchMasterSearchData } from '@/services/api';
import { useGlobalContext } from '@/app/context/GlobalContext';
import debounce from 'lodash.debounce';

const ViewProperties = ({ params }) => {
    const { selectedCurrency } = useGlobalContext();
    const { type, id } = use(params);

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [googleSearchValue, setGoogleSearchValue] = useState('')
    const [masterSearchData, setMasterSearchData] = useState([]);
    const [filterPropertes, setFilterPropertes] = useState(false)
    const [hasFilters, setHasFilters] = useState(false);
    const [searchType, setSearchType] = useState(() => ['new_build', 'property_for_sale']);
    const [propertiesLoading, setPropertiesLoading] = useState(true);
    const [filterPanel, setFilterPanel] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const response = await fetchMasterSearchData();
                setMasterSearchData(response)

            } catch (error) {
                console.error('Error loading master search data:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setPropertiesLoading(true);
            try {
                const response = await fetchMapProperties(type, id, selectedCurrency);
                setSelectedLocations(response);
            } catch (error) {
                console.error('Error loading properties:', error);
            } finally {
                setLoading(false);
                setPropertiesLoading(false);
            }
        };

        const debouncedFetchProperties = debounce(fetchProperties, 500);
        debouncedFetchProperties();
    }, [id, selectedCurrency]);

    const [filters, setFilters] = useState({
        budgets: [],
        minOutsideSpace: [],
        bedrooms: [],
        propertyTypes: [],
        specificFeature: [],
        listing_type: [],
        sortBy: '',
    });


    useEffect(() => {
        const hasActiveFilters =
            filters.budgets?.length > 0 ||
            filters.bedrooms?.length > 0 ||
            filters.propertyTypes?.length > 0 ||
            filters.specificRequirements?.length > 0 ||
            filters.listing_type?.length > 0 ||
            filters.minOutsideSpace?.length > 0;
        if (hasActiveFilters === true) {
            setHasFilters(hasActiveFilters);
        } else {
            setHasFilters(false);
        }
    }, [filters]);


    const resetFilters = () => {
        if (!hasFilters) return;

        setFilters({
            budgets: [],
            minOutsideSpace: [],
            bedrooms: [],
            propertyTypes: [],
            specificRequirements: [],
            listing_type: '',
        });
        setFilterPropertes(true)
    }
    const handleSearch = async () => {
        setFilterPropertes(false);
        setPropertiesLoading(true);
        try {
            const searchFilters = {
                ...filters,
                listing_type: searchType,
            };
            const response = await fetchMapProperties(type, id, selectedCurrency, searchFilters);
            setSelectedLocations(response);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setPropertiesLoading(false);
        }
    };

    useEffect(() => {
        if (filterPropertes) {
            handleSearch();
            setPropertiesLoading(true);
            setSelectedLocations([]);
        }
    }, [filterPropertes])

    return (
        <div className="flex justify-center min-h-[450px]">
            <GoogleMapsProvider>
                <MapSplit
                    properties={selectedLocations}
                    pageType={1}
                    searchType={searchType}
                    setFilters={setFilters}
                    setSearchType={setSearchType}
                    masterSearchData={masterSearchData}
                    loading={loading}
                    resetFilters={resetFilters}
                    setFilterPropertes={setFilterPropertes}
                    hasFilters={hasFilters}
                    propertiesLoading={propertiesLoading}
                    filterPanel={filterPanel}
                    setFilterPanel={setFilterPanel}
                />
            </GoogleMapsProvider>
        </div>
    );
};

export default ViewProperties;
