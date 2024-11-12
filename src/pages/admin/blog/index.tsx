import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/presentation/components/global-components/button'
import { getServerSideProps } from '@/gssp-admin-cookies'
import { ProjectCardSkeleton } from '@/presentation/components/skeletons/project-card-skeleton'
import { getBlogPosts } from '@/infra/adapters/get-blog-posts'
import { BlogCard } from '@/presentation/components/global-components/blog-card/blog-card'

function Index() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['all-posts'],
    queryFn: () => getBlogPosts(),
  })

  if (isLoading)
    return Array.from({ length: 4 }).map(() => <ProjectCardSkeleton />)

  if (posts)
    return (
      <article
        className={
          'min-h-[60vh] max-w-safeMobile xl:max-w-safeDesktop m-auto flex flex-col gap-12 py-32'
        }
      >
        <div className={'flex justify-between items-center'}>
          <Heading>Publicações</Heading>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft}>
            Voltar
          </Button>
        </div>
        <div
          className={
            'flex flex-col md:flex-row gap-3 flex-wrap justify-start mb-5'
          }
        >
          {posts && posts.map((post) => <BlogCard post={post} />)}
        </div>
      </article>
    )
}

export default Index

export { getServerSideProps }
