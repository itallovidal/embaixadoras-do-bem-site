import React from 'react'
import { AdminProjectCard } from '@/components/pages/admin/components/admin-project-card/admin-project-card'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Heading } from '@/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/utils/api/get-projects'
import { Button } from '@/components/global-components/button'

function Index() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['all-projects'],
    queryFn: () => getProjects(),
  })

  if (isLoading) return <Loader2 />

  if (projects)
    return (
      <article
        className={
          ' max-w-safeMobile xl:max-w-safeDesktop m-auto flex flex-col gap-12 my-10'
        }
      >
        <div className={'flex justify-between items-center'}>
          <Heading>Projetos registrados</Heading>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft}>
            Voltar
          </Button>
        </div>
        <section className={'flex  flex-wrap justify-start gap-4'}>
          {projects.map((project) => (
            <AdminProjectCard
              project={{
                id: project.id,
                title: project.title,
                image: project.images[0],
              }}
            />
          ))}
        </section>
      </article>
    )
}

export default Index
