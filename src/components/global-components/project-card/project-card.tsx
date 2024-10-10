import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '../button'
import { IGetProjectRes } from '@/types/responses/get-project-response'

type TProjectProps = IGetProjectRes

export function ProjectCard({ images, title, description }: TProjectProps) {
  return (
    <Card className={'w-full md:w-[calc(theme(width.1/2)-theme(gap.2))]'}>
      <CardHeader>
        <picture className={'overflow-hidden rounded-lg md:max-w-[550px] mb-4'}>
          <Image
            className={'w-full h-full block object-cover'}
            width={580}
            src={images[0]}
            height={600}
            alt={'Foto do projeto'}
          />
        </picture>
        <CardTitle className={'text-subheading'}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={'leading-6 line-clamp-3'}>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button>Mais informações</Button>
      </CardFooter>
    </Card>
  )
}
