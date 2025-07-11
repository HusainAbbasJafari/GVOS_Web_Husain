'use client';


import { useGlobalContext } from "@/app/context/GlobalContext";
import HeroCarousel from "@/components/HeroCaraousel";
import LocationMap from "@/components/LocationMap";
import NewsLetter from "@/components/NewsLetter";
import VideoSlider from "@/components/VideoSlider";
import GetQuoteForm from "@/components/custom-ui/GetQuoteForm";
import { HomeSlider } from "@/components/custom-ui/HomeSlider";
import SlickButton from "@/components/custom-ui/SlickButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import bannerIcon1 from "@/public/images/icons/bannerIcon1.svg";
import bannerIcon2 from "@/public/images/icons/bannerIcon2.svg";
import bannerIcon3 from "@/public/images/icons/bannerIcon3.svg";
import bannerIcon4 from "@/public/images/icons/bannerIcon4.svg";
import placeholderImage from "@/public/images/placeholder.png";
import { fetchResaleProperty } from "@/services/api";
import { getImageSrc, imageErrorHandler } from "@/utility/general";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import SkiIcon from "@/components/custom-ui/SkiIcon";

export default function Development() {
  const { selectedCurrency, setLoadingMain } = useGlobalContext();
  const t = useTranslations('Property');
  const tg = useTranslations('General');
  const { data: session } = useSession();

  const params = useParams();
  const uuid = params.uuid;
  const [getQuoteDialog, setGetQuoteDialog] = useState(false);

  const [resaleProperty, setResaleProperty] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setLoadingMain(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMain(true);
        const data = await fetchResaleProperty(uuid, selectedCurrency);
        if (!data) {
          router.push(`/not-found`);
        }
        setResaleProperty(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch resale property details');
        router.push(`/not-found`);
      } finally {
        setLoadingMain(false);
      }
    };

    if (uuid) {
      fetchData();
    }
  }, [uuid, selectedCurrency]);

  const backgroundImageUrl = resaleProperty?.master_image
    ? resaleProperty.master_image
    : placeholderImage;

  const showFloorPlan = (e) => {
    if (!session) {
      e.preventDefault();
      setGetQuoteDialog(true);
    } else {
      setDialogContent('floorPlan');
      setDialogOpen(true);
    }
  };

  const showVideos = (e) => {
    if (!session) {
      e.preventDefault();
      setGetQuoteDialog(true);
    } else {
      setDialogContent('videos');
      setDialogOpen(true);
    }
  };
  const show360Tour = (e) => {
    if (!session) {
      e.preventDefault();
      setGetQuoteDialog(true);
    } else {
      setDialogContent('360Tour');
      setDialogOpen(true);
    }
  };
  const showDroneFootage = (e) => {
    if (!session) {
      e.preventDefault();
      setGetQuoteDialog(true);
    } else {
      setDialogContent('droneFootage');
      setDialogOpen(true);
    }
  };

  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat h-[calc(100vh-122px)] flex flex-col">

        {resaleProperty && resaleProperty.images && resaleProperty.images.length > 1 ? (
          <HeroCarousel
            renderButtons={({ sliderRef }) => (
              <SlickButton className="hidden md:flex min-w-10 w-10" sliderRef={sliderRef} iconSize={18} type="type_2" />
            )}
          >
            {resaleProperty.images.map((item, index) => (
              <HomeSlider
                key={index}
                item={item.url}
                isHome={false}
                isVideo={item.url.endsWith(".mp4") || item.url.endsWith(".mov")}
              />
            ))}
          </HeroCarousel>
        ) : resaleProperty && resaleProperty.images && resaleProperty.images.length === 1 ? (
          <HomeSlider
            key={0}
            item={resaleProperty.images[0].url}
            isHome={false}
            isVideo={resaleProperty.images[0].url.endsWith(".mp4") || resaleProperty.images[0].url.endsWith(".mov")}
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
                {(resaleProperty?.geo_level_1 == 'French Alps' &&
                  <SkiIcon className="w-6 h-7 text-primary" />
                )}
                {resaleProperty?.geo_level_2}{(resaleProperty?.geo_level_2 && resaleProperty?.geo_level_3) ? `,` : ''} {resaleProperty?.geo_level_3}
              </h3>
            </div>
          </div>
        </div>

        <div className="z-10 w-full absolute bottom-0 left-0 flex items-end text-white">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 grow border-t border-gray-300">
            <div className="col-span-1 flex">
              <button
                onClick={showFloorPlan}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3 border-r border-b md:border-b-0 border-gray-300`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={bannerIcon1} alt="Profile Image" />
                </div>
                <h5 className="text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("floorPlan")}</h5>
              </button>
            </div>

            <div className="col-span-1 flex">
              <button
                onClick={showVideos}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3 md:border-r border-b md:border-b-0 border-gray-300`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={bannerIcon2} alt="Profile Image" />
                </div>
                <h5 className="text-white text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("interiorFinishes")}</h5>
              </button>
            </div>

            <div className="col-span-1 flex">
              <button
                onClick={show360Tour}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3 border-r border-gray-300`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={bannerIcon3} alt="Profile Image" />
                </div>
                <h5 className="text-white text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("360Tour")}</h5>
              </button>
            </div>

            <div className="col-span-1 flex">
              <button
                onClick={showDroneFootage}
                className={`bg-black/65 hover:bg-black/95 flex-grow mx-auto flex items-center md:justify-center gap-2 py-4 md:py-6 px-[2vw] sm:px-4 sm:gap-3`}
              >
                <div className="w-7 md:w-8 aspect-square">
                  <Image className="w-full h-full" src={bannerIcon4} alt="Profile Image" />
                </div>
                <h5 className="text-white text-sm sm:text-md lg:text-lg 2xl:text-xl font-bold">{t("droneFootage")}</h5>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-whitee py-10 scroll_top_margin size_xl" id="arrowScrollSection">
        <div className="container">
          <h5 className="text-primary text-2xl font-semibold mb-3">{resaleProperty?.name}</h5>

          <div className="flex flex-wrap gap-3 items-center mb-3">
            {/* <p className="me-2">REF: {resaleProperty?.reference_number}</p> */}
            {resaleProperty && resaleProperty.amenities?.map((amenity) => (
              <TooltipProvider key={amenity.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img className="w-6" src={getImageSrc(amenity.image)} alt="icons" onError={imageErrorHandler} title={amenity.name} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{amenity.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <p className="mb-8">
            {resaleProperty?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            <div className="col-span-1">
              <h5 className="text-primary text-xl font-semibold mb-3">
                {t("resalePropertyDetails")}
              </h5>

              <div
                className="flex flex-col gap-3 border border-gray-300 rounded-2xl py-3 px-3 lg:px-4">
                <div className="flex gap-4 [&:not(:last-child)]:border-b border-gray-300 px-2 pt-2 [&:not(:last-child)]:pb-4">
                  <div className="w-3/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon1.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title1")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex flex-col items-center">
                      <span
                        className="mb-0 text-sm">
                        {resaleProperty?.property_price}
                      </span>
                      <p className='text-xs font-light text-gray-500'>{resaleProperty?.property_price_converted}</p>
                    </div>
                  </div>

                  <div className="w-2/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon1_1.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title2")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="mb-0 text-sm">{resaleProperty?.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 [&:not(:last-child)]:border-b border-gray-300 px-2 pt-2 [&:not(:last-child)]:pb-4">
                  <div className="w-3/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon2.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title3")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span
                        className="mb-0 text-sm">
                        {resaleProperty?.address}
                      </span>
                    </div>
                  </div>

                  <div className="w-2/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon2_1.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title4")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="mb-0 text-sm">{resaleProperty?.outside_space}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 [&:not(:last-child)]:border-b border-gray-300 px-2 pt-2 [&:not(:last-child)]:pb-4">
                  <div className="w-3/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon3.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title5")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span
                        className="mb-0 text-sm">
                        {resaleProperty?.property_type}
                      </span>
                    </div>
                  </div>

                  <div className="w-2/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon3_1.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title6")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="mb-0 text-sm">{resaleProperty?.bedroom}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 [&:not(:last-child)]:border-b border-gray-300 px-2 pt-2 [&:not(:last-child)]:pb-4">
                  <div className="w-3/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon4.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title7")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span
                        className="mb-0 text-sm">
                        {resaleProperty?.available_rent_date}
                      </span>
                    </div>
                  </div>

                  <div className="w-2/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon4_1.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title8")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="mb-0 text-sm">{resaleProperty?.no_of_bathroom}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 [&:not(:last-child)]:border-b border-gray-300 px-2 pt-2 [&:not(:last-child)]:pb-4">
                  <div className="w-3/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon5.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title9")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span
                        className="mb-0 text-sm">
                        {resaleProperty?.construction_year}
                      </span>
                    </div>
                  </div>

                  <div className="w-2/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon5_1.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title10")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="mb-0 text-sm">{resaleProperty?.no_of_level}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 [&:not(:last-child)]:border-b border-gray-300 px-2 pt-2 [&:not(:last-child)]:pb-4">
                  <div className="w-3/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon6.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title11")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span
                        className="mb-0 text-sm">
                        {resaleProperty?.ownership_type}
                      </span>
                    </div>
                  </div>

                  <div className="w-2/5 flex items-center gap-2">
                    <div className="w-8 min-w-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <img className="max-w-8 max-h-8" src={`/images/icons/rdIcon6_1.svg`} alt="icon" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t("title12")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="mb-0 text-sm">{resaleProperty?.no_of_level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col">
              <h5 className="text-primary text-xl font-semibold mb-3 h-7"></h5>

              <div className="rounded-2xl overflow-hidden grow">
                <LocationMap latitude={resaleProperty?.latitude} longitude={resaleProperty?.longitude} iconType="resale" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row gap-3 mt-[-1.5rem] pt-14 pb-5 text-center">
            <p className="text-lg">{tg("getQuoteDesc")}</p>
            <Button
              variant="outline"
              onClick={() => setGetQuoteDialog(true)}
              className="!border-primary !bg-white !text-primary !text-dark hover:!bg-primary hover:!text-white !transition-all text-base font-semibold !py-1 !rounded-full"
            >
              {tg("getQuote")}
            </Button>
          </div>

        </div>
      </section>

      <GetQuoteForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} resaleProperty={resaleProperty && resaleProperty.uuid || null} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} className="!p-1">
        <DialogContent className="!max-w-7xl !w-[96%] !h-[96%] p-0 overflow-hidden !bg-transparent border-0">
          <DialogClose asChild></DialogClose>
          <DialogTitle className="!hidden"></DialogTitle>
          <DialogDescription className="!hidden"></DialogDescription>
          {dialogContent === 'floorPlan' && (
            <div className="w-full h-full mt-4 flex justify-center items-center">
              <iframe
                src={resaleProperty?.masterFloorPlanUrl}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Floor Plan"
              />
            </div>
          )}

          {dialogContent === 'videos' && (
            <div className="w-full h-full aspect-[5/4] rounded-2xl overflow-hidden flex justify-center items-center">
              {(resaleProperty?.videos && resaleProperty?.videos.length > 1) ? (
                <VideoSlider videos={resaleProperty?.videos} />
              ) : (
                <video
                  src={resaleProperty?.videos[0]?.url}
                  className="aspect-[5/4] w-full h-full object-cover transition-transform duration-300"
                  controls
                  onError={imageErrorHandler}
                />
              )}
            </div>
          )}

          {dialogContent === '360Tour' && (
            <div className="w-full h-full aspect-[5/4] rounded-2xl overflow-hidden flex justify-center items-center">
              {(resaleProperty?.videoTour && resaleProperty?.videoTour.length > 1) ? (
                <VideoSlider videos={resaleProperty?.videoTour} />
              ) : (
                <video
                  src={resaleProperty?.videoTour[0]?.url}
                  className="aspect-[5/4] w-full h-full object-cover transition-transform duration-300"
                  controls
                  onError={imageErrorHandler}
                />
              )}
            </div>
          )}

          {dialogContent === 'droneFootage' && (
            <div className="w-full h-full aspect-[5/4] rounded-2xl overflow-hidden flex justify-center items-center">
              {(resaleProperty?.droneFootage && resaleProperty?.droneFootage.length > 1) ? (
                <VideoSlider videos={resaleProperty?.droneFootage} />
              ) : (
                <video
                  src={resaleProperty?.droneFootage[0]?.url}
                  className="aspect-[5/4] w-full h-full object-cover transition-transform duration-300"
                  controls
                  onError={imageErrorHandler}
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <NewsLetter />
    </>
  );
}