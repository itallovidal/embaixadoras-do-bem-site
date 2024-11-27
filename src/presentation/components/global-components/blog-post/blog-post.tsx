import React from 'react'
import { Heading } from '@/presentation/components/global-components/text/heading'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useQuery } from '@tanstack/react-query'
import { getBlogTagById } from '@/infra/adapters/blog/tag/get-blog-tag-by-id'

interface IBlogPostProps {
  title: string
  text: string
  author: string
  tagId: string
}

function BlogPost({ tagId, title, text, author }: IBlogPostProps) {
  const { data: tag } = useQuery({
    queryKey: ['tag', tagId],
    queryFn: () => getBlogTagById({ id: tagId }),
  })

  return (
    <div>
      <div className={'flex justify-between items-center '}>
        <Heading>{title}</Heading>
        {tag && (
          <div className={'bg-pink-400 text-white py-1 px-2 h-fit rounded-2xl'}>
            {tag.name}
          </div>
        )}
      </div>
      <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      {author && (
        <p className={'flex justify-end text-gray-500 italic'}>
          Publicado por {author}
        </p>
      )}
    </div>
  )
}

export default BlogPost
