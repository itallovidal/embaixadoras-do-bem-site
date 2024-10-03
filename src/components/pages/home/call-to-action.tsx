import { Heading, Paragraph } from '@/components/text'
import { Banknote, Gift, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/button'

export function CallToAction() {
  return (
    <article className=" gap-12 my-10">
      <div>
        <Heading>Doe esperança,</Heading>
        <Heading>transforme vidas</Heading>
      </div>

      <section className={'flex mt-12 items-start'}>
        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <Banknote
            className={'bg-pink-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph style={'font-bold'}>
            Sua contribuição faz toda a diferença
          </Paragraph>
          <Paragraph style={'text-center'}>
            Seja uma doação única ou de maneira recorrente, cada centavo conta
            para ajudar em nossa causa!
          </Paragraph>

          <Button>Fazer Doação</Button>
        </div>

        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <HeartHandshake
            className={'bg-blue-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph style={'font-bold'}>
            Pequenos gestos, grandes impactos!
          </Paragraph>
          <Paragraph style={'text-center'}>
            Uma grande ação começa com pequenos gestos, se junte e causa e
            impacte vidas!
          </Paragraph>

          <Button variant={'secondary'}>Se voluntariar</Button>
        </div>

        <div className={'flex flex-col gap-4 justify-center items-center'}>
          <Gift
            className={'bg-pink-dark p-2 size-12 rounded-full'}
            color={'white'}
          />
          <Paragraph style={'font-bold'}>Juntos somos mais fortes</Paragraph>
          <Paragraph style={'text-center'}>
            Ajude doando itens, materiais e peças para a causa. Temos diversas
            campanhas disponíveis!
          </Paragraph>

          <Button>Ajudar</Button>
        </div>
      </section>
    </article>
  )
}
