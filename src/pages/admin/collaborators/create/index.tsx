import { Input } from '@/presentation/components/global-components/input/input'
import { Heading } from '@/presentation/components/global-components/text/heading'
import React, { ChangeEvent } from 'react'
import { generatePreviewImages } from '@/presentation/utils/generate-preview-images'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/presentation/hooks/use-toast'
import { ArrowLeft } from 'lucide-react'
import { getServerSideProps } from '@/gssp-admin-cookies'
import { SelectedImageCard } from '@/presentation/components/global-components/selected-image-card/selected-image-card'
import { Button } from '../../../../presentation/components/global-components/button'
import { useRouter } from 'next/router'
import {
  collaboratorSchema,
  TCollaboratorSchema,
} from '@/validation/create-collaborator.schema'
import { createCollaborator } from '@/infra/adapters/collaborators/create-collaborator'

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
  } = useForm<TCollaboratorSchema>({
    defaultValues: {
      images: [],
    },
    resolver: zodResolver(collaboratorSchema),
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

  async function handleCreateCollaborator(data: TCollaboratorSchema) {
    try {
      await createCollaborator(data)
      toast({
        className: 'bg-green-600 text-white',
        title: 'Colaborador Adicionadod!',
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
        <Heading className={'mb-4'}>Adição de Colaborador</Heading>

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
        <div className={'flex gap-4 flex-col'}>
          <div className={'flex flex-col flex-1 gap-4 '}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  field={'Nome do colaborador'}
                  errorMessage={errors.name?.message}
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={'name'}
            />

            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  field={'Cargo do colaborador'}
                  errorMessage={errors.responsability?.message}
                  {...field}
                  disabled={isSubmitting}
                />
              )}
              name={'responsability'}
            />
          </div>

          <div>
            <Input
              accept={'image/png, image/jpeg, image/jpg, image/webp'}
              className={'cursor-pointer w-fit'}
              field={'Imagem do colaborador'}
              type={'file'}
              onChange={(event) => handlePreviewImages(event)}
              errorMessage={errors.images?.message}
              disabled={isSubmitting}
            />
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
        onClick={handleSubmit(handleCreateCollaborator)}
        className={'self-center my-12 w-full md:w-fit'}
      >
        Adicionar Colaborador
      </Button>
    </div>
  )
}

export default Index

export { getServerSideProps }
