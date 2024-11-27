import React from 'react'
import { useRouter } from 'next/router'
import { getBlogtDetails } from '@/infra/adapters/blog/post/get-blog-post-details'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/presentation/components/global-components/button'
import { ArrowLeft } from 'lucide-react'
import BlogPost from '@/presentation/components/global-components/blog-post/blog-post'

function Id() {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const { data: post } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getBlogtDetails(id),
  })

  return (
    <article className={'animate-showing opacity-0'}>
      <section className={'max-w-safeMobile xl:max-w-safeDesktop m-auto'}>
        {post && (
          <div className={'blog-content'}>
            <div className={'flex mb-12  self-end sm:my-5'}>
              <Button
                onClick={() => router.back()}
                Icon={ArrowLeft}
                variant={'ghost'}
              >
                Voltar
              </Button>
            </div>

            <BlogPost
              title={post.title}
              text={post.text}
              author={post.author}
              tagId={post.tagId}
            />
          </div>
        )}
      </section>
    </article>
  )
}

export default Id
