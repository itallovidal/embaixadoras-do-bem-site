import { Header } from '@/components/global-components/header/header'
import Banner from '@/assets/banner-home-background.png'
import { About } from '@/components/pages/home/about'
import { CallToAction } from '@/components/pages/home/call-to-action'
import { Projects } from '@/components/pages/home/projects'
// import { BlogPosts } from '@/components/pages/home/blog-posts'
import { Carousel } from '@/components/global-components/carousel/carousel'
// import { VolunteerForm } from '@/components/pages/home/volunteer-form'

export default function Index() {
  return (
    <div>
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
