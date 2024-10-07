import { Header } from '@/components/global-components/header/header'
import Banner from '../../assets/banner-projects-background.png'
import { Button } from '../../components/global-components/button'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { BlogCard } from '@/components/global-components/blog-card/blog-card'

export default function Index() {
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
          <Button Icon={ArrowLeft} variant={'ghost'}>
            Voltar
          </Button>
        </div>

        <div
          className={
            'flex flex-col md:flex-row gap-3 flex-wrap justify-start mb-5'
          }
        >
          {Array.from({ length: 8 }).map(() => (
            <BlogCard />
          ))}
        </div>
      </section>
    </article>
  )
}
