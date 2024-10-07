import {
  CarouselContent,
  CarouselItem,
  Carousel as ShadcnUiCarousel,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import Image, { StaticImageData } from 'next/image'
import aboutPic1 from '../../../assets/about-pic-1.jpg'
import aboutPic2 from '../../../assets/about-pic-2.jpg'
import aboutPic3 from '../../../assets/about-pic-3.jpg'
import projectPic from '../../../assets/placeholder-project-banner.png'
import { Heading } from '@/components/global-components/text/heading'
import { Paragraph } from '@/components/global-components/text/paragraph'

interface IProjectPhotos {
  img: StaticImageData
  description: string
}
const projectsPhotos: IProjectPhotos[] = [
  {
    img: aboutPic1,
    description: 'Foto 1',
  },
  {
    img: aboutPic2,
    description: 'Foto 2',
  },
  {
    img: aboutPic3,
    description: 'Foto 3',
  },
  {
    img: projectPic,
    description: 'Foto 4',
  },
]

export function Carousel() {
  return (
    <article className={'flex flex-col gap-12 my-10'}>
      <section className={'flex flex-col justify-between gap-12'}>
        <Heading>Orgulho de Ajudar!</Heading>

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
                <div>
                  <Paragraph className={'text-center'}>
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
