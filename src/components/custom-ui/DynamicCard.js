"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import LazyImage from "../LazyImage";
import Link from "next/link";
import GetCallBackForm from "./GetCallBackForm";
import { useState } from "react";

export default function DynamicCard({
  image,
  label,
  title,
  subTitle,
  desc,
  isReverse,
  index,
  desc2,
  desc3,
  type,
  btnText,
  btnText2,
  url,
  url2,
  subLine,
  priceLabel,
  priceLabelValue,
  priceLabel2,
  priceLabelValue2,
  clickHereDesc,
  clickHereBtnText,
  clickHereBtnUrl,
  labelClass,
  isCallBack,
  callBackAction
}) {
  const t = useTranslations("Buy2");
  const tg = useTranslations("General");
  const router = useRouter();
  const [getQuoteDialog, setGetQuoteDialog] = useState(false);

  return (
    <div
      className="grid sm:grid-cols-2 gap-6 lg:gap-10"
      data-aos={`${index % 2 === 0 ? "zoom-in" : "zoom-in"}`}
      data-aos-delay={50 * index}
      data-aos-offset="100"
    >
      <div className={isReverse ? "sm:order-2" : ""}>
        <div className="aspect-[5/4] overflow-hidden">
          <LazyImage
            src={image}
            alt="Team"
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      <div className="grow flex flex-col justify-between">
        <div>
          {type != 2 && (
            <span className="text-2xl lg:text-3xl text-primary font-alt">
              {label}
            </span>
          )}
          <h3 className="max-w-md text-3xl lg:text-4xl font-normal text-neutral-900 mb-2">
            {title}
          </h3>
        </div>

        <div>
          {type === 2 && (
            <p className={`text-xl text-primary font-alt mb-3 ${labelClass ? labelClass : 'max-w-xs'}`}>
              {label}
            </p>
          )}

          {subTitle && (
            <p className="text-2xl font-semibold mb-4">{subTitle}</p>
          )}

          {desc && <p>{desc}</p>}

          {desc2 && <p className="mt-5">{desc2}</p>}

          {desc3 && <p className="mt-5">{desc3}</p>}

          {subLine && (
            <div className="mt-5">
              <small className="text-primary">
                <em>{subLine}</em>
              </small>
            </div>
          )}

          {priceLabel && (
            <div className="mt-5 border-2 border-dotted border-primary px-4 py-2 bg-primary/10 text-xl font-medium">
              {priceLabel}{" "}
              <span className="text-primary">{priceLabelValue}</span>
            </div>
          )}

          {priceLabel2 && (
            <div className="mt-5 border-2 border-dotted border-primary px-4 py-2 bg-primary/10 text-xl font-medium">
              {priceLabel2}{" "}
              <span className="text-primary">{priceLabelValue2}</span>
            </div>
          )}

          {(btnText || btnText2 || clickHereBtnText) && (
            <div className="flex gap-2 flex-wrap mt-5">
              {btnText && (
                <Button
                  variant={"outline"}
                  component="a"
                  onClick={() => isCallBack ? setGetQuoteDialog(true) : router.push(url)}
                  className="px-5 !border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300"
                >
                  {btnText}
                </Button>
              )}

              {btnText2 && (
                <Button
                  variant={"outline"}
                  component="a"
                  onClick={() => router.push(url2)}
                  className="px-5 !border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300"
                >
                  {btnText2}
                </Button>
              )}

              {clickHereBtnText && (
                <div className="flex flex-col items-start gap-2">
                  <p className="inline text-lg">
                    {clickHereDesc ? clickHereDesc : t("findYourFavorite")}
                  </p>

                  <Button variant={"outline"} component="a"  onClick={() => isCallBack ? setGetQuoteDialog(true) : router.push(clickHereBtnUrl)}
                    className="!border-primary hover:!bg-primary hover:!text-white out_prime transition duration-300  px-5">
                    {clickHereBtnText}
                  </Button>

                  {/* <Link href={clickHereBtnUrl} className="text- rounded-md border border-primary hover:bg-primary hover:text-white px-4 py-1">{clickHereBtnText}</Link> */}
                </div>
              )}
            </div>
          )}
        </div>
        <GetCallBackForm expanded={getQuoteDialog} setExpanded={setGetQuoteDialog} callBackAction={callBackAction} />
      </div>
    </div>
  );
}
