import React from 'react'
import { Button } from '../../global-components/button'
import { ArrowRight, Plus } from 'lucide-react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { AdminProjectCardSkeleton } from '@/presentation/components/skeletons/admin-project-card-skeleton'
import { getPosts } from '@/infra/adapters/get-posts'
import { AdminPostCard } from '@/presentation/components/pages-components/admin/admin-post-card'

export function BlogManager() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['last-posts'],
    queryFn: () => getPosts(5),
  })

  return (
    <article className={'animate-showing opacity-0 flex flex-col gap-12'}>
      <div
        className={
          'flex flex-col gap-2  justify-between sm:flex-row sm:items-center'
        }
      >
        <Heading>Gerencie suas publicações</Heading>
        <Button href={'/admin/blog/create-post'} Icon={Plus}>
          Criar uma publicação
        </Button>
      </div>
      <section className={'flex flex-col lg:flex-row justify-start gap-4'}>
        {isLoading &&
          Array.from({ length: 3 }).map(() => <AdminProjectCardSkeleton />)}

        {posts &&
          posts.map(
            (post, i) => i < 4 && <AdminPostCard key={post.id} post={post} />,
          )}
      </section>
      {posts && posts.length > 4 && (
        <Button
          href={'/admin/blog'}
          variant={'outline'}
          className={'self-end'}
          Icon={ArrowRight}
        >
          Ver todas publicações
        </Button>
      )}
    </article>
  )
}
