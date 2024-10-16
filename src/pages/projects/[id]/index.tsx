import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Heading } from '@/components/global-components/text/heading'
import { Paragraph } from '@/components/global-components/text/paragraph'
import { useQuery } from '@tanstack/react-query'
import { getProjectDetails } from '@/utils/api/get-project-details'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/global-components/button'
import Loader from '@/components/global-components/loader/loader'
import { convertSecondsToDate } from '@/utils/convert-seconds-to-date'
function Index() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectDetails(id),
    enabled: !!id,
  })
  const startDate = project?.startDate
    ? convertSecondsToDate(project?.startDate.seconds).toLocaleString('pt-BR').split(',')[0]
    : undefined
  const endDate = project?.endDate
    ? convertSecondsToDate(project?.endDate.seconds).toLocaleString('pt-BR').split(',')[0]
    : undefined

  console.log(project)
  if (isLoading) return <Loader />

  if (project)
    return (
      <article className={'my-12'}>
        <section className={'max-w-safeMobile xl:max-w-safeDesktop m-auto'}>
          <div
            className={
              'flex flex-col-reverse items-start justify-between sm:flex-row sm:gap-5 sm:items-center'
            }
          >
            <Heading>{project.title}</Heading>

            <div className={' flex justify-end sm:my-5'}>
              <Button href={'/projects'} Icon={ArrowLeft} variant={'ghost'}>
                Voltar
              </Button>
            </div>
          </div>
          <Paragraph>{project.description}</Paragraph>

          <div>
            <p>Data do inicio do projeto {startDate}</p>
            {project.isActive ? (
              <p>Projeto ainda ativo</p>
            ) : (
              <p>Data da finalização do projeto {endDate}</p>
            )}
          </div>

          <div
            className={'mt-8 flex flex-col flex-wrap w-full gap-4 sm:flex-row'}
          >
            {project.images.map((image, i) => (
              <picture
                className={
                  'overflow-hidden rounded-2xl sm:w-[calc(theme(width.1/2)-theme(gap.2))]'
                }
              >
                <Image
                  className={'block w-full h-full object-cover'}
                  key={i}
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
