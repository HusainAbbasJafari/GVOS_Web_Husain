'use client';

import CallToAction from "@/components/CallToAction";
import NewsLetter from "@/components/NewsLetter";
import CommonBanner from "@/components/custom-ui/CommonBanner";
import TeamCards from "@/components/custom-ui/TeamCards";
import bannerImage from "@/public/images/static/teamBanner.jpg";
import { useTranslations } from "next-intl";

export default function OutTeams() {
  const t = useTranslations('ourTeam');
  const tg = useTranslations('General');

  const bannerTitle = t.rich('bannerTitle', {
    font: (chunks) => <span className="font-alt">{chunks}</span>,
    span: (chunks) => <span className="flex">{chunks}</span>
  });

  const teamsData = [
    {
      id: 1,
      "linkedin": "https://www.linkedin.com/in/danielmolesworthmartin/",
      "instagram": "https://www.instagram.com/dansinfrance",
      images: [
        {
          src: "team11.png",
          alt: "Team"
        },
        {
          src: "team12.png",
          alt: "Team"
        },
        {
          src: "team13.png",
          alt: "Team"
        },
        {
          src: "team14.png",
          alt: "Team"
        }
      ]
    },
    {
      id: 2,
      "linkedin": "https://www.linkedin.com/in/bouchrasahiti/",
      "instagram": "",
      images: [
        {
          src: "team21.png",
          alt: "Team"
        },
        {
          src: "team22.png",
          alt: "Team"
        }
      ]
    },
    {
      id: 3,
      "linkedin": "https://www.linkedin.com/in/louisa-acreman-5745446a/",
      "instagram": "",
      images: [
        {
          src: "team31.png",
          alt: "Team"
        },
        {
          src: "team32.png",
          alt: "Team"
        },
        {
          src: "team33.png",
          alt: "Team"
        },
      ]
    }
  ]

  return (
    <div className="bg-whitee">
      <CommonBanner
        title={bannerTitle}
        bannerImage={bannerImage}
        desc={t('bannerDesc')}
        desc2=""
        avatars={[]}
        titleWidth="max-w-3xl"
        type=""
      />

      <div className="container py-16 scroll_top_margin size_xl" id="arrowScrollSection">
        <div className="flex flex-col gap-14">
          {teamsData.map((item, i) => (
            <TeamCards
              item={item}
              key={i}
              index={i}
              label={t(`label${i + 1}`)}
              title={t.rich(`title${i + 1}`, {
                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>
              })}
              desc={t.rich(`para${i + 1}1`, {
                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>,
                bold: (chunks) => <span className="font-bold">{chunks}</span>
              })}
              desc2={t.rich(`para${i + 1}2`, {
                span: (chunks) => <span className="text-primary font-alt">{chunks}</span>,
                bold: (chunks) => <span className="font-bold">{chunks}</span>
              })}
              desc3={i === 0 ?
                t.rich(`para${i + 1}3`, {
                  bold: (chunks) => <span className="font-bold">{chunks}</span>
                }) : ''}
              desc4={i === 0 ?
                t.rich(`para${i + 1}4`, {
                  bold: (chunks) => <span className="font-bold">{chunks}</span>
                }) : ''}
              desc5={i === 0 ?
                t.rich(`para${i + 1}5`, {
                  bold: (chunks) => <span className="font-bold">{chunks}</span>
                }) : ''}
            />
          ))}
        </div>

        <CallToAction />
      </div>

      <NewsLetter />
    </div>
  )
}