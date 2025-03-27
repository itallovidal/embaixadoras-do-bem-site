import { Header } from "@/presentation/components/global-components/header/header";
import Banner from "@/root/public/home/banner-home-background.png";
import { About } from "@/presentation/components/pages-components/home/about";
import { CallToAction } from "@/presentation/components/pages-components/home/call-to-action";
import { Projects } from "@/presentation/components/pages-components/home/projects";
import { Carousel } from "@/presentation/components/global-components/carousel/carousel";
import { VolunteerSection } from "@/presentation/components/pages-components/home/volunteer-section";
import { DonateSection } from "@/presentation/components/pages-components/home/donate-section";
import { BlogPosts } from "@/presentation/components/pages-components/home/blog-posts";
import CoreValues from "@/presentation/components/pages-components/home/core-values";
import { CollabSection } from "@/presentation/components/pages-components/home/collab-section";
import { Partnerships } from '@/presentation/components/pages-components/home/partnerships'

export default function Index() {
  return (
    <div className={"animate-showing opacity-0"}>
      <Header
        title={"Embaixadoras do Bem"}
        alt={"Apoiando a causa"}
        img={Banner}
        description={
          "Desde 2020 desenvolvendo campanhas de promoção e prevenção à Saúde."
        }
      />

      <div className={"max-w-safeMobile xl:max-w-safeDesktop m-auto"}>
        <About />
        <CoreValues />
        <Projects />
        <CallToAction />
      </div>
      <DonateSection />
      <VolunteerSection />

      <div className={"max-w-safeMobile xl:max-w-safeDesktop m-auto"}>
        <CollabSection />
        <BlogPosts />
        <Partnerships />
        <Carousel />
      </div>
    </div>
  );
}
