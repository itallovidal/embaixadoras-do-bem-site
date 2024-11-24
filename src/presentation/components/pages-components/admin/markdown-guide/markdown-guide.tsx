import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/shadcn-ui/card'
import { SubHeading } from '@/presentation/components/global-components/text/subheading'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import React from 'react'

export function MarkdownGuide() {
  return (
    <Card className={'mb-12'}>
      <CardHeader>
        <CardTitle>Guia</CardTitle>
        <CardDescription>
          Guia de como organizar o contedo do seu artigo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SubHeading>Como inserir Titulos?</SubHeading>
        <Paragraph>
          Basta utilizar 'Jogo da Velha + espaço' antes da frase. <br />
          Exemplo: # Título 1
        </Paragraph>

        <SubHeading>Como usar itálico?</SubHeading>
        <Paragraph>
          Para itálico, use um asterisco (*) antes e depois da palavra: <br />{' '}
          Exemplo: *Texto em itálico*
        </Paragraph>

        <SubHeading>Como usar negrito?</SubHeading>
        <Paragraph>
          Para negrito, coloque o texto entre dois asteriscos (**): <br />
          Exemplo: **Texto em negrito**
        </Paragraph>

        <SubHeading>Como usar lista?</SubHeading>
        <Paragraph>
          Para usar listas, basta colocar um travessão (-): <br />
          Exemplo: - item 1
        </Paragraph>
      </CardContent>
      <CardFooter>
        <p>Veja o Resultado no campo de pré-visualização</p>
      </CardFooter>
    </Card>
  )
}
