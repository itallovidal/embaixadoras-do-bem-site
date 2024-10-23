import { Header } from '@/presentation/components/global-components/header/header'
import Banner from '@/root/public/projects/banner-projects-background.png'
import { Button } from '../../presentation/components/global-components/button'
import { ProjectCard } from '@/presentation/components/global-components/project-card/project-card'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/infra/adapters/get-projects'
import { ProjectCardSkeleton } from '@/presentation/components/skeletons/project-card-skeleton'

export default function Index() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['all-projects'],
    queryFn: () => getProjects(),
  })

  return (
    <article>
      <Header
        short={true}
        img={Banner}
        alt={'Apoiando a causa'}
        title={'Nossos projetos'}
      />

      <section className={'max-w-safeMobile lg:max-w-safeDesktop m-auto my-24'}>
        <div className={'my-5 flex  justify-end'}>
          <Button href={'/'} Icon={ArrowLeft} variant={'ghost'}>
            Página inicial
          </Button>
        </div>

        <div
          className={
            'flex flex-col md:flex-row gap-4 flex-wrap justify-center mb-5'
          }
        >
          {isLoading &&
            Array.from({ length: 4 }).map(() => <ProjectCardSkeleton />)}
          {projects &&
            projects.map((project, i) => {
              return <ProjectCard {...project} key={i} />
            })}
        </div>
      </section>
    </article>
  )
}
