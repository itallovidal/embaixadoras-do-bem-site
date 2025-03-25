import { Header } from '@/presentation/components/global-components/header/header'
import Banner from '@/root/public/projects/banner-projects-background.png'
import { Button } from '../../presentation/components/global-components/button'
import { ProjectCard } from '@/presentation/components/global-components/project-card/project-card'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { ProjectCardSkeleton } from '@/presentation/components/skeletons/project-card-skeleton'
import { getPartnerships } from '@/infra/adapters/partnership/get-partnerships'
import { PartnershipCard } from '@/presentation/components/global-components/partnership-card/partnership-card'

export default function Index() {
  const { data: partnership, isLoading } = useQuery({
    queryKey: ['all-partnerships'],
    queryFn: () => getPartnerships(),
  })

  return (
    <div>
      <Header
        short={true}
        img={Banner}
        alt={'Apoiando a causa'}
        title={'Nossas parcerias'}
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
          {partnership &&
            partnership.map((p, i) => {
              return <PartnershipCard {...p} key={i} />
            })}
        </div>
      </section>
    </div>
  )
}
