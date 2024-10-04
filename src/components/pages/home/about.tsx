import React from 'react'
import Image from 'next/image'
import AboutPic1 from '../../../assets/about-pic-1.jpg'
import AboutPic2 from '../../../assets/about-pic-2.jpg'
import AboutPic3 from '../../../assets/about-pic-3.jpg'
import { Heading, Paragraph, Highlight } from '@/components/text'

export function About() {
  return (
    <article className={'flex flex-col gap-12 my-10'}>
      <section className={'flex flex-col lg:flex-row justify-between gap-12'}>
        <div>
          <Heading> Sobre nós </Heading>

          <Paragraph>
            <Highlight>Somos uma ONG</Highlight> - Organização Não Governamental
            - constituída regimentalmente em fevereiro de 2024, mas somos
            <Highlight>atuantes desde 2020</Highlight> sob a coordenação de
            <Highlight>Tania Mary Gomez.</Highlight>
          </Paragraph>
          <Paragraph>
            O <Highlight>grupo formou-se no ano de 2020</Highlight>, em plena
            crise da COVID, atuando fundamentalmente em projetos e ou ações
            individuais ou coletivos em datas comemorativas e significativas em
            cada mês do ano visando a prevenção e promoção à saúde
            principalmente.
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
          <Heading> Inspiração de vida</Heading>
          <Paragraph>
            A criação das Embaixadoras do bem foi motivado pelo histórico de
            vida da Sra. Tânia Mary Gomez e pelo reconhecimento dado à ela,
            <Highlight>
              quando recebeu o título de embaixadora da paz mundial
            </Highlight>
            , que é dado as pessoas que realizam trabalhos diferenciados em prol
            do próximo.
          </Paragraph>
          <Paragraph>
            Tânia Mary Gomez{' '}
            <Highlight>venceu o câncer de mama há 23 anos </Highlight>, como
            compromisso com Deus, criou o projeto Chaveiro da Vida - Prevenção
            ao Alcance das Mãos, instrumento didático para levar o alerta de
            prevenção ao câncer de Mama.
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
          <Heading>Juntas somos mais fortes! </Heading>
          <Paragraph>
            Motivadas pelo seu dinamismo e experiência de vida, várias
            <Highlight>amigas</Highlight> e
            <Highlight>simpatizantes se tornaram voluntárias </Highlight> de
            vários projetos com o propósito de servir ao próximo. Desde 2020, as
            Embaixadoras do Bem
            <Highlight>
              desenvolvem diversas ações no Outubro Rosa e Novembro Azul.
            </Highlight>
          </Paragraph>
          <Paragraph>
            As voluntárias tem diferentes formações e distintas experiências de
            vida e de trabalho. Dessa forma,
            <Highlight>se somam pelos seus talentos</Highlight> e desenvolvem
            projetos e ações que fazem a diferença nas
            <Highlight>
              comunidades carentes, hospitais e Entidades do Terceiro Setor.
            </Highlight>
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
