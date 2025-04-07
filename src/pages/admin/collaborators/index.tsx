import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/presentation/components/global-components/button'
import { getServerSideProps } from '@/gssp-admin-cookies'
import { ProjectCardSkeleton } from '@/presentation/components/skeletons/project-card-skeleton'
import { getCollaborators } from '@/infra/adapters/collaborators/get-collaborators'
import { AdminCollaboratorCard } from '@/presentation/components/pages-components/admin/collaborator-card'

function Index() {
  const { data: collabs, isLoading } = useQuery({
    queryKey: ['all-collaborators'],
    queryFn: () => getCollaborators(),
  })

  if (isLoading)
    return Array.from({ length: 4 }).map(() => <ProjectCardSkeleton />)

  if (collabs)
    return (
      <article
        className={
          'min-h-[60vh] max-w-safeMobile xl:max-w-safeDesktop m-auto flex flex-col gap-12 py-32'
        }
      >
        <div className={'flex justify-between items-center'}>
          <Heading>Voluntários registrados</Heading>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft}>
            Voltar
          </Button>
        </div>
        <section className={'flex  flex-wrap justify-start gap-4'}>
          {collabs.map((collab, i) => (
            <AdminCollaboratorCard
              key={i}
              collaborator={{
                collectionId: collab.collectionId,
                id: collab.id,
                name: collab.name,
                image: collab.images[0],
                responsability: collab.responsability,
              }}
            />
          ))}
        </section>
      </article>
    )
}

export default Index

export { getServerSideProps }
