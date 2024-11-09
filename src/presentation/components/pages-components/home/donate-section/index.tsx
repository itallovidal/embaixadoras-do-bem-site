import React from 'react'
import donateBackground from '../../../../../../public/home/bg-donate.jpg'
import Image from 'next/image'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import qrcodeDonate from '../../../../../../public/qrcode-donate/qrcodedonate.svg'
import { SubHeading } from '@/presentation/components/global-components/text/subheading'
import { Heading } from '@/presentation/components/global-components/text/heading'

export function DonateSection() {
  return (
    <article
      id={'donate-section'}
      className={'flex flex-col justify-end gap-12'}
    >
      <section
        className={
          'flex gap-2 md:gap-12 flex-col md:flex-row w-full lg:flex-row justify-between xl:max-w-safeDesktop mx-auto'
        }
      >
        <div
          className={
            'p-12 md:max-w-[550px] sm:rounded-t-3xl overflow-hidden relative '
          }
        >
          <SubHeading className={'text-white text-center sm:text-justify'}>
            Juntos por um amanhã mais solidário
          </SubHeading>
          <Paragraph className={'text-white'}>
            Desde 2020, as Embaixadoras do Bem vêm se dedicando com amor e
            comprometimento a transformar vidas, unindo forças e talentos para
            apoiar comunidades carentes e hospitais, trabalhando sempre com
            paixão e determinação para levar esperança e conforto a quem mais
            precisa.
          </Paragraph>
          <Paragraph className={'text-white'}>
            Mas elas não podem fazer isso sozinhas. Cada doação conta e ajuda a
            potencializar esse movimento do bem. Ao contribuir, você não está
            apenas doando itens ou recursos; está oferecendo uma chance real de
            mudança, ampliando o alcance dessas ações e ajudando a levar
            dignidade, saúde e acolhimento para mais pessoas.
          </Paragraph>
          <Paragraph className={'text-white'}>
            Junte-se às Embaixadoras do Bem e faça parte dessa rede de
            solidariedade. Com o seu apoio, podemos ir mais longe e alcançar
            ainda mais vidas.
          </Paragraph>
          <Image
            src={donateBackground}
            alt={'fundo de uma campanha'}
            className={
              'w-full h-full -z-10 top-0 left-0 absolute object-cover  lg:opacity-100'
            }
          />
        </div>
        <div
          className={
            'flex flex-col gap-2 my-5 md:mt-12 w-full items-center justify-start '
          }
        >
          <Heading className={'text-pink-dark'}>Doações</Heading>
          <Image src={qrcodeDonate} height={250} alt={'qr da doação.'} />
          <div className={'flex flex-col gap-2 items-center justify-center'}>
            <Paragraph style={{ marginBlock: 0 }} className={'text-gray-400'}>
              Nome
            </Paragraph>
            <Paragraph style={{ marginBlock: 0 }} className={'text-center'}>
              Embaixadores Do Bem Organização Não Governamental
            </Paragraph>
            <Paragraph style={{ marginBlock: 0 }} className={' text-gray-400'}>
              CNPJ
            </Paragraph>
            <Paragraph style={{ marginBlock: 0 }}>54.765.878/0001-47</Paragraph>
            <Paragraph style={{ marginBlock: 0 }} className={' text-gray-400'}>
              Instituição
            </Paragraph>
            <Paragraph style={{ marginBlock: 0 }} className={''}>
              CORA SCFI
            </Paragraph>
          </div>
        </div>
      </section>
    </article>
  )
}
