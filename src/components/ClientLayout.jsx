"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "./ErrorBoundary";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsArrowUp } from "react-icons/bs";
import { useGlobalContext } from "@/app/context/GlobalContext";
import Loader from "./custom-ui/Loader";

NProgress.configure({ showSpinner: false })

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { loadingMain, homeLoading, language, setLanguage, setSelectedCurrency, setSelectedCurrencySymbol } = useGlobalContext();

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const navType = performance.getEntriesByType('navigation')[0]?.type;

    if (navType === 'reload') {
      window.scrollTo({ top: 0, behavior: 'instant' }); // or 'smooth' if you like
    }
  }, []);

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1200, // animation duration in ms
  //     once: true,   // whether animation should happen only once
  //     offset: 10,   // how far from the element to trigger the animation
  //   });
  // }, []);

  useEffect(() => {
    const isLaptopOrLarger = window.innerWidth >= 1024;

    if (isLaptopOrLarger) {
      AOS.init({
        duration: 1200,
        once: true,
        offset: 10,
      });
    } else {
      // Fallback: remove hidden styles
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }, []);

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();
    handleStart();
    handleComplete();

    AOS.refresh();
    if (!pathname.includes('aftersales') && !pathname.includes('careers')) {
      scrollToTop();
    }
  }, [pathname]);

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    if (loadingMain) {
      handleStart();
    } else {
      setTimeout(() => {
        handleComplete();
      }, 100);
    }
  }, [loadingMain]);

  // lang changes

  const router = useRouter();

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    const currentLang = storedLang || "en";

    const storedCurrency = localStorage.getItem("currency") || "EUR";

    const storedCurrencySymbol = localStorage.getItem("currency_symbol") || "€";

    // Only update if not already set
    if (document.cookie.indexOf(`NEXT_LOCALE=${currentLang}`) === -1) {
      document.cookie = `NEXT_LOCALE=${currentLang}; path=/`;
      router.refresh(); // refresh app once
    }

    setLanguage(currentLang);
    setSelectedCurrency(storedCurrency);
    setSelectedCurrencySymbol(storedCurrencySymbol);
  }, []);

  if (!language) return null; // Prevent flash

  return (
    <>

      {loadingMain && (
        <Loader />
      )}

      <ErrorBoundary>
        <Header />
        <div className="content_section z-10">{children}</div>
        {!homeLoading && (
          <Footer />
        )}

        {visible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/80 transition-all duration-300 ease-in-out"
          >
            <BsArrowUp size={20} />
          </button>
        )}
      </ErrorBoundary>
    </>
  );
}
