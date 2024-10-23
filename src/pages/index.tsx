import { Header } from '@/presentation/components/global-components/header/header'
import Banner from '@/root/public/home/banner-home-background.png'
import { About } from '@/presentation/components/pages-components/home/about'
import { CallToAction } from '@/presentation/components/pages-components/home/call-to-action'
import { Projects } from '@/presentation/components/pages-components/home/projects'
// import { BlogPosts } from '@/components/pages/home/blog-posts'
import { Carousel } from '@/presentation/components/global-components/carousel/carousel'
// import { VolunteerForm } from '@/components/pages/home/volunteer-form'

export default function Index() {
  return (
    <div className={'animate-showing opacity-0'}>
      <Header
        title={'Embaixadoras do Bem'}
        alt={'Apoiando a causa'}
        img={Banner}
        description={
          'Desde 2020, desenvolvendo campanhas de promoção e prevenção à Saúde.'
        }
      />

      <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto'}>
        <About />
        <CallToAction />
        <Projects />
        {/* <BlogPosts /> */}
        <Carousel />
      </div>
      {/* <VolunteerForm /> */}
    </div>
  )
}
