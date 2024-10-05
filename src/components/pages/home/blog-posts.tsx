import { Button } from '@/components/button'
import React from 'react'
import { BlogCards } from '@/components/blog-cards/blog-cards'
import { Heading } from '@/components/text'

export function BlogPosts() {
  return (
    <article className={'flex flex-col  gap-12 my-24'}>
      <Heading>Fique por dentro do nosso blog!</Heading>
      <section
        className={'flex flex-row  lg:flex-row justify-between gap-3 flex-wrap'}
      >
        <BlogCards />
        <BlogCards />
        <BlogCards />
      </section>
      <Button className={'self-center'}>Ver Galeria</Button>
    </article>
  )
}
