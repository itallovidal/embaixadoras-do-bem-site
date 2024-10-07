import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Placeholder from '../../assets/placeholder-project-banner.png'
import Image from 'next/image'
import { Button } from '@/components/button'

export function ProjectCard() {
  return (
    <Card className={'w-full md:w-[calc(theme(width.1/2)-theme(gap.2))]'}>
      <CardHeader>
        <picture className={'overflow-hidden rounded-lg md:max-w-[550px] mb-4'}>
          <Image
            className={'w-full h-full block object-cover'}
            width={580}
            src={Placeholder}
            alt={'Foto do projeto x'}
          />
        </picture>
        <CardTitle className={'text-subheading'}>
          Projeto Cheirinho de Neném
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={'leading-6 line-clamp-3'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          sollicitudin tellus et ultrices vulputate. In vitae nunc nisi. Fusce
          nec tortor at sem imperdiet accumsan et vitae justo. Nullam eu tortor
          sit amet felis viverra facilisis. Aliquam consequat congue lorem, nec
          facilisis ante convallis consectetur. Vestibulum accumsan nibh sed
          ante sodales sollicitudin. Pellentesque fermentum erat et purus
          pulvinar posuere. Vivamus volutpat vulputate justo, in consequat velit
          tincidunt ac. Mauris arcu sapien, maximus ut purus eu, rutrum placerat
          sem. Suspendisse mattis, nunc eu semper rhoncus, metus arcu feugiat
          tellus, vel scelerisque nibh dui eget diam. Duis laoreet enim ut ante
          accumsan volutpat. Sed vitae ipsum elit. Fusce ac nunc vitae eros
          tincidunt gravida mattis ut velit. Maecenas nibh quam, suscipit ac
          justo at, luctus consectetur diam. Sed convallis lectus leo, et rutrum
          sem interdum ut.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button>Mais informações</Button>
      </CardFooter>
    </Card>
  )
}
