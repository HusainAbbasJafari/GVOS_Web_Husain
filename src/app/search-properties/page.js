"use client";

import MapSearch from "@/components/MapSearch";
import MixedPropertyCard from "@/components/MixedPropertyCard";
import PropertyCardUnits from "@/components/PropertyCardUnits";
import { SkeletonCard } from "@/components/SkeletonCard";
import LongText from "@/components/custom-ui/LongText";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { fetchAreasOptions, fetchCantonsByDepartment, fetchDepartmentsByRegion, fetchMasterSearchData, fetchRegionOptions, fetchSearchMapProperties, fetchSearchProperties, fetchSearchPropertiesList, fetchSubAreasByArea, fetchTownsBySubArea } from '@/services/api';
import debounce from 'lodash.debounce';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsSliders, BsViewList, BsViewStacked } from "react-icons/bs";
import { FaLocationCrosshairs, FaMapLocationDot, FaRegHardDrive } from "react-icons/fa6";
import { useGlobalContext } from "../context/GlobalContext";

import { GoogleMapsProvider } from "@/components/GoogleMapsProvider";
import MapSplit from "@/components/MapSplit";
import SearchFiltersBox from "@/components/custom-ui/SearchFiltersBox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getMultiPolygonCenter } from "@/helper/googleMap";
import { NumberDisplay } from "@/utility/general";
import TopFilters from "./TopFilters";
import SkiIcon from "@/components/custom-ui/SkiIcon";
import MultiSelect from "@/components/custom-ui/MultiSelect";
import LocationAutocomplete from "@/components/custom-ui/LocationAutocomplete";
import { radiusData } from "@/utility/data";

