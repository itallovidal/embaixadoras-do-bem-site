import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/presentation/components/global-components/button'
import { getServerSideProps } from '@/gssp-admin-cookies'
import { ProjectCardSkeleton } from '@/presentation/components/skeletons/project-card-skeleton'
import { getPartnerships } from '@/infra/adapters/partnership/get-partnerships'
import { AdminPartnershipCard } from '@/presentation/components/pages-components/admin/admin-partnership-card'

function Index() {
  const { data: partnerships, isLoading } = useQuery({
    queryKey: ['all-partnerships'],
    queryFn: () => getPartnerships(),
  })

  if (isLoading)
    return Array.from({ length: 4 }).map(() => <ProjectCardSkeleton />)

  if (partnerships)
    return (
      <article
        className={
          'min-h-[60vh] max-w-safeMobile xl:max-w-safeDesktop m-auto flex flex-col gap-12 py-32'
        }
      >
        <div className={'flex justify-between items-center'}>
          <Heading>Parcerias registrados</Heading>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft}>
            Voltar
          </Button>
        </div>
        <section className={'flex  flex-wrap justify-start gap-4'}>
          {partnerships.map((partnership, i) => (
            <AdminPartnershipCard key={i} partnership={partnership} />
          ))}
        </section>
      </article>
    )
}

export default Index

export { getServerSideProps }
