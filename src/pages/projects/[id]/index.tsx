import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Heading } from '@/presentation/components/global-components/text/heading'
import { Paragraph } from '@/presentation/components/global-components/text/paragraph'
import { useQuery } from '@tanstack/react-query'
import { getProjectDetails } from '@/infra/adapters/get-project-details'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../../presentation/components/global-components/button'
import Loader from '@/presentation/components/global-components/loader/loader'
import { convertSecondsToDate } from '@/presentation/utils/convert-seconds-to-date'
import { ShowProjectStatus } from '@/presentation/components/pages-components/project/show-project-status'
function Index() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectDetails(id),
    enabled: !!id,
  })
  const startDate = project?.startDate
    ? convertSecondsToDate(project?.startDate.seconds)
        .toLocaleString('pt-BR')
        .split(',')[0]
    : undefined
  const endDate = project?.endDate
    ? convertSecondsToDate(project?.endDate.seconds)
        .toLocaleString('pt-BR')
        .split(',')[0]
    : undefined

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

            <div className={'flex mb-12 justify-end sm:my-5'}>
              <Button
                onClick={() => router.back()}
                Icon={ArrowLeft}
                variant={'ghost'}
              >
                Voltar
              </Button>
            </div>
          </div>
          <Paragraph>{project.description}</Paragraph>

          <ShowProjectStatus
            project={{ isActive: project?.isActive, startDate, endDate }}
          />

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
