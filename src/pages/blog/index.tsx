import { Header } from '@/presentation/components/global-components/header/header'
import Banner from '../../../public/projects/banner-projects-background.png'
import { Button } from '@/presentation/components/global-components/button'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { BlogCard } from '@/presentation/components/global-components/blog-card/blog-card'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/infra/adapters/get-posts'

export default function Index() {
  const { data: posts } = useQuery({
    queryKey: ['all-posts'],
    queryFn: () => getPosts(),
  })

  return (
    <article>
      <Header
        short={true}
        img={Banner}
        alt={'Nossos artigos'}
        title={'Nossos artigos'}
      />

      <section className={'max-w-safeMobile lg:max-w-safeDesktop m-auto my-12'}>
        <div className={'my-5 flex  justify-end'}>
          <Button Icon={ArrowLeft} variant={'ghost'} href={'/'}>
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
      </section>
    </article>
  )
}
