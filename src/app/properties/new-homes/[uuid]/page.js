'use client';

import { useGlobalContext } from "@/app/context/GlobalContext";
import DevelopmentItem from "@/components/DevelopmentItem";
import HeroCarousel from "@/components/HeroCaraousel";
import NewsLetter from "@/components/NewsLetter";
import GetQuoteForm from "@/components/custom-ui/GetQuoteForm";
import { HomeSlider } from "@/components/custom-ui/HomeSlider";
import SkiIcon from "@/components/custom-ui/SkiIcon";
import SlickButton from "@/components/custom-ui/SlickButton";
import { Button } from "@/components/ui/button";
import brochureImg from "@/public/images/icons/brochure.svg";
import financialImg from "@/public/images/icons/financials.svg";
import interiorImg from "@/public/images/icons/interior-finishes.svg";
import planImg from "@/public/images/icons/master-plan.svg";
import placeholderImage from "@/public/images/placeholder.png";
import { fetchDevelopment, fetchMasterSearchData } from '@/services/api';
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { BsArrowDown } from "react-icons/bs";
import DevelopmentFiltersBox from '@/components/custom-ui/DevelopmentFiltersBox';
import { BiX } from 'react-icons/bi';
import { BsSliders } from 'react-icons/bs';
import DevelopmentItemSkeleton from "@/components/DevelopmentItemSkeleton";
import DevelopmentFilters from '@/components/custom-ui/DevelopmentFilters';

