import React from 'react'
import { AdminProjectCard } from '@/presentation/components/pages-components/admin/admin-project-card'
import { ArrowLeft } from 'lucide-react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/infra/adapters/get-projects'
import { Button } from '@/presentation/components/global-components/button'
import { getServerSideProps } from '@/gssp-admin-cookies'
import { ProjectCardSkeleton } from '@/presentation/components/skeletons/project-card-skeleton'

function Index() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['all-projects'],
    queryFn: () => getProjects(),
  })

  if (isLoading)
    return Array.from({ length: 4 }).map(() => <ProjectCardSkeleton />)

  if (projects)
    return (
      <article
        className={
          'min-h-[60vh] max-w-safeMobile xl:max-w-safeDesktop m-auto flex flex-col gap-12 my-16 sm:my-10'
        }
      >
        <div className={'flex justify-between items-center'}>
          <Heading>Projetos registrados</Heading>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft}>
            Voltar
          </Button>
        </div>
        <section className={'flex  flex-wrap justify-start gap-4'}>
          {projects.map((project, i) => (
            <AdminProjectCard
              key={i}
              project={{
                id: project.id,
                title: project.title,
                image: project.images[0],
                collectionId: project.collectionId,
              }}
            />
          ))}
        </section>
      </article>
    )
}

export default Index

export { getServerSideProps }
