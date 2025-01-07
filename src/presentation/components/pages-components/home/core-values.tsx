import React from 'react'
import { Banknote, Gift, Heading, HeartHandshake } from 'lucide-react'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'

export default function CoreValues() {
  return (
    <article className={'gap-12'}>
      <div>
        <Heading className={'text-center sm:text-justify'}>
          Doe esperança,
        </Heading>
        <Heading className={'text-center sm:text-justify'}>
          transforme vidas
        </Heading>
      </div>

      <section className={'flex flex-col md:flex-row gap-10 mt-12 items-start'}>
        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <HeartHandshake
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
          <Banknote
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
          <Gift
            className={'bg-pink-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph style={{ marginBlock: 0 }} className={'font-bold'}>
            Valores
          </Paragraph>
          <Paragraph className={'text-center mt-0'}>
            a) Ética, transparência e responsabilidade em nossas ações e
            relações; b) Independência para agir segundo os ideais da
            organização; c) Respeito pela diversidade; d) Valorização das
            parcerias e do trabalho em rede; e) Honestidade; g) Motivação; h)
            Empatia.
          </Paragraph>
        </div>
      </section>
    </article>
  )
}
