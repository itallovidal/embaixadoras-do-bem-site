import { Button } from '../../global-components/button'
import React from 'react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { getPartnerships } from '@/infra/adapters/partnership/get-partnerships'
import { PartnershipCard } from '@/presentation/components/global-components/partnership-card/partnership-card'

export function Partnerships() {
  const { data: partnerships, isLoading } = useQuery({
    queryKey: ['last-partnerships'],
    queryFn: () => getPartnerships(4),
  })

  if (!partnerships || partnerships.length === 0) return <></>

  return (
    <article className={'flex flex-col  gap-12'}>
      <Heading>Parcerias que impulsionam resultados!</Heading>
      <section
        className={'flex flex-row  lg:flex-row justify-between gap-3 flex-wrap'}
      >
        {isLoading && <p>carregando..</p>}
        {partnerships &&
          partnerships.map((partnership, i) => (
            <PartnershipCard key={i} {...partnership} />
          ))}
      </section>
      <Button className={'self-center'} href={'partnership'}>
        Ver parcerias
      </Button>
    </article>
  )
}
