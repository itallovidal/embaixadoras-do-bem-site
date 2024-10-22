import {
  CarouselContent,
  CarouselItem,
  Carousel as ShadcnUiCarousel,
  CarouselPrevious,
  CarouselNext,
} from '@/presentation/components/shadcn-ui/carousel'
import Image, { StaticImageData } from 'next/image'
import img1 from '@/root/public/home/past-projects/imagem-1.png'
import img2 from '@/root/public/home/past-projects/imagem-2.jpeg'
import img3 from '@/root/public/home/past-projects/imagem-3.png'
import img4 from '@/root/public/home/past-projects/imagem-4.png'
import img5 from '@/root/public/home/past-projects/imagem-5.jpeg'
import img6 from '@/root/public/home/past-projects/imagem-6.jpeg'
import img7 from '@/root/public/home/past-projects/imagem-7.png'
import img8 from '@/root/public/home/imagem-8.png'
import img9 from '@/root/public/home/past-projects/imagem-9.jpeg'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { SubHeading } from '@/presentation/components/global-components/text/subheading'
import Link from 'next/link'

interface IProjectPhotos {
  img: StaticImageData
  description: string
}
const projectsPhotos: IProjectPhotos[] = [
  {
    img: img1,
    description: 'As embaixadoras juntas!',
  },
  {
    img: img2,
    description: 'Realizando palestras sobre o Outubro rosa!',
  },
  {
    img: img9,
    description: 'E discutindo sobre a saúde do homem no novembro azul!',
  },
  {
    img: img3,
    description:
      'As embaixadoras na operação verão: fornecendo dicas contra câncer de pele.',
  },
  {
    img: img4,
    description: 'Quem não ama um bom verão, não é mesmo?',
  },
  {
    img: img5,
    description:
      'Projeto Cheirinho de neném: levamos enxovais para comunidades e enfermarias.',
  },
  {
    img: img6,
    description:
      'Ação de páscoa em comunidades carentes levando lanches e chocolates para as crianças.',
  },
  {
    img: img7,
    description:
      'Ação do bem entregando kits de higiene e chinelos em hospitais!',
  },
]

export function Carousel() {
  return (
    <article className={'flex flex-col gap-12 my-10'}>
      <section className={'flex flex-col justify-between'}>
        <Heading>Orgulho de Ajudar!</Heading>
        <SubHeading>
          Um pouquinho do nosso trabalho ao longo desses anos.
        </SubHeading>
        <Paragraph className={'mb-12'}>
          Para mais informações, veja todos nossos projetos{' '}
          <span className={'text-pink-dark'}>
            <Link href={'/projects'}>aqui</Link>.
          </span>
        </Paragraph>

        <ShadcnUiCarousel
          className={'w-4/5 lg:w-1/2 self-center'}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {projectsPhotos.map((photo, index) => (
              <CarouselItem key={index}>
                <Image
                  src={photo.img}
                  alt={photo.description}
                  className={'h-[500px] object-cover rounded-md w-full'}
                />
                <div className={'bg-gray-200 grid place-items-center mt-4 p-4'}>
                  <Paragraph className={'w-[70%] text-center italic '}>
                    {photo.description}
                  </Paragraph>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </ShadcnUiCarousel>
      </section>
    </article>
  )
}
