import React from 'react'
import { AdminProjectCard } from '@/components/pages/admin/components/admin-project-card/admin-project-card'
import { Heading } from '@/components/text'
import { Button } from '@/components/button'
import { Plus } from 'lucide-react'

export function ProjectManager() {
  return (
    <article className={'flex flex-col gap-12 my-10'}>
      <div className={'flex justify-between items-center'}>
        <Heading>Gerencie seus projetos</Heading>
        <Button Icon={Plus}>Criar um projeto</Button>
      </div>
      <section className={'flex flex-col lg:flex-row justify-start gap-4'}>
        <AdminProjectCard />
        <AdminProjectCard />
        <AdminProjectCard />
      </section>
    </article>
  )
}
