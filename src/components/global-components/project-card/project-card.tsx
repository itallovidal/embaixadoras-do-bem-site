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
import { IGetProjectResponse } from '@/types/responses/get-project-response'

type TProjectProps = IGetProjectResponse

export function ProjectCard({ images, title, description, id }: TProjectProps) {
  return (
    <Card
      className={
        'w-full flex flex-col md:w-[calc(theme(width.1/2)-theme(gap.2))]'
      }
    >
      <CardHeader className={'flex-1'}>
        <picture
          className={'overflow-hidden rounded-lg h-full  md:max-w-[550px] mb-4'}
        >
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
        <Button href={`/projects/${id}`}>Mais informações</Button>
      </CardFooter>
    </Card>
  )
}
