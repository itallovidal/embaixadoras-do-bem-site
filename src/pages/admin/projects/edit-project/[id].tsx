import { Input } from '@/presentation/components/global-components/input/input'
import { Checkbox } from '@/presentation/components/global-components/checkbox/checkbox'
import { Heading } from '@/presentation/components/global-components/text/heading'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { SelectedImageCard } from '@/presentation/components/global-components/selected-image-card/selected-image-card'
import { generatePreviewImages } from '@/presentation/utils/generate-preview-images'
import { DateTimePicker } from '@/presentation/components/global-components/date-time-picker/date-time-picker'
import { Controller, useForm } from 'react-hook-form'
import { projectSchema, TProjectSchema } from '@/validation/project.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/presentation/hooks/use-toast'
import { ArrowLeft } from 'lucide-react'
import { GetServerSideProps } from 'next'
import { convertSecondsToDate } from '@/presentation/utils/convert-seconds-to-date'
import { IGetProjectResponse } from '@/domain/api-responses/projects/get-project-response'
import { editProject } from '@/infra/adapters/edit-project'
import { Button } from '@/presentation/components/global-components/button'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { api } from '@/infra/lib/axios/axios'

interface ICreateProjectProps {
  project: IGetProjectResponse
}
interface IPreviewImg {
  id: string
  src: string
}

function EditProject({ project }: ICreateProjectProps) {
  const defaultEndDate =
    project.endDate && convertSecondsToDate(project.endDate.seconds)
  const defaultStartDate =
    project.startDate && convertSecondsToDate(project.startDate.seconds)
  const [imgsToAdd, setImgsToAdd] = useState<IImageToAdd[]>([])
  const [imgsToRemove, setImgsToRemove] = useState<IImageToRemove[]>([])
  const router = useRouter()

  const { toast } = useToast()
  const {
    watch,
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TProjectSchema>({
    defaultValues: {
      images: [],
      endDate: defaultEndDate || undefined,
      startDate: defaultStartDate || undefined,
      title: project.title,
      description: project.description,
      isActive: project.isActive,
    },
    resolver: zodResolver(projectSchema),
  })

  const selectedImages = watch('images')

  useEffect(() => {
    getDefaultImages()
  }, [])

  function getDefaultImages() {
    const imgs = project.images.map((img) => {
      return {
        src: img,
        id: img,
      }
    })
    setValue('images', imgs)
  }

  function handlePreviewImages(event: ChangeEvent<HTMLInputElement>) {
    const imgs = generatePreviewImages(event.target.files)
    const toPreview: { src: string; id: string }[] = []
    const toAdd: { file: File; id: string }[] = []

    imgs.forEach((file) => {
      toPreview.push({ src: file.src, id: file.id })
      toAdd.push({ file: file.file, id: file.id })
    })

    const allImages = [...getValues('images'), ...toPreview]
    setValue('images', allImages)

    setImgsToAdd((prevState) => [...prevState, ...toAdd])
  }

  function onDelete(imgToDelete: string) {
    const selectedImages = getValues('images')
    const filteredImages = selectedImages.filter((image: IPreviewImg) => {
      if (image.id !== imgToDelete) return true

      if (imgToDelete.includes('firebasestorage')) {
        setImgsToRemove((prevState) => [...prevState, image])
        return false
      }

      setImgsToAdd((prevState) =>
        prevState.filter((path) => {
          return path.id !== imgToDelete
        }),
      )

      return false
    })
    setValue('images', filteredImages)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleEditProject({ images, ...projectData }: TProjectSchema) {
    try {
      await editProject({
        imgsToAdd,
        imgsToRemove,
        ...projectData,
        collectionId: project.collectionId,
        id: project.id,
      })

      toast({
        className: 'bg-green-600 text-white',
        title: 'Projeto salvo!',
        description: 'Projeto salvo com sucesso.',
      })

      router.push('/admin/dashboard')
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: 'destructive',
          title: e.message,
          description: e.cause as string,
        })
      }
    }
  }

  return (
    <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-24'}>
      <div
        className={
          'flex flex-col-reverse items-start justify-between sm:flex-row sm:gap-5 sm:items-center'
        }
      >
        <Heading className={'mb-4'}>Edição do Projeto</Heading>

        <div className={' flex justify-end sm:my-5'}>
          <Button href={'/admin/projects'} Icon={ArrowLeft} variant={'ghost'}>
            Voltar
          </Button>
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={'p-4 bg-gray-200 rounded-lg gap-8 flex flex-col'}
      >
        <div className={'flex gap-4 flex-col lg:flex-row'}>
          <div className={'flex flex-col flex-1 gap-4 '}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  field={'Título do projeto'}
                  placeholder={'Qual foi seu nome?'}
                  errorMessage={errors.title?.message}
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={'title'}
            />

            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  wrapperStyle={'h-full '}
                  field={'Descrição do projeto'}
                  placeholder={'Conte os detalhes..'}
                  errorMessage={errors.description?.message}
                  isMultiline
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={'description'}
            />
          </div>

          <div className={'flex flex-col gap-4 '}>
            <div className={'flex flex-col sm:flex-row gap-4 mb-4'}>
              <DateTimePicker
                label={'Data de Inicio'}
                date={watch('startDate')}
                errorMessage={errors.startDate?.message}
                setDate={(date) => date && setValue('startDate', date)}
                isDisabled={isSubmitting}
              />
              <DateTimePicker
                isDisabled={watch('isActive') || isSubmitting}
                label={'Data de Fim'}
                date={watch('endDate')}
                errorMessage={errors.endDate?.message}
                setDate={(date) => date && setValue('endDate', date)}
              />
            </div>

            <Checkbox
              errorMessage={errors.isActive?.message}
              title={'Projeto ainda vigente'}
              description={
                'Marque essa opção caso o projeto ainda esteja ocorrendo.'
              }
              onClick={() => setValue('isActive', !watch('isActive'))}
              disabled={isSubmitting}
              checked={watch('isActive')}
            />

            <Input
              accept={'image/png, image/jpeg, image/jpg, image/webp'}
              className={'cursor-pointer w-fit'}
              field={'Clique para escolher as imagens'}
              type={'file'}
              onChange={(event) => handlePreviewImages(event)}
              multiple
              errorMessage={errors.images?.message}
              disabled={isSubmitting}
            />
          </div>
        </div>
        {selectedImages.length > 0 && (
          <div className={'flex gap-4 flex-wrap p-4 bg-white rounded-md'}>
            {selectedImages.map((value: IPreviewImg) => {
              return (
                <SelectedImageCard
                  key={value.id}
                  src={value.src}
                  id={value.id}
                  onDelete={onDelete}
                />
              )
            })}
          </div>
        )}
      </form>

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(handleEditProject)}
        className={'self-center my-12'}
      >
        Salvar projeto
      </Button>
    </div>
  )
}

export default EditProject

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as { id: string }

  const cookies = nookies.get(req.cookies)

  const response = await api.get(`/admin/projects/${id}`, {
    headers: {
      Authorization: 'Bearer ' + cookies['@EDB:user-token'],
    },
  })

  const project = response.data

  return {
    props: { project },
  }
}
