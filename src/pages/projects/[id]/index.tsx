import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Heading } from '@/components/global-components/text/heading'
import { Paragraph } from '@/components/global-components/text/paragraph'
import { useQuery } from '@tanstack/react-query'
import { getProjectDetails } from '@/utils/api/get-project-details'
import { Loader2 } from 'lucide-react'
function Index() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectDetails(id),
    enabled: !!id,
  })

  console.log(project)

  if (isLoading) return <Loader2 />

  if (project)
    return (
      <article className={'my-12'}>
        <section
          className={'max-w-safeMobile lg:max-w-safeDesktop m-auto my-24'}
        >
          <Heading>{project.title}</Heading>
          <Paragraph className={''}>{project.description}</Paragraph>

          <div className={'mt-8 flex flex-wrap w-full gap-4'}>
            {project.images.map((image) => (
              <picture
                className={
                  'overflow-hidden rounded-2xl w-[calc(theme(width.1/2)-theme(gap.2))]'
                }
              >
                <Image
                  className={'block w-full h-full object-cover'}
                  src={image}
                  width={370}
                  height={600}
                  alt={'Imagem do projeto'}
                />
              </picture>
            ))}
          </div>
        </section>
      </article>
    )
}

export default Index
