"use client";  // ✅ Add this at the top

import logo from "@/public/images/logo1.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { BiX } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import AreaGuideSubMenu from "./custom-ui/AreaGuideSubMenu";
import BuySubMenu from "./custom-ui/BuySubMenu";
import SellSubMenu from "./custom-ui/SellSubMenu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import enFlag from "@/public/logo/en.svg";
import frFlag from "@/public/logo/fr.svg";
import { CheckIcon, Snowflake, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import SelectArrowDown from "./custom-ui/SelectArrowDown";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { fetchAreaGuideMenu } from "@/services/api";
import { Switch } from "./ui/switch";
import { currencyList } from "@/utility/data";

export default function Header() {
    const { seasonType, setSeasonType, setAreaGuideSlug, setLanguage, language, selectedCurrency, setSelectedCurrency, selectedCurrencySymbol, setSelectedCurrencySymbol, isMapSplitSearch } = useGlobalContext();

    const router = useRouter();
    const t = useTranslations('Header');
    const tg = useTranslations('General');

    const [isPending, startTransition] = useTransition();

    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [areaGuideMenu, setAreaGuideMenu] = useState(false);
    const [buyMenuShow, setBuyMenuShow] = useState(false);
    const [sellMenuShow, setSellMenuShow] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [ourCompnayDrop, setOurCompnayDrop] = useState(false);
    const [languageDrop, setLanguageDrop] = useState(false);
    const [currencyDrop, setCurrencyDrop] = useState(false);
    const [areaGuideList, setAreaGuideList] = useState('');
    // const [currencyList, setCurrencyList] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    let timeout = null; // Declare timeout variable
    useEffect(() => {
        // Close menu whenever pathname changes
        setMenuOpen(false);
        setBuyMenuShow(false)
        setSellMenuShow(false)
        setAreaGuideMenu(false)
    }, [pathname]);

    useEffect(() => {
        if (scrolled) {
            document.body.classList.add("scrolled");
        } else {
            document.body.classList.remove("scrolled");
        }
    }, [scrolled]);

    useEffect(() => {
        // set default theme type
        if (typeof window !== 'undefined' && localStorage.getItem("theme_type") === "summer") {
            setSeasonType(true);
        } else if (typeof window !== 'undefined' && !localStorage.getItem("theme_type")) {
            const currentYear = new Date().getFullYear();
            const startDate = new Date(`April 20, ${currentYear}`).getTime();
            const endDate = new Date(`October 20, ${currentYear}`).getTime();
            const today = new Date().getTime();

            setSeasonType(today >= startDate && today <= endDate);
        } else {
            setSeasonType(false);
        }

        const handleScroll = () => {
            clearTimeout(timeout); // Clear previous timeout to prevent rapid updates

            if (window.scrollY > 122) {
                setScrolled(true);
            } else {
                timeout = setTimeout(() => {
                    setScrolled(false);
                }, 100); // Adjust debounce time if needed
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timeout); // Cleanup timeout
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const onLangChange = (newLang) => {
        setLanguage(newLang);
        setLanguageDrop(false);
        localStorage.setItem("lang", newLang);
        document.cookie = `NEXT_LOCALE=${newLang}; path=/`;
        router.refresh(); // This refresh happens only on user action
    };

    const onChangeCurrency = (currency) => {
        setCurrencyDrop(false);
        setSelectedCurrency(currency.code);
        setSelectedCurrencySymbol(currency.symbol);
        localStorage.setItem("currency", currency.code);
        localStorage.setItem("currency_symbol", currency.symbol);
        document.cookie = `NEXT_CURRENCY=${currency.code}; path=/`;
        router.refresh();
    };

    useEffect(() => {
        document.body.classList.toggle('summer', seasonType);
        localStorage.setItem("theme_type", seasonType ? "summer" : "winter");
    }, [seasonType]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (areaGuideList?.length > 0) {
                    return;
                }
                const data = await fetchAreaGuideMenu();
                if (!data) {
                    router.push(`/not-found`);
                }
                setAreaGuideList(data);
                // const currencyData = await fetchCurrencies();
                // if (!currencyData) {
                //     router.push(`/not-found`);
                // }
                // setCurrencyList(currencyData);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch area guide details');
                router.push(`/not-found`);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (areaGuideList && areaGuideList?.length > 0) {
            setAreaGuideSlug(areaGuideList?.[0]?.area_guide?.slug)
        }
    }, [areaGuideList])

    return (
        <header
            className={`z-[999] relative w-full shadow-md transition-all duration-500 ${(scrolled && !isMapSplitSearch) ? "is_sticky" : ""
                }`}
        >
            {/* Top Bar */}
            <div className="bg-dynamic text-white relative z-10">
                <div className="container !px-2 !px-sm:4 py-2 flex items-center justify-end sm:justify-between gap-4 md:gap-6">
                    <div className="hidden md:flex items-center space-x-2 w-[200px]">
                        <div className="relative flex items-center space-x-2">
                            <button className="flex gap-1 items-center" onClick={() => setSeasonType(false)}>
                                <Snowflake className={`w-4 h-4 transition-colors ${!seasonType ? 'text-blue-400' : 'text-gray-400'}`} />
                                <h6 className={`transition-colors ${!seasonType ? 'text-blue-400' : 'text-gray-400'}`}>
                                    {tg('winter')}
                                </h6>
                            </button>

                            <Switch
                                checked={seasonType}
                                onCheckedChange={setSeasonType}
                                id="season-toggle"
                                className="season_toggle bg-gray-300 dark:bg-gray-700 border border-blue-600 data-[state=checked]:border-primary rounded-full relative 
                data-[state=checked]:bg-gradient-to-r data-[state=checked]:bg-primary data-[state=checked]:to-orange-500
                data-[state=unchecked]:bg-gradient-to-r data-[state=unchecked]:from-blue-400 data-[state=unchecked]:to-blue-600
                transition-colors"
                            />

                            <button className="flex gap-1 items-center" onClick={() => setSeasonType(true)}>
                                <Sun className={`w-4 h-4 transition-colors ${seasonType ? 'text-primary' : 'text-gray-400'}`} />
                                <h6 className={`transition-colors ${seasonType ? 'text-primary' : 'text-gray-400'}`}>
                                    {tg('summer')}
                                </h6>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6 grow md:grow-0">
                        <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-4 flex-wrap">
                            <Popover open={ourCompnayDrop} onOpenChange={setOurCompnayDrop}>
                                <PopoverTrigger asChild>
                                    <div className="text-dynamic cursor-pointer text-[11.5px] sm:text-sm text-link flex justify-between items-center">
                                        <span className="truncate me-1">{t("ourCompany")}</span>
                                        <SelectArrowDown color="text-dynamic" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-[150px] !p-1 flex flex-col z-[999]"
                                    align="start"  // Aligns to the left
                                    sideOffset={5} // Optional: adds small spacing
                                >
                                    <Link
                                        href="/about-us"
                                        className="text-sm text-link hover:bg-gray-100 rounded-md cursor-pointer p-2"
                                        onClick={() => setOurCompnayDrop(false)}
                                    >
                                        {tg("aboutUs")}
                                    </Link>
                                    <Link
                                        href="/team"
                                        className="text-sm text-link hover:bg-gray-100 rounded-md cursor-pointer p-2"
                                        onClick={() => setOurCompnayDrop(false)}
                                    >
                                        {t("meet")}
                                    </Link>
                                    <Link
                                        href="/careers"
                                        className="text-sm text-link hover:bg-gray-100 rounded-md cursor-pointer p-2"
                                        onClick={() => setOurCompnayDrop(false)}
                                    >
                                        {t("careers")}
                                    </Link>
                                </PopoverContent>
                            </Popover>

                            {/* <span className="block sm:hidden"></span> */}
                            <a target="_blank" href="tel:02056242486" className="text-nowrap text-[11.5px] sm:text-sm text-link text-dynamic inline-flex gap-1">
                                <span className="hidden sm:block">{t("call")}</span>
                                <strong>020 5624 2486</strong>
                            </a>
                        </div>

                        <div className="flex gap-1 sm:gap-3 md:gap-4 items-center">
                            <Popover open={currencyDrop} onOpenChange={setCurrencyDrop}>
                                <PopoverTrigger asChild>
                                    <div className="uppercase bg-transparent !p-0 !border-0 !flex-grow [&>svg]:hidden !gap-1 flex items-center cursor-pointer text-dynamic">
                                        <span className="text-nowrap  text-[11.5px] sm:text-sm"> {selectedCurrency || "EUR"} ({selectedCurrencySymbol || "€"})</span>
                                        <SelectArrowDown color="text-dynamic" />
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-full max-w-[280px] !p-1 max-h-[300px] overflow-y-auto z-[999]"
                                >
                                    <div className="flex flex-col">
                                        {loading ? (
                                            <div className="p-2 text-center">Loading...</div>
                                        ) : (
                                            currencyList?.length > 0 && currencyList?.map((currency) => (
                                                <button
                                                    key={currency.code}
                                                    onClick={() => {
                                                        onChangeCurrency(currency)
                                                    }}
                                                    className="flex justify-between gap-1 px-2 py-1.5 rounded hover:bg-gray-100 text-sm w-full text-start"
                                                >
                                                    {currency.name}({currency.symbol})
                                                    {currency.code === selectedCurrency && <CheckIcon className="size-4" />}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Popover open={languageDrop} onOpenChange={setLanguageDrop}>
                                <PopoverTrigger asChild>
                                    <div className="text-[11.5px] sm:text-sm uppercase bg-transparent !p-0 !border-0 !flex-grow [&>svg]:hidden !gap-1 flex items-center cursor-pointer text-dynamic">
                                        <Image
                                            className="min-w-5 w-5 me-[2px]"
                                            src={language === 'en' ? enFlag : frFlag}
                                            alt={language === 'en' ? "English" : "French"}
                                        />
                                        {language === 'en' ? "En" : 'Fr'}
                                        <SelectArrowDown color="text-dynamic" />
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-[130px] !p-1 overflow-y-auto z-[999]"
                                >
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => {
                                                onLangChange('en');
                                            }}
                                            className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-gray-100 text-sm"
                                        >
                                            <Image className="min-w-5 w-5 me-1" src={enFlag} alt="English" />
                                            {t("english")}

                                            {language === 'en' && (
                                                <CheckIcon className="size-4" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                onLangChange('fr');
                                            }}
                                            className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-gray-100 text-sm"
                                        >
                                            <Image className="min-w-5 w-5 me-1" src={frFlag} alt="French" />
                                            {t("french")}

                                            {language === 'fr' && (
                                                <CheckIcon className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {/* <button aria-hidden="true" className="hidden sm:block bg-white text-gray-900 px-4 py-2 text-xs rounded-2xl text-center transition-colors hover:bg-primary hover:text-white">
                                {t("myAccount")}
                            </button> */}

                            <button className="w-7 h-7 sm:w-9 sm:h-9 flex bg-white text-gray-900 p-2 text-xs rounded-full items-center justify-center transition-colors hover:bg-primary hover:text-white">
                                <FaUser size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="h-[70px] bg-white z-40 relative">
                <div className="container mx-auto flex items-center justify-between py-3 lg:py-0 h-full">
                    <Link href="/" className="flex items-center space-x-2 max-w-[180px] md:max-w-[200px]">
                        <Image src={logo} alt="GreenStone Logo" height={45} />
                    </Link>

                    <div className="flex md:hidden items-center space-x-2 w-[100px]">
                        <div className="relative flex items-center space-x-2">
                            <button className="flex gap-1 items-center" onClick={() => setSeasonType(false)}>
                                <Snowflake className={`w-4 h-4 transition-colors ${!seasonType ? 'text-blue-400' : 'text-gray-400'}`} />
                            </button>

                            <Switch
                                checked={seasonType}
                                onCheckedChange={setSeasonType}
                                id="season-toggle"
                                className="season_toggle bg-gray-300 dark:bg-gray-700 border border-blue-600 data-[state=checked]:border-primary rounded-full relative 
                data-[state=checked]:bg-gradient-to-r data-[state=checked]:bg-primary data-[state=checked]:to-orange-500
                data-[state=unchecked]:bg-gradient-to-r data-[state=unchecked]:from-blue-400 data-[state=unchecked]:to-blue-600
                transition-colors"
                            />

                            <button className="flex gap-1 items-center" onClick={() => setSeasonType(true)}>
                                <Sun className={`w-4 h-4 transition-colors ${seasonType ? 'text-primary' : 'text-gray-400'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links (Hidden on Mobile) */}
                    <div className="hidden lg:flex space-x-4">
                        <div className="group flex justify-center" onMouseEnter={() => setBuyMenuShow(true)} onMouseLeave={() => setBuyMenuShow(false)} >
                            <Link href="#" className={`px-2 py-6 border-b-2 transition-colors h-[90%] ${buyMenuShow ? "border-primary" : "border-transparent"}`}>
                                {t('menu1')}
                            </Link>

                            {(buyMenuShow) && (
                                <div className="header_menu absolute left-1/2 top-[92%] -translate-x-1/2 translate-t-y-4 w-[98vw] lg:max-w-[1199px] bg-white z-[52] p-4">
                                    <BuySubMenu />
                                </div>
                            )}
                        </div>

                        <div className="relative group flex justify-center" onMouseEnter={() => setSellMenuShow(true)} onMouseLeave={() => setSellMenuShow(false)} >
                            <Link href="#" className={`px-2 py-6 border-b-2 transition-colors h-[90%] ${sellMenuShow ? "border-primary" : "border-transparent"}`}>{t('menu2')}</Link>

                            {(sellMenuShow) && (
                                <div className="header_menu absolute left-1/2 top-[92%] -translate-x-1/2 translate-t-y-4 w-[98vw] lg:max-w-md bg-white z-[52] p-4">
                                    <SellSubMenu />
                                </div>
                            )}
                        </div>

                        <Link href="/rent" className="px-2 py-6 border-b-2 border-transparent hover:border-primary">{t('menu3')}</Link>

                        {/* Buy Dropdown */}
                        <div
                            className="group flex justify-center"
                            onMouseEnter={() => setAreaGuideMenu(true)}
                            onClick={() => setAreaGuideMenu(true)}
                            onMouseLeave={() => setAreaGuideMenu(false)}
                        >
                            <Link href="#" className={`px-2 py-6 border-b-2 transition-colors h-[90%] ${areaGuideMenu ? "border-primary" : "border-transparent"}`}>
                                {t('menu4')}
                            </Link>

                            {/* Dropdown Menu */}
                            {(areaGuideMenu) && (
                                <div className="header_menu absolute left-1/2 top-[92%] -translate-x-1/2 translate-t-y-4 w-[98vw] lg:w-[90vw] lg:max-w-[992px] bg-white z-[52] p-4">
                                    <AreaGuideSubMenu areaGuideList={areaGuideList} setAreaGuideMenu={setAreaGuideMenu} />
                                </div>
                            )}
                        </div>

                        <Link href="/become-a-partner" className="px-2 py-6 border-b-2 border-transparent hover:border-primary">{t('menu5')}</Link>
                        <Link href="/contact-us" className="px-2 py-6 border-b-2 border-transparent hover:border-primary">{tg('contactUs')}</Link>
                    </div>

                    <Drawer open={menuOpen} onOpenChange={setMenuOpen} direction="right">
                        <DrawerTrigger asChild>
                            <button aria-hidden="true" className="lg:hidden">
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </button>
                        </DrawerTrigger>

                        <DrawerContent className="z-[999]">
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader className="px-3">
                                    <DrawerTitle></DrawerTitle>
                                    <DrawerDescription></DrawerDescription>
                                    <DrawerClose asChild>
                                        <div className="flex justify-end">
                                            <button aria-hidden="true" className="text-gray-500 hover:scale-125 transition-all hover:text-primary" onClick={() => setMenuOpen(false)}>
                                                <BiX size={26} />
                                            </button>
                                        </div>
                                    </DrawerClose>
                                </DrawerHeader>

                                <Accordion type="single" collapsible className="w-full px-3 h-[calc(100vh-80px)] overflow-y-auto pb-10">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger className="decoration-0 !no-underline group !py-2">
                                            <span className="text-dark text-sm font-medium group-hover:text-primary">Buy</span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="py-5">
                                                <BuySubMenu />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger className="decoration-0 !no-underline group !py-2">
                                            <span className="text-dark text-sm font-medium group-hover:text-primary">{t('menu2')}</span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="py-5">
                                                <SellSubMenu />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <Link href="/rent" className="border-b block py-2 text-dark text-sm font-medium hover:text-primary">{t('menu3')}</Link>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger className="decoration-0 !no-underline group !py-2">
                                            <span className="text-dark text-sm font-medium group-hover:text-primary">{t('menu4')}</span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="py-5">
                                                <AreaGuideSubMenu areaGuideList={areaGuideList} />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <Link href="/become-a-partner" className="border-b block py-2 text-dark text-sm font-medium hover:text-primary">{t('menu5')}</Link>
                                    <Link href="/contact-us" className="border-b block py-2 text-dark text-sm font-medium hover:text-primary">{tg('contactUs')}</Link>
                                </Accordion>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </nav>
        </header>
    );
};
