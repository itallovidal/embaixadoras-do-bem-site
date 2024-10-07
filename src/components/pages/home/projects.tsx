import React from 'react'
import { ProjectCard } from '@/components/global-components/project-card/project-card'
import { Button } from '../../global-components/button'
import { Heading } from '@/components/global-components/text/heading'

export function Projects() {
  return (
    <article className={'flex flex-col  gap-12 my-24'}>
      <Heading>Conheça nossos projetos!</Heading>

      <section
        className={'flex flex-row  lg:flex-row justify-between gap-4 flex-wrap'}
      >
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </section>
      <Button className={'self-center'}>Ver Galeria</Button>
    </article>
  )
}
