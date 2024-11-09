import { Banknote, Gift, HeartHandshake } from 'lucide-react'
// import { Button } from '../../global-components/button'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'

export function CallToAction() {
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
          <Paragraph className={'font-bold my-0'}>
            Pequenos gestos, grandes impactos!
          </Paragraph>
          <Paragraph className={'text-center mt-0 '}>
            Uma grande ação começa com pequenos gestos, se junte e causa e
            impacte vidas!
          </Paragraph>

          {/* <Button variant={'secondary'}>Se voluntariar</Button> */}
        </div>

        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <Banknote
            className={'bg-blue-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph className={'font-bold text-center mt-0 my-0'}>
            Sua contribuição faz toda a diferença
          </Paragraph>
          <Paragraph className={'text-center mt-0'}>
            Seja uma doação única ou de maneira recorrente, cada centavo conta
            para ajudar em nossa causa!
          </Paragraph>

          {/* <Button>Fazer Doação</Button> */}
        </div>

        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <Gift
            className={'bg-pink-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph className={'font-bold my-0'}>
            Ajude-nos a espalhar solidariedade
          </Paragraph>
          <Paragraph className={'text-center mt-0'}>
            Ajude doando itens, materiais e peças para a causa. Temos diversas
            campanhas disponíveis!
          </Paragraph>

          {/* <Button>Ajudar</Button> */}
        </div>
      </section>
    </article>
  )
}
