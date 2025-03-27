import { Header } from '@/presentation/components/global-components/header/header'
import Banner from '../../../public/projects/banner-projects-background.png'
import { Button } from '@/presentation/components/global-components/button'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCollaborators } from '@/infra/adapters/collaborators/get-collaborators'
import { CollabCard } from '@/presentation/components/global-components/collab-card'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  const { data: collabs } = useQuery({
    queryKey: ['all-collaborators'],
    queryFn: () => getCollaborators(),
  })

  const redirect = async () => await router.push('/')

  if (collabs && collabs.length === 0) {
    redirect()
  }

  return (
    <div>
      <Header
        short={true}
        img={Banner}
        alt={'Nossos Colaboradores'}
        title={'Nossos Colaboradores'}
      />

      <section className={'max-w-safeMobile lg:max-w-safeDesktop m-auto my-12'}>
        <div className={'my-5 flex justify-end'}>
          <Button Icon={ArrowLeft} variant={'ghost'} href={'/'}>
            Voltar
          </Button>
        </div>

        <div
          className={
            'flex flex-col md:flex-row gap-3 flex-wrap justify-start mb-5'
          }
        >
          {collabs && collabs.map((collab) => <CollabCard collab={collab} />)}
        </div>
      </section>
    </div>
  )
}