export default function Development() {
  const { selectedCurrency, setLoadingMain } = useGlobalContext();
  const t = useTranslations('Property')
  const tg = useTranslations('General')
  const { data: session } = useSession();

  const params = useParams();
  const uuid = params.uuid;
  const [getQuoteDialog, setGetQuoteDialog] = useState(false);
  const [development, setDevelopment] = useState(null);
  const [error, setError] = useState(null);
  const [masterSearchData, setMasterSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [isCheckBox, setIsCheckBox] = useState(false);
  const [propertyUuid, setPropertyUuid] = useState(null);

  const [filters, setFilters] = useState({
    budgets: [],
    bedrooms: [],
    propertyTypes: [],
    specificFeature: [],
  });

  const [hasFilters, setHasFilters] = useState(false);
  const router = useRouter();

  const [lead, setLead] = useState(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('lead') || null));

  useEffect(() => {
    setLoadingMain(true)
    async function loadData() {
      try {
        const response = await fetchMasterSearchData();
        setMasterSearchData(response);

      } catch (error) {
        console.error('Error loading master search data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const loadDevelopment = useCallback(async (customFilters = null) => {
    setLoadingMain(true);
    setPropertiesLoading(true);

    try {

      const devData = await fetchDevelopment(uuid, selectedCurrency, customFilters || {}, lead || null);
      if (!devData) return router.push("/not-found");

      setDevelopment(devData);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load development data.");
      router.push("/not-found");
    } finally {
      setLoadingMain(false);
      setPropertiesLoading(false);
    }
  }, [uuid, selectedCurrency, filters, lead]);

  useEffect(() => {
    if (uuid) loadDevelopment(filters);
  }, [uuid, selectedCurrency, filters, lead]);


  const resetFilters = async () => {
    if (!hasFilters) return;

    setFilters({
      budgets: [],
      bedrooms: [],
      propertyTypes: [],
      specificFeature: [],
    });

    await loadDevelopment();
    setHasFilters(false);
  };

  const handleFilterApply = async () => {
    await loadDevelopment(filters);
    setHasFilters(true);
  };

  const handleButtonClick = () => {
    setGetQuoteDialog(true);
    setIsCheckBox(true);
  };
  // localStorage.setItem('lead', null)

  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat h-[calc(100vh-122px)] flex flex-col">
        {development && development.images && development.images.length > 1 ? (
          <HeroCarousel
            renderButtons={({ sliderRef }) => (
              <SlickButton className="hidden md:flex min-w-10 w-10" sliderRef={sliderRef} iconSize={18} type="type_2" />
            )}
          >
            {development.images.map((item, index) => (
              <HomeSlider
                key={index}
                item={item.url}
                isHome={false}
                isVideo={item.url.endsWith(".mp4") || item.url.endsWith(".mov")}
              />
            ))}
          </HeroCarousel>
        ) : development && development.images && development.images.length === 1 ? (
          <HomeSlider
            key={0}
            item={development.images[0].url}
            isHome={false}
            isVideo={development.images[0].url.endsWith(".mp4") || development.images[0].url.endsWith(".mov")}
          />
        ) : (
          <HomeSlider
            key={0}
            item={placeholderImage}
            isHome={false}
            isVideo={false}
          />
        )}

        <Link href="#arrowScrollSection" className="text-white z-10 absolute bottom-40 md:bottom-26 left-1/2 -translate-x-1/2 p-3 border rounded-full flex items-center justify-center arrow-bounce hover:border-primary bg-black/40 hover:bg-primary transition-all duration-300">
          <BsArrowDown size={22} />
        </Link>

        <div className="z-10 w-full absolute top-4 right-0">
          <div className="container mx-auto">
            <div className="flex flex-col items-end grow">
              <h3 className="flex gap-2 text-white text-2xl">
                {(development?.geo_level_1 == 'French Alps' &&
                  <SkiIcon className="w-6 h-7 text-primary" />
                )}
                {development?.geo_level_2}{(development?.geo_level_2 && development?.geo_level_3) ? `,` : ''} {development?.geo_level_3}
                {/* {development?.geo_level_2}{(development?.geo_level_2 && development?.geo_level_3) ? `, ${development?.geo_level_3}` : development?.geo_level_3} */}
              </h3>
            </div>
          </div>
        </div>

        <div className="z-10 w-full absolute bottom-0 left-0 flex items-end text-white">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 grow border-t border-gray-300">
            <div className="col-span-1 flex">
              <button
                onClick={(e) => {
                  if (!session) {
                    handleButtonClick();
                  } else if (development?.brochure_url) {
                    window.open(development.brochure_url, '_blank');
                  }
                }}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3 border-r border-b md:border-b-0 border-gray-300`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={brochureImg} alt="Profile Image" />
                </div>
                <h5 className="text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("brochure")}</h5>
              </button>
            </div>

            <div className="col-span-1 flex">
              <button
                onClick={(e) => {
                  if (!session) {
                    handleButtonClick();
                  } else if (development?.interior_finishes_url) {
                    window.open(development.interior_finishes_url, '_blank');
                  }
                }}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3 md:border-r border-b md:border-b-0 border-gray-300`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={interiorImg} alt="Profile Image" />
                </div>
                <h5 className="text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("interiorFinishes")}</h5>
              </button>
            </div>

            <div className="col-span-1 flex">
              <button
                onClick={(e) => {
                  if (!session) {
                    handleButtonClick();
                  } else if (development?.master_plan_url) {
                    window.open(development.master_plan_url, '_blank');
                  }
                }}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3 border-r border-gray-300`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={planImg} alt="Profile Image" />
                </div>
                <h5 className="text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("masterPlan")}</h5>
              </button>
            </div>

            <div className="col-span-1 flex">
              <button
                onClick={(e) => {
                  if (!session) {
                    handleButtonClick();
                  } else if (development?.financial_projection_url) {
                    window.open(development.financial_projection_url, '_blank');
                  }
                }}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={financialImg} alt="Profile Image" />
                </div>
                <h5 className="text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("financials")}</h5>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-whitee pb-10 scroll_top_margin size_xl" id="arrowScrollSection">
        <div className="container">
          <div className="pb-5 pt-14">
            <DevelopmentFilters
              setFilters={setFilters}
              filters={filters}
              masterSearchData={masterSearchData}
              loading={loading}
              setHasFilters={setHasFilters}
              hasFilters={hasFilters}
              resetFilters={resetFilters}
              development={development}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {propertiesLoading ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="col-span-1">
                      <DevelopmentItemSkeleton />
                    </div>
                  ))}
                </>
              ) : (
                development && development.properties.length > 0 && development.properties.map((item, index) => (
                  <div key={index} className="col-span-1">
                    <DevelopmentItem item={item} session={session} setGetQuoteDialog={setGetQuoteDialog} setIsCheckBox={setIsCheckBox} setPropertyUuid={setPropertyUuid} />
                  </div>
                ))
                || (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 text-lg">{t("noPropertiesFound")}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row gap-3 mt-[-1.5rem] pt-14 pb-5 text-center">
            <p className="text-lg">{tg("getQuoteDesc")}</p>
            <Button
              variant="outline"
              onClick={() => handleButtonClick()}
              className="!border-primary !bg-white !text-primary !text-dark hover:!bg-primary hover:!text-white !transition-all text-base font-semibold !py-1 !rounded-full"
            >
              {tg("getQuote")}
            </Button>
          </div>
        </div>

        <GetQuoteForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} development={development && development.uuid || null} isCheckBox={isCheckBox} setLead={setLead} />
      </section >
      <NewsLetter />
    </>
  );
}