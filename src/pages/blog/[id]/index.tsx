import { useQuery } from '@tanstack/react-query'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import React from 'react'

export default function Index() {
  const { data: post, isLoading } = useQuery({
    queryKey: ['last-posts'],
    // queryFn: () => getPosts(4),
  })

  return (
    <article className={'animate-showing opacity-0'}>
      <section className={'max-w-safeMobile xl:max-w-safeDesktop m-auto'}>
        <div className={'blog-content'}>
          <Markdown remarkPlugins={[remarkGfm]}>{post.text}</Markdown>
        </div>
      </section>
    </article>
  )
}
