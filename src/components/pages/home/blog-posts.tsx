import { Button } from '@/components/button'
import React from 'react'
import { BlogCard } from '@/components/blog-card/blog-card'
import { Heading } from '@/components/global-components/text/heading'

export function BlogPosts() {
  return (
    <article className={'flex flex-col  gap-12 my-24'}>
      <Heading>Fique por dentro do nosso blog!</Heading>
      <section
        className={'flex flex-row  lg:flex-row justify-between gap-3 flex-wrap'}
      >
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </section>
      <Button className={'self-center'}>Ver Galeria</Button>
    </article>
  )
}
