import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/shadcn-ui/card'
import { Button } from '../button'
import { formatPostDescription } from '@/presentation/utils/format-post-description'

export function BlogCard({ post }: { post: IPost }) {
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
        <CardTitle className={'text-subheading leading-12 line-clamp-2 '}>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription
          className={`leading-6 line-clamp-6 text-justify after:content-["..."]`}
          style={{ wordSpacing: '-2px' }}
        >
          {formatPostDescription(post.text)}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button href={`/blog/${post.id}`}>Mais informações</Button>
      </CardFooter>
    </Card>
  )
}
