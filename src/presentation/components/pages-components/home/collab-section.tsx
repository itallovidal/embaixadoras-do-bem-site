import { Button } from '../../global-components/button'
import React from 'react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { getCollaborators } from '@/infra/adapters/collaborators/get-collaborators'
import { CollabCard } from '../../global-components/collab-card'
import { SubHeading } from '../../global-components/text/subheading'

export function CollabSection() {
  const { data: collabs, isLoading } = useQuery({
    queryKey: ['last-collaborators'],
    queryFn: () => getCollaborators(5),
  })

  const currentyear = new Date().getFullYear()

  if (collabs && collabs.length === 0) return null

  return (
    <article className={'flex flex-col  gap-12'}>
      <Heading className="my-0">Com orgulho, nossos colaboradores!</Heading>
      <SubHeading>De 2023 a {currentyear}</SubHeading>
      <section
        className={'flex flex-row  lg:flex-row justify-between gap-3 flex-wrap'}
      >
        {isLoading && <p>carregando..</p>}
        {collabs &&
          collabs.map((collab, i) => <CollabCard key={i} collab={collab} />)}
      </section>
      {collabs && collabs.length > 5 && (
        <Button href="collabs" className={'self-center'}>
          Ver mais
        </Button>
      )}
    </article>
  )
}
