import { Input } from '@/components/global-components/input/input'
import { Checkbox } from '@/components/global-components/checkbox/checkbox'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/global-components/text/heading'
import { ChangeEvent, useState } from 'react'
import { SelectedImageCard } from '@/components/global-components/selected-image-card/selected-image-card'
import { generatePreviewImages } from '@/utils/generate-preview-images'
import { DateTimePicker } from '@/components/global-components/date-time-picker/date-time-picker'
import { SubHeading } from '@/components/global-components/text/subheading'

function CreateProject() {
  const [selectedImages, setSelectedImages] = useState<ISelectedImages[]>([])
  console.log(selectedImages)

  function handlePreviewImages(event: ChangeEvent<HTMLInputElement>) {
    const files = generatePreviewImages(event.target.files)

    setSelectedImages(files)
  }

  function onDelete(id: string) {
    const images = selectedImages.filter((image) => image.id !== id)
    setSelectedImages(images)
  }

  return (
    <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-24'}>
      <Heading className={'mb-4'}>Criação de Projeto</Heading>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={'p-4  bg-gray-200 rounded-lg gap-8 flex flex-col'}
      >
        <div className={'flex gap-4'}>
          <Input
            wrapperStyle={'flex-1'}
            field={'Descrição do projeto'}
            placeholder={'Conte os detalhes..'}
            isMultiline
          />
          <div className={'flex flex-col gap-4'}>
            <Input
              field={'Título do projeto'}
              placeholder={'Qual foi seu nome?'}
            />

            <div className={'flex gap-4 mb-4'}>
              <DateTimePicker label={'Data de Inicio'} />
              <DateTimePicker label={'Data de Fim'} />
            </div>
            <Checkbox
              title={'Projeto ainda vigente'}
              description={
                'Marque essa opção caso o projeto ainda esteja ocorrendo.'
              }
            />

            <Input
              accept={'image/png, image/jpeg, image/jpg'}
              className={'cursor-pointer w-fit'}
              field={'Clique para escolher as imagens'}
              type={'file'}
              onChange={(event) => handlePreviewImages(event)}
              multiple
            />
          </div>
        </div>
        <div className={'flex gap-4 flex-wrap p-4 bg-white rounded-md'}>
          {selectedImages.length > 0 &&
            selectedImages.map((value) => {
              return (
                <SelectedImageCard
                  key={value.id}
                  {...value}
                  onDelete={onDelete}
                />
              )
            })}
        </div>
        <Button className={'self-center mb-12'}>Criar projeto</Button>
      </form>
    </div>
  )
}

export default CreateProject
