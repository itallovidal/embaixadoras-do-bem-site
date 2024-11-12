import React from 'react'
import { AdminProjectCard } from '@/presentation/components/pages-components/admin/admin-project-card'
import { Button } from '../../global-components/button'
import { ArrowRight, Plus } from 'lucide-react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/infra/adapters/get-projects'
import { AdminProjectCardSkeleton } from '@/presentation/components/skeletons/admin-project-card-skeleton'

export function ProjectManager() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['last-projects'],
    queryFn: () => getProjects(5),
  })

  return (
    <article className={'animate-showing opacity-0 flex flex-col gap-12'}>
      <div
        className={
          'flex flex-col gap-2  justify-between sm:flex-row sm:items-center'
        }
      >
        <Heading>Gerencie seus projetos</Heading>
        <Button href={'/admin/projects/create-project'} Icon={Plus}>
          Criar um projeto
        </Button>
      </div>
      <section className={'flex flex-col lg:flex-row justify-start gap-4'}>
        {isLoading &&
          Array.from({ length: 3 }).map(() => <AdminProjectCardSkeleton />)}

        {projects &&
          projects.map(
            (project, i) =>
              i < 4 && (
                <AdminProjectCard
                  key={project.id}
                  project={{
                    id: project.id,
                    title: project.title,
                    image: project.images[0],
                    collectionId: project.collectionId,
                  }}
                />
              ),
          )}
      </section>
      {projects && projects.length > 4 && (
        <Button
          href={'/admin/projects'}
          variant={'outline'}
          className={'self-end'}
          Icon={ArrowRight}
        >
          Ver todos os projetos.
        </Button>
      )}
    </article>
  )
}
