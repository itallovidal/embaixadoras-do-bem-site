import { Input } from '@/components/global-components/input/input'
import { Checkbox } from '@/components/global-components/checkbox/checkbox'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/global-components/text/heading'
import { ChangeEvent, useState } from 'react'
import { SelectedImageCard } from '@/components/global-components/selected-image-card/selected-image-card'
import { generatePreviewImages } from '@/utils/generate-preview-images'

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
    <div className={'max-w-safeMobile xl:max-w-safeDesktop m-auto my-12'}>
      <Heading>Criação de Projeto</Heading>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={'p-4  bg-gray-300 rounded-lg gap-8 flex flex-col'}
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
              <Input field={'Data de Início'} placeholder={'01/01/2024'} />
              <Input field={'Data de Término'} placeholder={'30/01/2024'} />
            </div>
            <Checkbox
              title={'Projeto ainda vigente'}
              description={
                'Marque essa opção caso o projeto ainda esteja ocorrendo.'
              }
            />
          </div>
        </div>
        <div>
          <Input
            accept={'image/png, image/jpeg, image/jpg'}
            className={'cursor-pointer'}
            field={'Clique para escolher as imagens'}
            type={'file'}
            onChange={(event) => handlePreviewImages(event)}
            multiple
          />
        </div>
        <div className={'flex gap-4 flex-wrap'}>
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
        <Button className={'self-center'}>Criar projeto</Button>
      </form>
    </div>
  )
}

export default CreateProject
