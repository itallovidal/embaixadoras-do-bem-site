import React from 'react'
import bannerBackground from '../../../assets/background-volunteer-form.jpg'
import Image from 'next/image'
import { Button } from '@/components/button'
import { Input } from '@/components/ui/input'
import { Heading } from '@/components/global-components/text/heading'
import { Paragraph } from '@/components/global-components/text/paragraph'

export function VolunteerForm() {
  return (
    <article
      className={
        'flex flex-col overflow-hidden gap-12 my-24 relative md:h-[875px]'
      }
    >
      <section
        className={
          'flex gap-2 md:gap-12 flex-col md:flex-row lg:flex-row justify-between max-w-safeMobile xl:max-w-safeDesktop mx-auto'
        }
      >
        <Image
          src={bannerBackground}
          alt={'fundo de uma campanha'}
          className={'w-full h-full -z-10 top-0 left-0 absolute'}
        />
        <div className={'bg-white p-12 md:max-w-[550px] rounded-b-3xl'}>
          <Heading>Junte-se à nós!</Heading>
          <Paragraph>
            Acreditamos que a mudança começa com gestos simples de
            solidariedade. Agora, queremos contar com você nessa jornada de
            transformação. Ao se juntar a nós como voluntário(a), você estará
            ajudando a salvar vidas, levando informação e conscientização sobre
            a prevenção do câncer de mama e do câncer de próstata.
          </Paragraph>
          <Paragraph>
            Participe! Faça parte deste movimento e ajude-nos a continuar
            espalhando a esperança. Juntos, podemos alcançar mais pessoas e
            levar adiante a nossa causa. Construindo um futuro onde a prevenção
            esteja ao alcance das mãos e a vida seja sempre prioridade.
          </Paragraph>
          <Paragraph>Faça parte dessa causa. A prevenção salva! 🌸</Paragraph>
        </div>
        <div className={'flex flex-col gap-4 my-5 md:mt-12'}>
          <form className={'md:flex md:flex-wrap md:gap-4 md:justify-end '}>
            <label className={'text-white'}>
              Nome
              <Input />
            </label>

            <label className={'text-white'}>
              Nome
              <Input />
            </label>

            <label className={'text-white'}>
              Nome
              <Input />
            </label>

            <label className={'text-white'}>
              Nome
              <Input />
            </label>
          </form>
          <Button variant={'outline'} className={'self-end'}>
            Me voluntariar!
          </Button>
        </div>
      </section>
    </article>
  )
}
