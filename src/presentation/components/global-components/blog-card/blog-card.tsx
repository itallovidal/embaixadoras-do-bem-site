import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/shadcn-ui/card'
import { Button } from '../button'

export function BlogCard({ post }: { post: IPost }) {
  console.log(post)
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
        <CardTitle className={'text-subheading'}>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={'leading-6 line-clamp-6'}>
          {post.text.substring(0, 250)}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button href={`/blog/${post.collectionId}`}>Mais informações</Button>
      </CardFooter>
    </Card>
  )
}
