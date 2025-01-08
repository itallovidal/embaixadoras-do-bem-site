import React from 'react'
import { Eye, HandHeart, Handshake } from 'lucide-react'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { Heading } from '@/presentation/components/global-components/text/heading'

export default function CoreValues() {
  return (
    <article className={'gap-12'}>
      <div>
        <Heading className={'text-center sm:text-justify'}>
          Nossos Pilares
        </Heading>
        <Heading className={'text-center sm:text-justify'}>
          Propósito, Futuro e Compromisso
        </Heading>
      </div>

      <section className={'flex flex-col md:flex-row gap-10 mt-12 items-start'}>
        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <Handshake
            className={'bg-pink-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph style={{ marginBlock: 0 }} className={'font-bold'}>
            Missão
          </Paragraph>
          <Paragraph className={'text-center mt-0 '}>
            Realizar ações socioeducativas, com o intuito de alertar para a
            promoção e prevenção à saúde e o bem estar social.
          </Paragraph>
        </div>

        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <Eye
            className={'bg-blue-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph style={{ marginBlock: 0 }} className={'font-bold '}>
            Visão
          </Paragraph>
          <Paragraph className={'text-center mt-0'}>
            Realizar projetos e ações à valorização da vida, contribuindo para
            uma existência saudável e harmoniosa visando uma sociedade mais
            justa e igualitária.
          </Paragraph>
        </div>

        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <HandHeart
            className={'bg-pink-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph style={{ marginBlock: 0 }} className={'font-bold'}>
            Valores
          </Paragraph>
          <div>
            <Paragraph className={'text-center mt-0'}>
              Ética, transparência e responsabilidade; independência para agir
              com nossos ideais; respeito à diversidade; valorização de
              parcerias; honestidade, motivação e empatia.
            </Paragraph>
          </div>
        </div>
      </section>
    </article>
  )
}
