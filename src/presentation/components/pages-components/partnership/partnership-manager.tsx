import React from 'react'
import { Button } from '../../global-components/button'
import { ArrowRight, Plus } from 'lucide-react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { AdminProjectCardSkeleton } from '@/presentation/components/skeletons/admin-project-card-skeleton'
import { AdminPartnershipCard } from '@/presentation/components/pages-components/admin/admin-partnership-card'
import { getPartnerships } from '@/infra/adapters/partnership/get-partnerships'

export function PartnershipManager() {
  const { data: partnerships, isLoading } = useQuery({
    queryKey: ['last-partnerships'],
    queryFn: () => getPartnerships(5),
  })

  return (
    <article className={'animate-showing opacity-0 flex flex-col gap-12'}>
      <div
        className={
          'flex flex-col gap-2  justify-between sm:flex-row sm:items-center'
        }
      >
        <Heading>Gerencie suas parceirias</Heading>
        <Button href={'/admin/partnership/create-partnership'} Icon={Plus}>
          Criar uma parceiria
        </Button>
      </div>
      <section className={'flex flex-col lg:flex-row justify-start gap-4'}>
        {isLoading &&
          Array.from({ length: 3 }).map(() => <AdminProjectCardSkeleton />)}

        {partnerships &&
          partnerships.map(
            (partnership, i) =>
              i < 4 && (
                <AdminPartnershipCard
                  key={partnership.id}
                  partnership={partnership}
                />
              ),
          )}
      </section>
      {partnerships && partnerships.length > 4 && (
        <Button
          href={'/admin/partnership'}
          variant={'outline'}
          className={'self-end'}
          Icon={ArrowRight}
        >
          Ver todas publicações
        </Button>
      )}
    </article>
  )
}
