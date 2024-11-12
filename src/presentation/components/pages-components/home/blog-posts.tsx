import { Button } from '../../global-components/button'
import React from 'react'
import { BlogCard } from '@/presentation/components/global-components/blog-card/blog-card'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/infra/adapters/get-posts'

export function BlogPosts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['last-posts'],
    queryFn: () => getPosts(3),
  })

  return (
    <article className={'flex flex-col  gap-12'}>
      <Heading>Fique por dentro do nosso blog!</Heading>
      <section
        className={'flex flex-row  lg:flex-row justify-between gap-3 flex-wrap'}
      >
        {isLoading && <p>carregando..</p>}
        {posts && posts.map((post, i) => <BlogCard key={i} post={post} />)}
      </section>
      <Button className={'self-center'} href={'blog'}>
        Ver postagens
      </Button>
    </article>
  )
}
