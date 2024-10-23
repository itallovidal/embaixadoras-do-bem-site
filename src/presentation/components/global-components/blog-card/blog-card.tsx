import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/shadcn-ui/card'
import { Button } from '../button'

export function BlogCard() {
  return (
    <Card
      className={
        'w-full md:w-[calc(theme(width.1/3)-theme(gap.2))] bg-gray-100'
      }
    >
      <CardHeader>
        <picture className={'overflow-hidden rounded-lg md:max-w-[350px] mb-4'}>
          {/* <Image */}
          {/*  className={'w-full h-full block object-cover'} */}
          {/*  width={350} */}
          {/*  src={Placeholder} */}
          {/*  alt={'Foto do projeto x'} */}
          {/* /> */}
        </picture>
        <CardTitle className={'text-subheading'}>
          Setembro Amarelo e sua conscientização
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={'leading-6 line-clamp-6'}>
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
