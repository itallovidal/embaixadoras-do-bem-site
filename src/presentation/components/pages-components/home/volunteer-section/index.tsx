import React from 'react'
import bannerBackground from '../../../../../../public/home/background-volunteer-form.jpg'
import Image from 'next/image'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { VolunteerForm } from '@/presentation/components/pages-components/home/volunteer-section/volunteerForm'
import { TextHighlight } from '@/presentation/components/global-components/text/textHighlight'

export function VolunteerSection() {
  return (
    <article
      id={'volunteer-section'}
      className={'flex flex-col overflow-hidden gap-12  relative md:h-[875px]'}
    >
      <section
        className={
          'flex gap-2 md:gap-12 flex-col md:flex-row lg:flex-row justify-between max-w-safeMobile xl:max-w-safeDesktop mx-auto'
        }
      >
        <Image
          src={bannerBackground}
          alt={'fundo de uma campanha'}
          className={
            'w-full h-full -z-10 top-0 left-0 absolute object-cover opacity-40 lg:opacity-100'
          }
        />
        <div className={'bg-white p-12 md:max-w-[550px] rounded-b-3xl'}>
          <Heading>Junte-se à nós!</Heading>
          <Paragraph className={'mb-4'}>
            Acreditamos que a mudança começa com gestos simples de
            solidariedade. Agora, queremos contar com você nessa jornada de
            transformação. Ao se juntar a nós como voluntário(a), você estará
            ajudando a salvar vidas, levando informação e conscientização sobre
            a prevenção do câncer de mama e do câncer de próstata.
          </Paragraph>
          <Paragraph className={'mb-4'}>
            Participe! Faça parte deste movimento e ajude-nos a continuar
            espalhando a esperança. Juntos, podemos alcançar mais pessoas e
            levar adiante a nossa causa. Construindo um futuro onde a prevenção
            esteja ao alcance das mãos e a vida seja sempre prioridade.Faça
            parte dessa causa.
          </Paragraph>
          <TextHighlight>A prevenção salva! 🌸</TextHighlight>
        </div>
        <div className={'flex flex-col gap-4 my-5 md:mt-12'}>
          <VolunteerForm />
        </div>
      </section>
    </article>
  )
}
