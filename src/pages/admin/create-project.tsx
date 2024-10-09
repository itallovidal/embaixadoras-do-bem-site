import { Input } from '@/components/global-components/input/input'
import { Checkbox } from '@/components/global-components/checkbox/checkbox'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/global-components/text/heading'
import { ChangeEvent } from 'react'
import { SelectedImageCard } from '@/components/global-components/selected-image-card/selected-image-card'
import { generatePreviewImages } from '@/utils/generate-preview-images'
import { DateTimePicker } from '@/components/global-components/date-time-picker/date-time-picker'
import { Controller, useForm } from 'react-hook-form'
import {
  createProjectSchema,
  TCreateProjectSchema,
} from '@/lib/zod/create-project.schema'
import { zodResolver } from '@hookform/resolvers/zod'

function CreateProject() {
  const {
    watch,
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateProjectSchema>({
    defaultValues: {
      images: [],
    },
    resolver: zodResolver(createProjectSchema),
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

  async function handleCreateProject(data: TCreateProjectSchema) {
    console.log('Foi!')
    console.log(data)
  }

  const selectedImages = watch('images')

  console.log(watch())
  console.log(errors)

  return (
    <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-24'}>
      <Heading className={'mb-4'}>Criação de Projeto</Heading>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={'p-4  bg-gray-200 rounded-lg gap-8 flex flex-col'}
      >
        <div className={'flex gap-4 '}>
          <div className={'flex flex-col flex-1 gap-4 '}>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  field={'Título do projeto'}
                  placeholder={'Qual foi seu nome?'}
                  errorMessage={errors.title?.message}
                  {...field}
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
                />
              )}
              name={'description'}
            />
          </div>

          <div className={'flex flex-col gap-4'}>
            <div className={'flex gap-4 mb-4'}>
              <DateTimePicker
                label={'Data de Inicio'}
                date={watch('startDate')}
                errorMessage={errors.startDate?.message}
                setDate={(date) => date && setValue('startDate', date)}
              />
              <DateTimePicker
                isDisabled={watch('isActive')}
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
            />

            <Input
              accept={'image/png, image/jpeg, image/jpg'}
              className={'cursor-pointer w-fit'}
              field={'Clique para escolher as imagens'}
              type={'file'}
              onChange={(event) => handlePreviewImages(event)}
              multiple
              errorMessage={errors.images?.message}
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
        onClick={handleSubmit(handleCreateProject)}
        className={'self-center my-12'}
      >
        Criar projeto
      </Button>
    </div>
  )
}

export default CreateProject
