import { Header } from '@/components/global-components/header/header'
import Banner from '../../assets/banner-projects-background.png'
import { Button } from '../../components/global-components/button'
import { ProjectCard } from '@/components/global-components/project-card/project-card'
import React from 'react'
import { ArrowLeft } from 'lucide-react'

export default function Index() {
  return (
    <article>
      <Header
        short={true}
        img={Banner}
        alt={'Apoiando a causa'}
        title={'Nossos projetos'}
      />

      <section className={'max-w-safeMobile lg:max-w-safeDesktop m-auto'}>
        <div className={'my-5 flex  justify-end'}>
          <Button Icon={ArrowLeft} variant={'ghost'}>
            Voltar
          </Button>
        </div>

        <div
          className={
            'flex flex-col md:flex-row gap-4 flex-wrap justify-center mb-5'
          }
        >
          {Array.from({ length: 20 }).map(() => (
            <ProjectCard />
          ))}
        </div>
      </section>
    </article>
  )
}
