import React from 'react'
import { useRouter } from 'next/router'
import { getBlogtDetails } from '@/infra/adapters/get-blog-details'
import { useQuery } from '@tanstack/react-query'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { Button } from '@/presentation/components/global-components/button'
import { ArrowLeft } from 'lucide-react'

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
            <div className={'flex mb-12 justify-end sm:my-5'}>
              <Button
                onClick={() => router.back()}
                Icon={ArrowLeft}
                variant={'ghost'}
              >
                Voltar
              </Button>
            </div>
            <Heading>{post?.title}</Heading>

            <Markdown remarkPlugins={[remarkGfm]}>{post.text}</Markdown>
          </div>
        )}
      </section>
    </article>
  )
}

export default Id
