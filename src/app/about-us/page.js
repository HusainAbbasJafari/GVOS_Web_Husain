'use client';

import CallToAction from "@/components/CallToAction";
import LazyImage from "@/components/LazyImage";
import NewsLetter from "@/components/NewsLetter";
import TestimonialSlider from "@/components/TestimonialSlider";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import DynamicCard from "@/components/custom-ui/DynamicCard";

import { Button } from "@/components/ui/button";
import about1 from "@/public/images/static/about1.png";
import about2 from "@/public/images/static/about2.png";
import bannerImage from "@/public/images/static/aboutBanner.jpg";
import { testimonialAboutUs } from "@/utility/data";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const t = useTranslations('aboutUs');
  const tg = useTranslations('General');
  const router = useRouter();

  const bannerTitle = t.rich('bannerTitle', {
    font: (chunks) => <span className="font-alt">{chunks}</span>
  });

  const bannerDesc = t.rich('bannerDesc', {
    bold: (chunks) => <span className="font-bold">{chunks}</span>,
    bold1: (chunks) => <span className="font-bold">{chunks}</span>
  });

  return (
    <div className="bg-whitee">
      <CommonBanner
        title={bannerTitle}
        bannerImage={bannerImage}
        desc={bannerDesc}
        desc2=""
        avatars={[]}
        titleWidth="max-w-3xl"
        type=""
      />

      <div
        className="container py-16 scroll_top_margin size_xl"
        id="arrowScrollSection"
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-10">
          <div className="col-span-1 md:col-span-2">
            <h2 className="max-w-xs text-3xl lg:text-4xl font-normal text-neutral-900">
              {t.rich("title", {
                span: (chunks) => (
                  <span className="text-primary font-alt flex">{chunks}</span>
                ),
              })}
            </h2>
          </div>

          <div className="col-span-1 md:col-span-3">
            <p className="text-xl text-primary font-alt mb-3">
              {t.rich("label", {
                span: (chunks) => <span className="flex gap-1">{chunks}</span>,
                a: (chunks) => (
                  <a target="_blank" href="https://www.gvoscrm.io">
                    {chunks}
                  </a>
                ),
              })}
            </p>

            <p className="mb-4 max-w-xl">
              {t.rich("para1", {
                bold: (chunks) => <span className="font-bold">{chunks}</span>,
              })}
            </p>

            <p className="mb-3 max-w-xl">
              {t.rich("para2", {
                bold: (chunks) => <span className="font-bold">{chunks}</span>,
                bold1: (chunks) => (
                  <span className="font-bold">{chunks}</span>
                ),
              })}
            </p>

            <Button
              variant={"outline"}
              component="a"
              onClick={() => router.push("/team")}
              className="mt-5 px-5 border-primary hover:bg-primary hover:text-white"
            >
              {t("buttonLabel")}
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          <div className="col-span-1">
            <LazyImage src={about1.src} alt="about 1" />

            <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
              <img
                className="h-auto max-w-[200px] xl:max-w-[220px] object-contain"
                src="/images/brands/green_stone_gray.png"
                alt="brand 1"
              />

              <img
                className="h-auto max-w-[100px] xl:max-w-[130px] object-contain"
                src="/images/brands/gvos_gray.png"
                alt="brand 2"
              />
            </div>

          </div>

          <div className="col-span-1">
            <LazyImage src={about2.src} alt="about 2" />

            <div className="flex justify-center items-center sm:justify-start gap-3 mt-2 flex-wrap">
              <img
                className="h-[80px]"
                src="/images/brands/mortagelogo_gray.png"
                alt="brand 3"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-14 mb-14">
          {[...Array(5)].map((_, i) => (
            <DynamicCard
              key={`dynamic-card-${i}`}
              image={`/images/static/about${i + 3}.png`}
              label={t(`label${i + 1}`)}
              title={t.rich(`title${i + 1}`, {
                span: (chunks) => (
                  <span className="text-primary font-alt">{chunks}</span>
                ),
              })}
              subTitle=""
              desc={t.rich(`desc${i + 1}1`, {
                bold: (chunks) => <span className={`${i === 1 ? "italic" : "font-bold"}`}>{chunks}</span>,
                bold1: (chunks) => (
                  <span className={`font-bold`}>{chunks}</span>
                ),
                bold2: (chunks) => (
                  <span className={`font-bold`}>{chunks}</span>
                ),
              })}

              desc2={i !== 1 && t.rich(`desc${i + 1}2`, {
                bold: (chunks) => <span className="font-bold">{chunks}</span>,
                bold1: (chunks) => (
                  <span className="font-bold">{chunks}</span>
                ),
                bold2: (chunks) => (
                  <span className="font-bold">{chunks}</span>
                ),
              })}

              desc3={
                (i === 3 || i === 4) &&
                t.rich(`desc${i + 1}3`, {
                  bold: (chunks) => <span className="font-bold">{chunks}</span>,
                  bold1: (chunks) => (
                    <span className="font-bold">{chunks}</span>
                  ),
                  bold2: (chunks) => (
                    <span className="font-bold">{chunks}</span>
                  ),
                })
              }
              isReverse={(i + 1) % 2 === 0}
              index={i}
              btnText={i !== 1 ? t(`buttonLabel${i + 1}`) : ""}
              url={["/team", "/contact-us", "/careers#currentOpenings", "/careers"][i]}
              btnText2={i === 0 ? t("buttonLabel12") : ""}
              url2={i === 0 ? "/contact-us" : ""}
              type={2}
              labelClass="max-w-xl"
              isCallBack={i === 4 ? true : false}
              callBackAction={i === 4 ? "CallBackNewLeadWhoAreWe" : ""}
            />
          ))}

          {/* <DynamicCard
            key={`dynamic-card5`}
            image={`/images/static/about51.png`}
            label={t(`label5`)}
            title={t.rich(`title5`, {
              span: (chunks) => (
                <span className="text-primary font-alt">{chunks}</span>
              ),
            })}
            subTitle=""
            desc={t.rich(`desc51`, {
              br: (chunks) => <span className="block">{chunks}</span>,
              br1: (chunks) => (
                <span className="block">{chunks}</span>
              ),
            })}
            labelClass="max-w-xl"

            desc2={t("desc52")}
            index={5}
            isReverse={false}
            type={2}
          /> */}
        </div>

        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-normal text-neutral-9000">
            {t.rich("aboutUs", {
              span: (chunks) => (
                <span className="text-primary font-alt">{chunks}</span>
              ),
            })}
          </h2>
        </div>

        <TestimonialSlider items={testimonialAboutUs} />

        <CallToAction />
      </div>

      <NewsLetter />
    </div>
  );
}