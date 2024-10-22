import { ProjectCard } from '@/presentation/components/global-components/project-card/project-card'
import { Button } from '../../global-components/button'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { getProjects } from '@/infra/adapters/get-projects'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/presentation/components/global-components/loader/loader'

export function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['last-projects'],
    queryFn: () => getProjects(4),
  })

  return (
    <article className={'flex flex-col  gap-12 my-24'}>
      <Heading>Conheça nossos projetos!</Heading>

      <section
        className={'flex flex-row  lg:flex-row justify-between gap-4 flex-wrap'}
      >
        {isLoading && <Loader />}

        {projects &&
          projects.map((project, i) => {
            return <ProjectCard {...project} key={i} />
          })}
      </section>
      <Button href={'/projects'} className={'self-center'}>
        Ver Galeria
      </Button>
    </article>
  )
}