const SearchProperty = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedCurrency, loadingMain, setLoadingMain, setIsMapSplitSearch } = useGlobalContext();
  const t = useTranslations('Property');
  const tg = useTranslations('General');

  const mapState = {
    center: "",
    currentRegion: "",
    departments: {
      "type": "FeatureCollection",
      "features": []
    },
  }

  const [searchType, setSearchType] = useState(() => {
    const filters = searchParams.getAll("listing_type");
    return filters.length > 0 ? filters : ["new_build", "property_for_sale"];
  });

  const [sortByFilter, setSortByFilter] = useState('latest')
  const [viewType, setViewType] = useState(false)
  const [masterSearchData, setMasterSearchData] = useState([]);
  const [mixedProperties, setMixedProperties] = useState([])
  const [properties, setProperties] = useState([])
  const [mapProperties, setMapProperties] = useState([])
  const [splitProperties, setSplitProperties] = useState([])

  const [loading, setLoading] = useState(true);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasFilters, setHasFilters] = useState(false);
  const [mapFilterType, setMapFilterType] = useState("split");
  const [featureCollection, setFeatureCollection] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 48.117266, lng: -1.677793 }); // Rennes, France
  const [circleData, setCircleData] = useState({});

  const [totalMixedItems, setTotalMixedItems] = useState(0);
  const [totalMixedPages, setTotalMixedPages] = useState(1);

  // for map search
  const [regionSelected, setRegionSelected] = useState([])
  const [regionOptions, setRegionOptions] = useState([])

  const [deptSelected, setDeptSelected] = useState([])
  const [deptOptions, setDeptOptions] = useState([])

  const [cantonSelected, setCantonSelected] = useState([])
  const [cantonOptions, setCantonOptions] = useState([])

  // for ski domain
  const [areasSelected, setAreasSelected] = useState([])
  const [areasOptions, setAreasOptions] = useState([])

  const [subAreasSelected, setSubAreasSelected] = useState([])
  const [subAreasOptions, setSubAreasOptions] = useState([])

  const [townSelected, setTownSelected] = useState([])
  const [townOptions, setTownOptions] = useState([])
  const [googleSearchParams, setGoogleSearchParams] = useState(true)
  const [googleSearchValue, setGoogleSearchValue] = useState('')
  const [radiusSelected, setRadiusSelected] = useState([])
  const [filterPropertes, setFilterPropertes] = useState(false)
  const [filterPanel, setFilterPanel] = useState(false);

  const [filters, setFilters] = useState({
    budgets: [],
    minOutsideSpace: [],
    bedrooms: [],
    propertyTypes: [],
    specificFeature: [],
    listing_type: searchParams.getAll("listing_type") || [],
    minOutsideSpace: [],
    latitude: googleSearchValue ? googleSearchValue?.lat : null,
    longitude: googleSearchValue ? googleSearchValue?.lng : null,
    radius: radiusSelected && radiusSelected.length > 0 ? radiusSelected[0].id : null,
    sortBy: '',
    filterBy: 'split'
  });

  const filterNameMap = {
    "new_build": "New build",
    "property_for_sale": "Property for sale"
  };

  useEffect(() => {

    if (searchParams) {
      const googleSearchRaw = searchParams.get("googleSearchValue");
      const radiusSelectedRaw = searchParams.get("radiusSelected");

      if (googleSearchValue || radiusSelected) {
        // setGoogleSearchParams(true)
        setGoogleSearchValue(googleSearchRaw ? JSON.parse(googleSearchRaw) : '');
        setRadiusSelected(radiusSelectedRaw ? JSON.parse(radiusSelectedRaw) : [{ id: "10000", name: "+10 km" }]);
      }
    }

    async function loadData() {
      try {
        const response = await fetchMasterSearchData();
        setMasterSearchData(response);

        const regionResponse = await fetchRegionOptions();
        setRegionOptions(regionResponse);

        const areasResponse = await fetchAreasOptions();
        setAreasOptions(areasResponse);

      } catch (error) {
        console.error('Error loading master search data:', error);
      } finally {
        setLoading(false);
        setFilterPropertes(true)
      }
    }
    loadData();

    return () => {
      // This runs on unmount
      setIsMapSplitSearch(false);
    };
  }, []);

  useEffect(() => {
    if (selectedCurrency && !loading) {
      handleSearch()
    }

    return () => {
      fetchMapProperties.cancel();
      fetchMixedProperties.cancel();
      fetchProperties.cancel();
      fetchSplitProperties.cancel();
    };
  }, [selectedCurrency]);

  const fetchMapProperties = debounce(async (filters, page = 1, perPage = itemsPerPage) => {
    try {
      const response = await fetchSearchProperties({
        ...filters,
        page,
        currency: selectedCurrency,
        isMapListing: true
      });
      setMapProperties(response.data || response);
    } catch (error) {
      console.error('Error loading properties:', error);
    }
  }, 500);

  const fetchProperties = debounce(async (filters, page = 1, perPage = itemsPerPage) => {
    try {
      setPropertiesLoading(true);
      const response = await fetchSearchPropertiesList({
        ...filters,
        page,
        per_page: perPage,
        currency: selectedCurrency
      });

      setProperties(response.data || response);
      setTotalItems(response.meta?.total || response.total || 0);
      setCurrentPage(response.meta?.current_page || page);
      setTotalPages(response.meta?.last_page || Math.ceil(
        (response.meta?.total || response.total || 0) / perPage
      ));
      setTotalProperties(response.meta?.total || 0);

    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setPropertiesLoading(false);
    }
  }, 500);

  const fetchMixedProperties = debounce(async (filters, page = 1, perPage = itemsPerPage) => {
    try {
      setPropertiesLoading(true);
      const response = await fetchSearchProperties({
        ...filters,
        page,
        per_page: perPage,
        currency: selectedCurrency
      });
      setMixedProperties(response.data || response);
      setTotalMixedItems(response.meta?.total || response.total || 0);
      setTotalMixedPages(response.meta?.last_page || Math.ceil(
        (response.meta?.total || response.total || 0) / perPage
      ));
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setPropertiesLoading(false);
    }
  }, 500);

  const fetchSplitProperties = debounce(async (filters, page = 1, perPage = itemsPerPage) => {
    try {
      setPropertiesLoading(true);
      const response = await fetchSearchMapProperties({
        ...filters,
        page,
        per_page: perPage,
        currency: selectedCurrency,
      });

      setSplitProperties((prev) => page === 1 ? (response.data || response) : [...prev, ...(response.data || response)]);
      setCurrentPage(response.meta?.current_page || page);
      setTotalPages(response.meta?.last_page || Math.ceil((response.meta?.total || 0) / perPage));
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setPropertiesLoading(false);
    }
  }, 500);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchMasterSearchData();
        setMasterSearchData(response);
      } catch (error) {
        console.error('Error loading master search data:', error);
      }
    }
    loadData();
  }, []);

  const handleSearch = async () => {
    setFilterPropertes(false);
    setPropertiesLoading(true);
    setCurrentPage(1);
    try {
      if (mapFilterType !== 'split') {
        const searchFilters = {
          ...filters,
          filterBy: mapFilterType,
          region: regionSelected.map(r => r.id),
          departments: deptSelected.map(d => d.id),
          cantons: cantonSelected.map(c => c.id),
          areas: areasSelected.map(a => a.id),
          subAreas: subAreasSelected.map(s => s.id),
          towns: townSelected.map(t => t.id),
          listing_type: searchType,
          circleArea: circleData
        };
        fetchMapProperties(searchFilters);
        fetchProperties(searchFilters);
        fetchMixedProperties(searchFilters);
      }

      if (mapFilterType === 'split') {
        const searchFilters = {
          ...filters,
          filterBy: mapFilterType,
          listing_type: searchType,
          latitude: googleSearchValue ? googleSearchValue?.lat : null,
          longitude: googleSearchValue ? googleSearchValue?.lng : null,
          radius: radiusSelected && radiusSelected.length > 0 ? radiusSelected[0].id : null,
        };
        fetchSplitProperties(searchFilters);
      }

    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1)
    if (mapFilterType && properties && properties.length === 0 && mapFilterType !== 'split') {
      setFilterPropertes(true)
    }

    if (mapFilterType === "split") {
      setIsMapSplitSearch(true)
      fetchSplitProperties(filters);
    } else {
      setIsMapSplitSearch(false)
    }
  }, [mapFilterType])

  useEffect(() => {
    if (!googleSearchParams && radiusSelected && mapFilterType === 'split') {
      setFilterPropertes(true)
    }
  }, [googleSearchValue, radiusSelected])

  useEffect(() => {
    if (googleSearchParams && googleSearchValue && radiusSelected && mapFilterType === 'split') {
      setGoogleSearchParams(false)
      setFilterPropertes(true)
    }
  }, [googleSearchValue])

  useEffect(() => {
    if (filterPropertes) {
      handleSearch();
      setPropertiesLoading(true);
      setSplitProperties([]);
      setCurrentPage(1);
    }
  }, [filterPropertes])

  useEffect(() => {
    if (sortByFilter && properties.length > 0) {
      handleSearch();
    }
  }, [sortByFilter])

  const handleSortByChange = (val) => {
    if (val === "latest") {
      setSortByFilter("latest");
      setFilters(prev => ({
        ...prev,
        sortBy: ""
      }));
    } else {
      setSortByFilter(val);
      setFilters(prev => ({
        ...prev,
        sortBy: val
      }));
    }
  };

  useEffect(() => {
    const hasActiveFilters =
      filters.budgets?.length > 0 ||
      filters.bedrooms?.length > 0 ||
      filters.propertyTypes?.length > 0 ||
      filters.specificRequirements?.length > 0 ||
      filters.listing_type?.length > 0 ||
      filters.minOutsideSpace?.length > 0;

    if (hasActiveFilters === true || googleSearchValue || radiusSelected) {
      setHasFilters(hasActiveFilters);
    } else {
      setHasFilters(false);
    }
  }, [filters]);

  const resetFilters = () => {
    if (!hasFilters) return;
    const newUrl = `${window.location.pathname}`;

    router.replace(newUrl, { scroll: false });
    setFilters({
      budgets: [],
      minOutsideSpace: [],
      bedrooms: [],
      propertyTypes: [],
      specificRequirements: [],
      listing_type: '',
      minOutsideSpace: [],
      sortBy: ''
    });

    setSortByFilter('latest');
    setCurrentPage(1);

    // top filter reset
    setRegionSelected([]);
    setDeptSelected([]);
    setCantonSelected([]);
    setAreasSelected([]);
    setSubAreasSelected([]);
    setTownSelected([]);

    // for google search
    setGoogleSearchValue(null);
    setRadiusSelected([{ id: "10000", name: "+10 km" }]);

    setFilterPropertes(true)
  };

  const description = ``;

  useEffect(() => {
    const fetchDepartments = async () => {
      setDeptSelected([]);
      setCantonSelected([]);

      if (!regionSelected || regionSelected.length === 0) {
        setDeptOptions([]);
        return;
      }

      try {
        const response = await fetchDepartmentsByRegion(regionSelected.map(r => r.id));
        setDeptOptions(response);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [regionSelected]);

  useEffect(() => {
    const fetchCantons = async () => {
      setCantonSelected([]);

      if (!deptSelected || deptSelected.length === 0) {
        setCantonOptions([]);
        return;
      }

      try {
        const response = await fetchCantonsByDepartment({
          departments: deptSelected.map(d => d.id),
        });
        setCantonOptions(response);
      } catch (error) {
        console.error('Error fetching cantons:', error);
      }
    };

    fetchCantons();
  }, [deptSelected]);

  useEffect(() => {
    const fetchSubAreas = async () => {
      setSubAreasSelected([]);
      setTownSelected([]);

      if (!areasSelected || areasSelected.length === 0) {
        setSubAreasOptions([]);
        return;
      }

      try {
        const response = await fetchSubAreasByArea({
          areas: areasSelected.map(d => d.id),
        });
        setSubAreasOptions(response);
      } catch (error) {
        console.error('Error fetching sub areas:', error);
      }
    };

    fetchSubAreas();
  }, [areasSelected]);

  useEffect(() => {
    const fetchTowns = async () => {
      setTownSelected([]);

      if (!subAreasSelected || subAreasSelected.length === 0) {
        setTownOptions([]);
        return;
      }

      try {
        const response = await fetchTownsBySubArea({
          sub_areas: subAreasSelected.map(d => d.id),
        });
        setTownOptions(response);
      } catch (error) {
        console.error('Error fetching cantons:', error);
      }
    };

    fetchTowns();
  }, [subAreasSelected]);

  useEffect(() => {
    if (mapProperties && mapProperties.length > 0) {
      const validProperty = mapProperties.find(
        (property) => property?.latitude != null && property?.longitude != null
      );
      if (validProperty) {
        setMapCenter({ lat: validProperty.latitude, lng: validProperty.longitude });
  
        if (mapFilterType === "radius") {
          setCircleData({
            lat: validProperty.latitude,
            lng: validProperty.longitude,
            radius: 50000,
          });
        }
      }
    }
  }, [mapProperties, mapFilterType]);

  // useEffect(() => {
  //   if (circleData && JSON.stringify(circleData) !== JSON.stringify(prevCircleData)) {
  //     console.log(circleData, "Aadi test 2")
  //   }
  // }, [circleData]); // changing continuously, fix

  const prevCircleData = useRef(circleData);

  // for maps
  useEffect(() => {
    if (deptOptions && deptOptions.length > 0) {
      deptOptions[0].items.forEach(function (department) {
        let items = {
          "type": "Feature",
          "properties": {
            "nom": department.name,
            "id": department.id
          },
          "geometry": {
            "type": "MultiPolygon",
            "coordinates": department.coordinates
          }
        }

        let center = getMultiPolygonCenter(department.coordinates);
        setMapCenter(center)
        mapState.currentRegion = regionSelected;

        mapState.departments.features.push(items);
      })

      setFeatureCollection(mapState.departments);
    }
  }, [deptOptions, mapFilterType])

  const onLocationSelect = (place) => {
    setGoogleSearchValue(place);
  };

  return (
    <>
      <section className="">
        <div className='bg-mainbg z-2 relative pt-8'>
          <div className="container">
            <div className="flex flex-wrap justify-center  gap-1 sm:gap-2">
              <div className={`cursor-pointer fs-5 flex gap-1 sm:gap-2 items-center px-1 sm:px-2 border-b-2 pb-1.5 ${mapFilterType === "split" ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setMapFilterType("split")}>
                <FaRegHardDrive size={20} className="rotate-90" />
                <span className="font-medium text-xs sm:text-sm">
                  {tg('splitSearch')}
                </span>
              </div>

              <div className={`cursor-pointer fs-5 flex gap-1 sm:gap-2 items-center px-1 sm:px-2 border-b-2 pb-1.5 ${mapFilterType === "map" ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setMapFilterType("map")}>
                <FaMapLocationDot size={20} />
                <span className="font-medium text-xs sm:text-sm">
                  {tg('mapSearch')}
                </span>
              </div>

              <div className={`cursor-pointer fs-5 flex gap-1 sm:gap-2 items-center px-1 sm:px-2 border-b-2 pb-1.5 ${mapFilterType === "radius" ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setMapFilterType("radius")}>
                <FaLocationCrosshairs size={20} />
                <span className="font-medium text-xs sm:text-sm">
                  {tg('radiusSearch')}
                </span>
              </div>

              <div className={`cursor-pointer fs-5 flex gap-1 sm:gap-2 items-center px-1 sm:px-2 border-b-2 pb-1.5 ${mapFilterType === "location" ? "text-primary border-primary" : "border-transparent"}`} onClick={() => setMapFilterType("location")}>
                <SkiIcon className={`w-6 h-8 ${mapFilterType === "location" ? "text-primary" : "text-dark"}`} />
                <span className="font-medium text-xs sm:text-sm">
                  {tg('searchBySkiDomain')}
                </span>
              </div>
            </div>
          </div>

          {/* top select options */}
          {(mapFilterType !== "radius" && mapFilterType !== "split") && (
            <TopFilters
              setRegionSelected={setRegionSelected}
              regionSelected={regionSelected}
              regionOptions={regionOptions}
              setDeptSelected={setDeptSelected}
              deptSelected={deptSelected}
              deptOptions={deptOptions}
              setCantonSelected={setCantonSelected}
              cantonSelected={cantonSelected}
              cantonOptions={cantonOptions}
              setAreasSelected={setAreasSelected}
              areasSelected={areasSelected}
              areasOptions={areasOptions}
              setSubAreasSelected={setSubAreasSelected}
              subAreasSelected={subAreasSelected}
              subAreasOptions={subAreasOptions}
              setTownSelected={setTownSelected}
              townSelected={townSelected}
              townOptions={townOptions}
              mapFilterType={mapFilterType}
            />
          )}
        </div>

        <div className={`${mapFilterType !== 'split' && 'container'}`}>
          <div className={`grid grid-cols-1 ${mapFilterType !== 'split' && 'md:grid-cols-7'} gap-4`}>
            {mapFilterType !== 'split' && (
              <div className="col-span-1 md:col-span-3 xl:col-span-2">
                <div className="bg-white py-4 rounded-xl h-full flex">
                  <SearchFiltersBox
                    setFilters={setFilters}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    masterSearchData={masterSearchData}
                    loading={loading}
                    resetFilters={resetFilters}
                    setFilterPropertes={setFilterPropertes}
                    hasFilters={hasFilters}
                  />
                </div>
              </div>
            )}

            <div className="col-span-1 md:col-span-4 xl:col-span-5">
              {mapFilterType !== 'split' && (
                <div className="bg-white p-3 rounded-xl overflow-hidden search_map flex justify-center items-center min-h-[450px]">
                  {/* {lat && lng && (
                  )} */}
                  {mapFilterType === 'map' && (
                    <GoogleMapsProvider>
                      <MapSearch
                        mapFilterType="map"
                        mapProperties={mapProperties}
                        featureCollection={featureCollection}
                        mapCenter={mapCenter}
                        setCircleData={setCircleData}
                        circleData={circleData}
                        setDeptSelected={setDeptSelected}
                        deptSelected={deptSelected}
                      />
                    </GoogleMapsProvider>
                  )}

                  {mapFilterType === 'radius' && (
                    <GoogleMapsProvider>
                      <MapSearch
                        mapFilterType="radius"
                        mapProperties={mapProperties}
                        featureCollection={featureCollection}
                        mapCenter={mapCenter}
                        setCircleData={setCircleData}
                        circleData={circleData}
                        setDeptSelected={setDeptSelected}
                        deptSelected={deptSelected}
                      />
                    </GoogleMapsProvider>
                  )}

                  {mapFilterType === 'location' && (
                    <GoogleMapsProvider>
                      <MapSearch
                        mapFilterType="location"
                        mapProperties={mapProperties}
                        featureCollection={featureCollection}
                        mapCenter={mapCenter}
                        setCircleData={setCircleData}
                        circleData={circleData}
                        setDeptSelected={setDeptSelected}
                        deptSelected={deptSelected}
                      />
                    </GoogleMapsProvider>
                  )}
                </div>
              )}

              {(mapFilterType === 'split') && (
                <>
                  <div className='bg-white p-3 flex justify-center items-center gap-3 sticky top-0 seachLocationFilter'>
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
                  
                  <div className="flex justify-center min-h-[450px]">
                    <GoogleMapsProvider>
                      <MapSplit
                        properties={splitProperties}
                        pageType={2}
                        setGoogleSearchValue={setGoogleSearchValue}
                        googleSearchValue={googleSearchValue}
                        setRadiusSelected={setRadiusSelected}
                        radiusSelected={radiusSelected}
                        setFilters={setFilters}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        masterSearchData={masterSearchData}
                        loading={loading}
                        resetFilters={resetFilters}
                        setFilterPropertes={setFilterPropertes}
                        hasFilters={hasFilters}
                        propertiesLoading={propertiesLoading}
                        fetchSplitProperties={fetchSplitProperties}
                        filters={filters}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        filterPanel={filterPanel}
                        setFilterPanel={setFilterPanel}
                      />
                    </GoogleMapsProvider>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </section>

      {mapFilterType !== 'split' && (
        <section className='py-8 bg-white mt-9 border-b z-10'>
          <div className='container'>
            <div className='flex flex-col gap-4'>
              <div className="flex flex-col gap-1">
                <h4 className='font-semibold text-lg'>
                  {propertiesLoading ? (
                    <div className="text-sm">{t("fetchingProperties")}</div>
                  ) : (
                    <span className="text-primary">
                      <NumberDisplay value={viewType ? totalProperties : totalMixedItems} />

                      <span className="ps-1">
                        {!viewType && (
                          <>
                            {searchType.length > 1 ? (
                              t("propertiesBoth", { count: viewType ? totalProperties : totalMixedItems })
                            ) : (
                              searchType[0] === 'new_build' ? (
                                t("newBuildCount", { count: viewType ? totalProperties : totalMixedItems })
                              ) : (
                                t("propertySaleCount", { count: viewType ? totalProperties : totalMixedItems })
                              )
                            )}
                          </>
                        )}

                        {viewType && t("propertyAvailable", { count: totalMixedItems })}
                      </span>
                    </span>
                  )}
                </h4>
                <LongText text={description} limit={250} className="text-sm text-gray-700 leading-relaxed" />
              </div>

              <div className='flex justify-between items-center flex-wrap gap-2 sm:gap-0'>

                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => { setViewType(false); setCurrentPage(1); }}
                          className={`${!viewType ? "!bg-primary !text-white" : ""}`}
                        >
                          <BsViewList />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent align="center" alignOffset={20}>
                        <p>{tg("showDevelopments")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => { setViewType(true); setCurrentPage(1); }}
                          className={`size-5 !p-1 ${viewType ? "!bg-primary !text-white" : ""}`}
                        >
                          <BsViewStacked />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent align="center" alignOffset={20}>
                        <p>{tg("showIndiProperties")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Select value={sortByFilter} onValueChange={handleSortByChange}>
                  <SelectTrigger className="w-[180px] bg-white !text-zinc-900 font-semibold">
                    <SelectValue placeholder={t("sortBy")} />
                  </SelectTrigger>
                  <SelectContent align="end" className="max-h-60 overflow-y-auto">
                    <SelectGroup>
                      {/* <SelectItem value="clear">{t("clearSelection")}</SelectItem> */}
                      <SelectItem value="latest">{t("mostRecent")}</SelectItem>
                      <SelectItem value="price_asc">{t("priceLowToHigh")}</SelectItem>
                      <SelectItem value="price_desc">{t("priceHighToLow")}</SelectItem>
                      <SelectItem value="size_asc">{t("sizeLowToHigh")}</SelectItem>
                      <SelectItem value="size_desc">{t("sizeHighToLow")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {propertiesLoading ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="col-span-1">
                        <SkeletonCard />
                      </div>
                    ))}
                  </div>
                </>
              ) : viewType ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  {properties && properties.length > 0 ? (
                    properties.flatMap((item) => (
                      <div key={item.id} className="col-span-1">
                        <PropertyCardUnits
                          item={item}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-gray-500 text-lg">
                        {propertiesLoading ? tg('loadingWait') : t('noPropertiesFound')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  {mixedProperties && mixedProperties.length > 0 ? (
                    mixedProperties.map((item, index) => (
                      <div key={index} className="col-span-1">
                        <MixedPropertyCard item={item} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-gray-500 text-lg">
                        {propertiesLoading ? tg('loadingWait') : t('noPropertiesFound')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* pagination */}
              {!propertiesLoading && viewType && totalItems > itemsPerPage && (
                <div className="flex justify-center my-4">
                  <div className="flex gap-1 sm:gap-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      disabled={currentPage === 1 || propertiesLoading}
                      onClick={() => {
                        const newPage = currentPage - 1;
                        setCurrentPage(newPage);
                        const searchFilters = {
                          ...filters,
                          listing_type: searchType,
                          filterBy: mapFilterType
                        };
                        fetchProperties(searchFilters, newPage);
                      }}
                      className="!p-0 !min-w-8 !h-8"
                    >
                      <BsChevronLeft size={18} />
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let startPage = Math.max(1, currentPage - 2);
                      if (currentPage + 2 > totalPages) {
                        startPage = Math.max(1, totalPages - 4);
                      }
                      return startPage + i;
                    })
                      .filter(page => page >= 1 && page <= totalPages)
                      .map(page => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          disabled={propertiesLoading}
                          onClick={() => {
                            setCurrentPage(page);
                            const searchFilters = {
                              ...filters,
                              listing_type: searchType,
                              filterBy: mapFilterType
                            };
                            fetchProperties(searchFilters, page);
                          }}
                          className="!p-0 !min-w-8 !h-8"
                        >
                          {page}
                        </Button>
                      ))}

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      disabled={currentPage >= totalPages || propertiesLoading}
                      onClick={() => {
                        const newPage = currentPage + 1;
                        setCurrentPage(newPage);
                        const searchFilters = {
                          ...filters,
                          listing_type: searchType,
                          filterBy: mapFilterType
                        };
                        fetchProperties(searchFilters, newPage);
                      }}
                      className="!p-0 !min-w-8 !h-8"
                    >
                      <BsChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              )}

              {!propertiesLoading && !viewType && totalMixedItems > itemsPerPage && (
                <div className="flex justify-center my-4">
                  <div className="flex gap-1 sm:gap-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      disabled={currentPage === 1 || propertiesLoading}
                      onClick={() => {
                        const newPage = currentPage - 1;
                        setCurrentPage(newPage);
                        const searchFilters = {
                          ...filters,
                          listing_type: searchType,
                          filterBy: mapFilterType
                        };
                        fetchMixedProperties(searchFilters, newPage);
                      }}
                      className="!p-0 !min-w-8 !h-8"
                    >
                      <BsChevronLeft size={18} />
                    </Button>

                    {Array.from({ length: Math.min(5, totalMixedPages) }, (_, i) => {
                      let startPage = Math.max(1, currentPage - 2);
                      if (currentPage + 2 > totalMixedPages) {
                        startPage = Math.max(1, totalMixedPages - 4);
                      }
                      return startPage + i;
                    })
                      .filter(page => page >= 1 && page <= totalMixedPages)
                      .map(page => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          disabled={propertiesLoading}
                          onClick={() => {
                            setCurrentPage(page);
                            const searchFilters = {
                              ...filters,
                              listing_type: searchType,
                              filterBy: mapFilterType
                            };
                            fetchMixedProperties(searchFilters, page);
                          }}
                          className="!p-0 !min-w-8 !h-8"
                        >
                          {page}
                        </Button>
                      ))}

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      disabled={currentPage >= totalMixedPages || propertiesLoading}
                      onClick={() => {
                        const newPage = currentPage + 1;
                        setCurrentPage(newPage);
                        const searchFilters = {
                          ...filters,
                          listing_type: searchType,
                          filterBy: mapFilterType
                        };
                        fetchMixedProperties(searchFilters, newPage);
                      }}
                      className="!p-0 !min-w-8 !h-8"
                    >
                      <BsChevronRight size={18} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* <NewsLetter /> */}
    </>
  )
}

export default SearchProperty