"use client";
import HeroCarousel from "@/components/HeroCaraousel";
import LocationListBox from "@/components/LocationListBox";
import NewsLetter from "@/components/NewsLetter";
import { HomeSlider } from "@/components/custom-ui/HomeSlider";
import NewSlider from "@/components/custom-ui/NewSlider";
import SlickButton from "@/components/custom-ui/SlickButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import personIcon from "@/public/images/icons/person-icon.svg";
import searchIcon from "@/public/images/icons/search-home.svg";
import { fetchMedProperties, fetchPortfolioCount, fetchSkiProperties } from '@/services/api';
import { heroCaraouselData1, heroCaraouselData2, radiusData } from "@/utility/data";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { BsArrowDown, BsArrowRight, BsFillGeoAltFill, BsHouses, BsPersonCircle } from "react-icons/bs";
import { useGlobalContext } from "./context/GlobalContext";
import LocationAutocomplete from "@/components/custom-ui/LocationAutocomplete";
import MultiSelect from "@/components/custom-ui/MultiSelect";
import GetCallBackForm from "@/components/custom-ui/GetCallBackForm";

export default function Home() {
  const { selectedCurrency, homeLoading, setHomeLoading, seasonType } = useGlobalContext();
  const t = useTranslations('HomePage');
  const tg = useTranslations('General');

  const router = useRouter();
  const [skiProperties, setSkiProperties] = useState([]);
  const [medProperties, setMedProperties] = useState([]);
  const [portfolioCount, setPortfolioCount] = useState([]);
  const [getQuoteDialog, setGetQuoteDialog] = useState(false);

  useEffect(() => {
    setHomeLoading(true)
    async function loadData() {
      try {
        const [skiData, medData, portfolioCountData] = await Promise.all([
          fetchSkiProperties(selectedCurrency),
          fetchMedProperties(selectedCurrency),
          fetchPortfolioCount()
        ]);

        setSkiProperties(skiData);
        setMedProperties(medData);
        setPortfolioCount(portfolioCountData);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setHomeLoading(false);
      }
    }

    loadData();
  }, [selectedCurrency]);

  const [searchType, setSearchType] = useState(["new_build", "property_for_sale"]);
  const [googleSearchValue, setGoogleSearchValue] = useState('')
  const [radiusSelected, setRadiusSelected] = useState([{ id: "10000", name: "+10 km" }])

  const heroCaraouselData = seasonType ? heroCaraouselData2 : heroCaraouselData1

  const handleViewProperties = () => {
    const filters = Array.isArray(searchType) ? searchType : [searchType];
    const queryString = new URLSearchParams();

    filters.forEach(filter => queryString.append('listing_type', filter));

    if (googleSearchValue) {
      queryString.append('googleSearchValue', JSON.stringify(googleSearchValue));
    }

    if (radiusSelected && radiusSelected.length > 0) {
      queryString.append('radiusSelected', JSON.stringify(radiusSelected));
    }

    router.push(`/search-properties?${queryString.toString()}`);
  };


  const onLocationSelect = (place) => {
    setGoogleSearchValue(place)
  }

  return (
    <>
      <section className="relative">
        {heroCaraouselData && heroCaraouselData.length > 1 && (
          <HeroCarousel
            key={seasonType ? 'summer' : 'winter'} // Force remount
            renderButtons={({ sliderRef }) => (
              <SlickButton className="hidden md:flex min-w-10 w-10" sliderRef={sliderRef} iconSize={18} type="type_2" />
            )}
          >
            {heroCaraouselData.map((item, index) => (
              <HomeSlider
                key={index}
                item={item}
                isHome={true}
                isVideo={
                  typeof item.image === 'string' &&
                  (item.image.endsWith('.mp4') || item.image.endsWith('.mov'))
                }
                totalProperties={portfolioCount && portfolioCount.availableProperties}
                totalDevelopments={portfolioCount && portfolioCount.developmentsCount}
              />
            ))}
          </HeroCarousel>
        )}

        {heroCaraouselData && heroCaraouselData.length === 1 && (
          <HomeSlider
            key={seasonType ? 'summer-single' : 'winter-single'}
            item={heroCaraouselData[0]}
            isHome={true}
            isVideo={
              typeof heroCaraouselData[0].image === 'string' &&
              (heroCaraouselData[0].image.endsWith('.mp4') || heroCaraouselData[0].image.endsWith('.mov'))
            }
            totalProperties={portfolioCount && portfolioCount.availableProperties}
            totalDevelopments={portfolioCount && portfolioCount.developmentsCount}
          />
        )}

        <Link href="#properties_list" className="text-white z-10 absolute bottom-18 left-1/2 -translate-x-1/2 p-3 border rounded-full flex items-center justify-center arrow-bounce hover:border-primary bg-black/40 hover:bg-primary transition-all duration-300">
          <BsArrowDown size={22} />
        </Link>
      </section>

      {/* {!homeLoading && (
      )} */}
      <>
        <section className={`w-full bg-dynamic py-10 scroll_top_margin size_xl flex gap-10 ${seasonType ? 'flex-col-reverse' : 'flex-col'} items-center`} id="properties_list">
          <div className="w-full">
            {skiProperties && skiProperties.length > 0 && (
              <div data-aos="fade-up">
                {skiProperties && skiProperties.length > 0 && (
                  <NewSlider
                    items={skiProperties}
                    title={t.rich('skiProperties', {
                      font: (chunks) => <span className="font-alt">{chunks}</span>
                    })}
                  />
                )}
              </div>
            )}
          </div>

          <div className="w-full">
            {medProperties && medProperties.length > 0 && (
              <div data-aos="fade-up">
                {medProperties && medProperties.length > 0 && (
                  <NewSlider
                    items={medProperties}
                    title={t.rich('medProperties', {
                      font: (chunks) => <span className="font-alt">{chunks}</span>
                    })} />
                )}
              </div>
            )}
          </div>
        </section>

        <section className="bg-gray-100 py-6">
          <div className="container">
            <div className="flex gap-4 lg:gap-6 lg:items-center justify-center max-w-3xl mx-auto flex-wrap">

              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="new_build"
                    checked={searchType.includes("new_build")}
                    onCheckedChange={(checked) => {
                      setSearchType((prev) =>
                        checked
                          ? [...prev, "new_build"]
                          : prev.filter((val) => val !== "new_build")
                      );
                    }}
                  />
                  <Label className="text-nowrap" htmlFor="new_build">{tg('newBuild')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="property_for_sale"
                    checked={searchType.includes("property_for_sale")}
                    onCheckedChange={(checked) => {
                      setSearchType((prev) =>
                        checked
                          ? [...prev, "property_for_sale"]
                          : prev.filter((val) => val !== "property_for_sale")
                      );
                    }}
                  />
                  <Label className="text-nowrap" htmlFor="property_for_sale">{tg('propertyForSale')}</Label>
                </div>
              </div>

              <div className='flex justify-center items-center gap-3 grow'>
                <div className="grow relative sm:min-w-3xs">
                  <LocationAutocomplete
                    userLatLng={{ lat: 48.8566, lng: 2.3522 }} // Paris
                    onSelect={onLocationSelect}
                    isRoundedFull={true}
                    setGoogleSearchValue={setGoogleSearchValue}
                  />

                  <Button component="a" onClick={() => handleViewProperties()} className="py-1 px-4 border border-primary bg-white hover:bg-primary text-dark hover:!text-white !rounded-full text-sm sm:text-md absolute top-1/2 -translate-y-1/2 right-1 transition-all">
                    {tg("search")}
                  </Button>
                </div>

                <div className='w-[100px] sm:w-[130px]'>
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
              </div>

              {/* <div className="grow relative min-w-3xs">
                  <Input
                    type="text"
                    placeholder={tg("searchPlaceholder")}
                    className="!rounded-3xl !border-gray-300 bg-white !px-4 !py-5 !outline-0 !shadow-none placeholder:text-xs lg:placeholder:text-base"
                  />
                  <Button component="a" onClick={() => handleViewProperties()} className="py-1 px-4 border border-primary bg-white hover:bg-primary text-dark hover:!text-white !rounded-full text-sm sm:text-md absolute top-1/2 -translate-y-1/2 right-1 transition-all">
                    {tg("search")}
                  </Button>
                </div> */}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container">
            <div className="px-3 py-10 flex flex-col justify-center items-center max-w-[800px] mx-auto text-center">
              <div data-aos="zoom-in" data-aos-duration="1000" data-aos-offset="100" data-aos-delay="100" className="my-4">
                <h2 className="text-2xl text-dark font-medium">
                  {t("title1")}
                </h2>
              </div>
              <p>
                {t("desc1")}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-dynamic">
          <div className="container">
            <div className="px-3 py-10 text-center text-dynamic">
              <h3 className="text-xl mb-8 md:mb-10 flex items-center justify-center gap-2">
                <BsHouses size={28} /> {t("title2")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 max-w-[900px] mx-auto text-center">
                <div className="col-span-1">
                  <p>
                    {tg("covering")} <span className="text-primary">
                      {portfolioCount && portfolioCount.frenchAlpes}
                    </span> {t("desc21")}
                  </p>
                </div>
                <div className="col-span-1">
                  <p>
                    {tg("covering")} <span className="text-primary">
                      {portfolioCount && portfolioCount.frenchRiviera}
                    </span> {t("desc23")}
                  </p>
                </div>
                <div className="col-span-1">
                  <p>
                    {tg("covering")} <span className="text-primary">
                      {portfolioCount && portfolioCount.langudocRoussillon}
                    </span> {t("desc22")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container">
            <div className="px-3 py-10 mx-auto">
              <div className="flex flex-col justify-center items-center mb-8 md:mb-10">
                <div data-aos="zoom-in" data-aos-duration="800" data-aos-offset="100" data-aos-delay="100" className="my-4">
                  <div className="flex justify-center gap-3">
                    <Image src={personIcon} alt="person_icon" className="w-auto h-10" />
                    <div className="h-full self-center">
                      <h2 className="text-3xl text-dark font-medium">{t("title3")}</h2>
                    </div>
                  </div>
                </div>

                <p>
                  {t("desc3")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 max-w-[900px] mx-auto text-center">
                <div className="col-span-1">
                  <div data-aos="fade-right" data-aos-duration="1000">
                    <button
                      onClick={() => setGetQuoteDialog(true)}
                      className="w-full group relative text-sm text-primary flex justify-between items-center border hover:border-primary transition-colors rounded-full p-4 h-full overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <BsPersonCircle size={25} />
                        <span className="text-dark text-sm leading-none">{tg("talkWithUs")}</span>
                      </div>
                      <BsArrowRight
                        size={25}
                        className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 min-w-6"
                      />
                    </button>
                  </div>
                </div>
                <div className="col-span-1">
                  <div data-aos="fade-right" data-aos-duration="1200" data-aos-delay="100">
                    <Link
                      href="/search-properties"
                      className="group relative text-sm text-primary flex justify-between items-center border hover:border-primary transition-colors rounded-full p-4 h-full overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <BsFillGeoAltFill size={25} />
                        <span className="text-dark text-sm leading-none">{tg("findAProperty")}</span>
                      </div>
                      <BsArrowRight
                        size={25}
                        className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 min-w-6"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-span-1">
                  <div data-aos="fade-right" data-aos-duration="1400" data-aos-delay="200">
                    <button
                      onClick={() => setGetQuoteDialog(true)}
                      className="w-full group relative text-sm text-primary flex justify-between items-center border hover:border-primary transition-colors rounded-full p-4 h-full overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <Image src={searchIcon} alt="person_icon" height={25} />
                        <span className="text-dark text-sm leading-none text-start">{tg("bookAnInspectionVisit")}</span>
                      </div>
                      <BsArrowRight
                        size={25}
                        className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 min-w-6"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LocationListBox type="frenchAlps" isEnd={true} order={0} />
        <LocationListBox type="frenchRiviera" isEnd={false} order={1} />
        <LocationListBox type="langudocRoussillon" isEnd={true} order={2} />

        <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction="CallBackNewLead" />
        <NewsLetter />
      </>

    </>
  );
}
