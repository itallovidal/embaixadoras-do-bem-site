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
  partnershipSchema,
  TPartnershipSchema,
} from '@/validation/partnership.schema'
import { createPartnership } from '@/infra/adapters/partnership/create-partnership'

function Index() {
  const router = useRouter()
  const { toast } = useToast()
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPartnershipSchema>({
    defaultValues: {
      name: '',
      image: '',
    },
    resolver: zodResolver(partnershipSchema),
  })

  function handlePreviewImage(event: ChangeEvent<HTMLInputElement>) {
    const file = generatePreviewImages(event.target.files)
    setValue('image', file)
  }

  function onDelete() {
    setValue('image', '')

    const uploadInput = document.getElementById(
      'uploadFile',
    ) as HTMLInputElement

    if (uploadInput) {
      uploadInput.value = ''
    }
  }

  async function handleCreatePArtnership(data: TPartnershipSchema) {
    try {
      await createPartnership(data)

      toast({
        className: 'bg-green-600 text-white',
        title: 'Parceria salva!',
        description: 'Parceria criada com sucesso.',
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

  const selectedImage = watch('image')

  return (
    <div className={'max-w-safeMobile xl:max-w-lg m-auto my-24'}>
      <div
        className={
          'flex flex-col-reverse items-start justify-between sm:flex-row sm:gap-5 sm:items-center'
        }
      >
        <Heading className={'mb-4'}>Criação da parceria</Heading>

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
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                field={'Nome'}
                placeholder={'Qual foi nome da parceria?'}
                errorMessage={errors.name?.message}
                {...field}
                disabled={isSubmitting}
              />
            )}
            name={'name'}
          />

          <Input
            accept={'image/png, image/jpeg, image/jpg, image/webp'}
            className={'cursor-pointer w-full'}
            field={'Imagem'}
            type={'file'}
            id={'uploadFile'}
            onChange={(event) => handlePreviewImage(event)}
            multiple
            disabled={isSubmitting}
          />

          {selectedImage !== '' && (
            <div className={'flex gap-4 flex-wrap p-4 bg-white rounded-md'}>
              <SelectedImageCard
                key={selectedImage[0].id}
                {...selectedImage[0]}
                onDelete={onDelete}
              />
            </div>
          )}
        </div>
      </form>

      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(handleCreatePArtnership)}
        className={'self-center my-12 w-full md:w-fit'}
      >
        Criar parceria
      </Button>
    </div>
  )
}

export default Index

export { getServerSideProps }
