import React, { useEffect } from 'react'
import { ProjectCard } from '@/components/global-components/project-card/project-card'
import { Button } from '../../global-components/button'
import { Heading } from '@/components/global-components/text/heading'
import { getProjects } from '@/utils/api/get-projects'
import { Project } from 'next/dist/build/swc'
import { IGetProjectRes } from '@/types/responses/get-project-response'

export function Projects() {
  const [projects, setProjects] = React.useState<IGetProjectRes[]>([])

  useEffect(() => {
    getProjects(4).then((res) => setProjects(res))
  }, [])

  return (
    <article className={'flex flex-col  gap-12 my-24'}>
      <Heading>Conheça nossos projetos!</Heading>

      <section
        className={'flex flex-row  lg:flex-row justify-between gap-4 flex-wrap'}
      >
        {projects.map((project, i) => {
          return <ProjectCard {...project} key={i} />
        })}
      </section>
      <Button className={'self-center'}>Ver Galeria</Button>
    </article>
  )
}
