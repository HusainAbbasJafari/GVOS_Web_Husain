"use client";

import { useGlobalContext } from '@/app/context/GlobalContext';
import { MixedPropertyCardSplitSkeleton } from "@/components/MixedPropertyCardSplitSkeleton";
import { PropertyUnitMapSkeleton } from "@/components/PropertyUnitMapSkeleton";
import { clusterStyles, mapOptionSplit } from '@/utility/data';
import { NumberDisplay } from "@/utility/general";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import debounce from 'lodash.debounce';
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiX } from 'react-icons/bi';
import { BsSliders } from 'react-icons/bs';
import MixedPropertyCardSplit from './MixedPropertyCardSplit';
import PropertyUnitMap from './PropertyUnitMap';
import SearchFiltersBox from './custom-ui/SearchFiltersBox';
import { Button } from './ui/button';

const MapSplit = ({
  properties,
  pageType,
  setGoogleSearchValue,
  googleSearchValue,
  radiusSelected,
  setRadiusSelected,
  setFilters,
  searchType,
  setSearchType,
  masterSearchData,
  loading,
  resetFilters,
  setFilterPropertes,
  hasFilters,
  propertiesLoading,
  fetchSplitProperties,
  filters,
  currentPage,
  totalPages,
  setCurrentPage,
  setFilterPanel,
  filterPanel
}) => {
  const { loadingMain, setLoadingMain } = useGlobalContext();
  const [activeMarker, setActiveMarker] = useState(null);
  const [isScroll, setIsScroll] = useState(false);
  const isFetching = useRef(false);
  const observer = useRef(null);

  const t = useTranslations('ViewProperties');
  const tp = useTranslations('Property');
  const tg = useTranslations('General');

  const mapContainerStyle = {
    width: "100%",
    height: window.innerWidth < 768 ? `300px` : `100vh`,
  };

  const loadProperties = useCallback(async () => {
    if (currentPage >= totalPages || propertiesLoading || isFetching.current) {
      return;
    }

    isFetching.current = true;
    const nextPage = currentPage + 1;

    try {
      await fetchSplitProperties(filters, nextPage);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more properties:", error);
    } finally {
      isFetching.current = false;
    }
  }, [currentPage, totalPages, propertiesLoading, filters, fetchSplitProperties, setCurrentPage]);

  const initObserver = useCallback(() => {
    const sentinel = document.querySelector("#scroll-sentinel");
    if (!sentinel || observer.current) {
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !propertiesLoading && !isFetching.current && pageType === 2) {
          loadProperties();
        }
      },
      {
        rootMargin: '1000px 0px',
      }
    );
    observer.current.observe(sentinel);
  }, [loadProperties, propertiesLoading]);

  const stopObserver = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
  }, []);

  useEffect(() => {
    if (propertiesLoading || isFetching.current) {
      stopObserver();
    } else {
      const timeout = setTimeout(() => {
        initObserver();
      }, 100);
      return () => clearTimeout(timeout);
    }

    return () => stopObserver();
  }, [propertiesLoading, initObserver, stopObserver]);

  useEffect(() => {
    return () => stopObserver();
  }, [stopObserver]);

  useEffect(() => {
    if (isScroll && activeMarker) {
      const element = document.getElementById(`property_${activeMarker}`);

      if (element) {
        let topPos = element.offsetTop + (pageType === 2 ? 100 : - 40);

        if (window.innerWidth < 768) {
          topPos = element.offsetTop + (pageType === 2 ? -130 : - 350)
        }

        window.scrollTo({
          top: topPos >= 0 ? topPos : 0,
          behavior: 'smooth',
        });
      }

      setIsScroll(false);
      setLoadingMain(false);
    }
  }, [isScroll, activeMarker, setLoadingMain]);

  const [mapCenter, setMapCenter] = useState({
    lat: 46.2276,
    lng: 2.2137,
  });

  useEffect(() => {
    if (properties && properties.length > 0) {
      setMapCenter({
        lat: Number(properties[0].latitude),
        lng: Number(properties[0].longitude),
      });
    }
  }, [properties]);

  const handleMarkerClick = (location) => {
    if (location.id === activeMarker) return;
    setActiveMarker(location.id);
    setIsScroll(true);
  };

  const debouncedSetCenter = useCallback(
    debounce((latitude, longitude) => {
      setMapCenter({
        lat: latitude,
        lng: longitude,
      });
    }, 300),
    []
  );

  const handleMarkerChange = (location) => {
    if (!location.latitude || !location.longitude || location.id === activeMarker) return;
    setActiveMarker(location.id);
    debouncedSetCenter(location.latitude, location.longitude);
  };

  const clusterOptions = {
    styles: clusterStyles,
  };

  return (
    <div className='w-full'>
      {/* {pageType === 2 && (
        <div className='bg-white rounded-xl p-3 flex justify-center items-center gap-3 sticky top-0 z-[51]'>
          <LocationAutocomplete
            userLatLng={{ lat: 48.8566, lng: 2.3522 }}
            onSelect={onLocationSelect}
            googleSearchValue={googleSearchValue}
            setGoogleSearchValue={setGoogleSearchValue}
          />

          <div className='w-[130px]'>
            <MultiSelect
              selectType="radius"
              label={tg("radius")}
              optionData={radiusData}
              setSelectValue={setRadiusSelected}
              selectValue={radiusSelected}
              hideLabel={true}
              dropdownWidth="max-w-[150px]"
            />
          </div>
          
          <Button
            variant={"outline"}
            className='text-xs !border-primary hover:!bg-primary hover:!text-white out_prime transition-all duration-300'
            onClick={() => setFilterPanel(!filterPanel)}
          >
            <span className='hidden md:block'>{tg('filterProperties')}</span> <BsSliders size={25} />
          </Button>
        </div>
      )} */}

      <div className="relative bg-light map_wrapper overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-5">
          <div className='col-span-1 2xl:col-span-2 overflow-hidden'>
            <div className={`split_map_position min-h-[300px] md:min-h-[450px] overflow-hidden split_map ${pageType === 2 ? 'search_page top-[64.5px]' : 'top-[70px]'} transition-all duration-100 ease-in-out`}>
              <GoogleMap
                className="text"
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={12}
                options={mapOptionSplit}
              >
                <MarkerClusterer options={clusterOptions}>
                  {(clusterer) =>
                    properties.map((property, index) => {
                      const lat = Number(property.latitude);
                      const lng = Number(property.longitude);

                      if (isNaN(lat) || isNaN(lng)) return null;

                      return (
                        <Marker
                          key={index}
                          position={{ lat, lng }}
                          clusterer={clusterer}
                          icon={{
                            url: `${activeMarker === property.id
                              ? property.type === 'new home'
                                ? '/images/active_marker.svg'
                                : '/images/active_marker_resale.svg'
                              : property.type === 'new home'
                                ? '/images/inactive_marker.svg'
                                : '/images/inactive_marker_resale.svg'
                              }`,
                            scaledSize: new window.google.maps.Size(40, 40),
                          }}
                          onMouseOver={() => handleMarkerClick(property)}
                          onTouchStart={() => handleMarkerClick(property)}
                          onClick={() => handleMarkerClick(property)}
                        />
                      );
                    })
                  }
                </MarkerClusterer>
              </GoogleMap>
            </div>
          </div>

          <div className={`z-1 relative col-span-1 md:col-span-2 2xl:col-span-3 px-4 pb-4 pt-4 ${pageType === 2 ? 'md:pt-0 search_pag' : ''} bg-white transition-all duration-100 ease-in-out min-h-[450px]`}>
            <div className='flex justify-between items-center gap-3 mb-3'>
              {pageType === 1 && (
                <>
                  {propertiesLoading ? (
                    <div className="text-sm">{tp("fetchingProperties")}</div>
                  ) : (
                    <>
                      <h4 className='font-semibold text-lg'>
                        <span className="text-primary">
                          <NumberDisplay value={properties?.length || 0} />
                          <span className="ps-1">
                            {searchType.length > 1 ? (
                              tp("propertiesBoth", { count: properties?.length || 0 })
                            ) : (
                              searchType[0] === 'new_build' ? (
                                tp("newBuildCount", { count: properties?.length || 0 })
                              ) : (
                                tp("propertySaleCount", { count: properties?.length || 0 })
                              )
                            )}
                          </span>
                        </span>
                      </h4>
                      <Button
                        variant={"outline"}
                        className='text-xs !border-primary hover:!bg-primary hover:!text-white out_prime transition-all duration-300'
                        onClick={() => setFilterPanel(!filterPanel)}
                      >
                        <span className='hidden md:block'>{tg('filterProperties')}</span> <BsSliders size={25} />
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>

            {propertiesLoading && properties.length === 0 ? (
              <>
                {pageType === 2 ? (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="col-span-1">
                        <MixedPropertyCardSplitSkeleton />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 4xl:grid-cols-3 gap-2 xl:gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="col-span-1">
                        <PropertyUnitMapSkeleton />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : properties && properties.length > 0 ? (
              <>
                {pageType === 2 ? (
                  <div className="w-full overflow-y-auto no-scrollbar search_page" id="propertyListContainer">
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3'>
                      {properties?.map((property, index) => (
                        <div key={index} className='col-span-1' onMouseEnter={() => handleMarkerChange(property)}>
                          <MixedPropertyCardSplit item={property} activeMarker={activeMarker} />
                        </div>
                      ))}
                      <div id="scroll-sentinel"></div>
                    </div>

                    {propertiesLoading && (
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-3">
                        {[...Array(3)].map((_, index) => (
                          <div key={`loading-${index}`} className="col-span-1">
                            <MixedPropertyCardSplitSkeleton />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full overflow-y-auto no-scrollbar" id="propertyListContainer">
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 4xl:grid-cols-3 gap-2 xl:gap-4'>
                      {properties?.map((property, index) => (
                        <div key={index} className='col-span-1' onMouseEnter={() => handleMarkerChange(property)}>
                          <PropertyUnitMap item={property} activeMarker={activeMarker} />
                        </div>
                      ))}
                      <div id="scroll-sentinel"></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className='w-full flex justify-center'>
                <h5 className='text-lg text-gray-400 text-center py-8'>
                  {loadingMain ? tg('loadingWait') : tg('noPropertiesShow')}
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>

      {filterPanel && (
        <div className='fixed z-[998] right-0 top-0 bottom-0 h-screen w-screen bg-black opacity-40' onClick={() => setFilterPanel(false)}></div>
      )}
      <div
        className={`flex flex-col fixed z-[999] right-0 top-0 bottom-0 h-full w-full max-w-[400px] rounded-none border-l bg-white py-3 shadow-lg sm:w-[400px] transform ${filterPanel ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center px-3 mb-4">
          <h5 className='text-lg font-semibold'>{tg('filters')}</h5>
          <div className='cursor-pointer opacity-50 hover:opacity-100' onClick={() => setFilterPanel(false)}>
            <BiX size={25} />
          </div>
        </div>
        <SearchFiltersBox
          setFilters={setFilters}
          searchType={searchType}
          setSearchType={setSearchType}
          masterSearchData={masterSearchData}
          loading={loading}
          resetFilters={resetFilters}
          setFilterPropertes={setFilterPropertes}
          hasFilters={hasFilters}
          setFilterPanel={setFilterPanel}
          isPanel={true}
        />
      </div>
    </div>
  );
};

export default MapSplit;