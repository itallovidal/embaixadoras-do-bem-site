import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import backgroundplaceholder from '../../../assets/placeholder.png'
import { Heading } from '@/components/global-components/text/heading'
import { Paragraph } from '@/components/global-components/text/paragraph'
function Index() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  return (
    <article className={'my-12'}>
      <section className={'max-w-safeMobile lg:max-w-safeDesktop m-auto'}>
        <Heading>Projetinho Cheirinho de Neném</Heading>
        <Paragraph className={'w-[60%]'}>
          Projeto Cheirinho de Neném onde são feitos pelas mãos habilidosas de
          Voluntárias e são levados os enxovais de bebê em Comunidades e
          Enfermarias e foi levado até para África em uma missão de Voluntários
          !
        </Paragraph>

        <div className={'mt-8 flex flex-wrap w-full gap-4'}>
          <picture
            className={
              'overflow-hidden rounded-2xl w-[calc(theme(width.1/2)-theme(gap.2))]'
            }
          >
            <Image
              className={'block w-full h-full object-cover'}
              src={backgroundplaceholder}
              width={370}
              alt={'Imagem do projeto'}
            />
          </picture>

          <picture
            className={
              'overflow-hidden rounded-2xl w-[calc(theme(width.1/2)-theme(gap.2))]'
            }
          >
            <Image
              className={'block w-full h-full object-cover'}
              src={backgroundplaceholder}
              width={370}
              alt={'Imagem do projeto'}
            />
          </picture>
          <picture
            className={
              'overflow-hidden rounded-2xl w-[calc(theme(width.1/2)-theme(gap.2))]'
            }
          >
            <Image
              className={'block w-full h-full object-cover'}
              src={backgroundplaceholder}
              width={370}
              alt={'Imagem do projeto'}
            />
          </picture>
        </div>
      </section>
    </article>
  )
}

export default Index
