import { Input } from '@/presentation/components/global-components/input/input'
import { Checkbox } from '@/presentation/components/global-components/checkbox/checkbox'
import { Heading } from '@/presentation/components/global-components/text/heading'
import React, { ChangeEvent } from 'react'
import { generatePreviewImages } from '@/presentation/utils/generate-preview-images'
import { DateTimePicker } from '@/presentation/components/global-components/date-time-picker/date-time-picker'
import { Controller, useForm } from 'react-hook-form'
import {
  projectSchema,
  TProjectSchema,
} from '@/validation/project.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/presentation/hooks/use-toast'
import { createProject } from '@/infra/adapters/create-project'
import { ArrowLeft } from 'lucide-react'
import { getServerSideProps } from '@/gssp-admin-cookies'
import { SelectedImageCard } from '@/presentation/components/global-components/selected-image-card/selected-image-card'
import { Button } from '../../../../presentation/components/global-components/button'
import { useRouter } from 'next/router'

interface ISelectedImage {
  id: string
  src: string
  file: File
}

function Index() {
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
    },
    resolver: zodResolver(projectSchema),
  })

  function handlePreviewImages(event: ChangeEvent<HTMLInputElement>) {
    const files = generatePreviewImages(event.target.files)
    const allImages = [...getValues('images'), ...files]
    setValue('images', allImages)
  }

  function onDelete(id: string) {
    const selectedImages = getValues('images')
    const filteredImages = selectedImages.filter(
      (image: ISelectedImage) => image.id !== id,
    )
    setValue('images', filteredImages)
  }

  async function handleCreateProject(data: TProjectSchema) {
    try {
      await createProject(data)
      toast({
        className: 'bg-green-600 text-white',
        title: 'Projeto salvo!',
        description: 'Projeto criado com sucesso.',
      })
      await router.push('/admin/dashboard')
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

  const selectedImages = watch('images')

  return (
    <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-24'}>
      <div
        className={
          'flex flex-col-reverse items-start justify-between sm:flex-row sm:gap-5 sm:items-center'
        }
      >
        <Heading className={'mb-4'}>Criação de Projeto</Heading>

        <div className={' flex justify-end sm:my-5'}>
          <Button href={'/admin/dashboard'} Icon={ArrowLeft} variant={'ghost'}>
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
            />

            <div>
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
        </div>
        {selectedImages.length > 0 && (
          <div className={'flex gap-4 flex-wrap p-4 bg-white rounded-md'}>
            {selectedImages.map((value: ISelectedImage) => {
              return (
                <SelectedImageCard
                  key={value.id}
                  {...value}
                  onDelete={onDelete}
                />
              )
            })}
          </div>
        )}
      </form>

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(handleCreateProject)}
        className={'self-center my-12 w-full md:w-fit'}
      >
        Criar projeto
      </Button>
    </div>
  )
}

export default Index

export { getServerSideProps }
