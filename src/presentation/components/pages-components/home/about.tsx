import React from 'react'
import Image from 'next/image'
import AboutPic1 from '../../../../../public/home/about/about-pic-1.jpg'
import AboutPic2 from '../../../../../public/home/about/about-pic-2.jpg'
import AboutPic3 from '../../../../../public/home/about/about-pic-3.jpg'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { TextHighlight } from '@/presentation/components/global-components/text/textHighlight'

export function About() {
  return (
    <article className={'flex flex-col gap-12 my-10'}>
      <section className={'flex flex-col lg:flex-row justify-between gap-12'}>
        <div>
          <Heading className={'text-center sm:text-justify'}>Sobre nós</Heading>

          <Paragraph>
            <TextHighlight>Somos uma ONG</TextHighlight> - Organização Não
            Governamental - constituída regimentalmente em fevereiro de 2024,
            mas somos
            <TextHighlight> atuantes desde 2020 </TextHighlight> sob a
            coordenação de
            <TextHighlight> Tania Mary Gomez. </TextHighlight>
          </Paragraph>
          <Paragraph>
            O <TextHighlight>grupo formou-se no ano de 2020</TextHighlight>, em
            plena crise da COVID, atuando fundamentalmente em projetos e ou
            ações individuais ou coletivos em datas comemorativas e
            significativas em cada mês do ano visando a prevenção e promoção à
            saúde principalmente.
          </Paragraph>
        </div>

        <Image
          width={600}
          src={AboutPic1}
          alt={'imagem das embaixadoras juntas'}
          className={'self-center'}
        />
      </section>

      <section
        className={'flex flex-col lg:flex-row-reverse justify-between gap-12'}
      >
        <div>
          <Heading className={'text-center sm:text-justify'}>
            Inspiração de vida
          </Heading>
          <Paragraph>
            A criação das Embaixadoras do bem foi motivado pelo histórico de
            vida da Sra. Tânia Mary Gomez e pelo reconhecimento dado à ela,{' '}
            <TextHighlight>
              quando recebeu o título de embaixadora da paz mundial,
            </TextHighlight>{' '}
            que é dado as pessoas que realizam trabalhos diferenciados em prol
            do próximo.
          </Paragraph>
          <Paragraph>
            Tânia Mary Gomez{' '}
            <TextHighlight>venceu o câncer de mama há 23 anos </TextHighlight>,
            como compromisso com Deus, criou o projeto Chaveiro da Vida -
            Prevenção ao Alcance das Mãos, instrumento didático para levar o
            alerta de prevenção ao câncer de Mama.
          </Paragraph>
        </div>

        <Image
          width={600}
          src={AboutPic2}
          alt={
            'imagem da Sra. Tânia Gomez recebendo o certificado de embaixadora da paz.'
          }
          className={'self-center'}
        />
      </section>

      <section className={'flex flex-col lg:flex-row  justify-between gap-12'}>
        <div>
          <Heading className={'text-center sm:text-justify'}>
            Juntas somos muito mais fortes!
          </Heading>
          <Paragraph>
            Motivadas pelo seu dinamismo e experiência de vida, várias{' '}
            <TextHighlight>amigas</TextHighlight> e{' '}
            <TextHighlight>simpatizantes se tornaram voluntárias</TextHighlight>
            de vários projetos com o propósito de servir ao próximo. Desde 2020,
            as Embaixadoras do Bem{' '}
            <TextHighlight>
              desenvolvem diversas ações no Outubro Rosa e Novembro Azul.
            </TextHighlight>
          </Paragraph>
          <Paragraph>
            As voluntárias tem diferentes formações e distintas experiências de
            vida e de trabalho. Dessa forma,{' '}
            <TextHighlight>se somam pelos seus talentos</TextHighlight> e
            desenvolvem projetos e ações que fazem a diferença nas{' '}
            <TextHighlight>
              comunidades carentes, hospitais e Entidades do Terceiro Setor.
            </TextHighlight>
          </Paragraph>
        </div>

        <Image
          width={600}
          src={AboutPic3}
          alt={'imagem das embaixadoras juntas'}
          className={'self-center'}
        />
      </section>
    </article>
  )
}
