import React from 'react'
import { AdminProjectCard } from '@/components/pages/admin/components/admin-project-card/admin-project-card'
import { Button } from '../../global-components/button'
import { ArrowRight, Loader2, Plus } from 'lucide-react'
import { Heading } from '@/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/utils/api/get-projects'

export function ProjectManager() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['last-projects'],
    queryFn: () => getProjects(4),
  })

  console.log('fetched!')
  console.log(projects)

  if (isLoading) return <Loader2 />

  if (projects)
    return (
      <article className={'flex flex-col gap-12 my-12'}>
        <div className={'flex flex-col gap-2  justify-between sm:flex-row sm:items-center'}>
          <Heading>Gerencie seus projetos</Heading>
          <Button href={'/admin/projects/create-project'} Icon={Plus}>
            Criar um projeto
          </Button>
        </div>
        <section className={' flex flex-col lg:flex-row justify-start gap-4'}>
          {projects.map((project) => (
            <AdminProjectCard
              key={project.id}
              project={{
                id: project.id,
                title: project.title,
                image: project.images[0],
                collectionId: project.collectionId,
              }}
            />
          ))}
        </section>
        {projects.length > 4 && (
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
