import { Header } from '@/components/header/header'
import Banner from '../assets/banner-home-background.png'
import { About } from '@/components/pages/home/about'
import { CallToAction } from '@/components/pages/home/call-to-action'
import { Projects } from '@/components/pages/home/projects'

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
      </div>
    </div>
  )
}
