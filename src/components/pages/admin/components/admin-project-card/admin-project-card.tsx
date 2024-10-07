import imagePlaceholder from '../../../../../assets/about-pic-1.jpg'
import Image from 'next/image'
import { Button } from '@/components/button'
import { Paragraph } from '@/components/global-components/text/paragraph'

export function AdminProjectCard() {
  return (
    <div
      className={
        'flex flex-col items-center justify-center max-w-[224px] gap-4 bg-gray-100 p-4'
      }
    >
      <picture className={'max-w-[224px] rounded overflow-hidden'}>
        <Image
          src={imagePlaceholder}
          alt={'foto do projeto.'}
          className={'w-full block object-cover'}
        />
      </picture>
      <Paragraph className={'line-clamp-2 '}>
        Projeto filhos do amanhã ou depois de amanhã quando der nao sei
      </Paragraph>

      <div className={'my-4 space-y-4'}>
        <Button className={'w-full'} variant={'ghost'}>
          Ver
        </Button>
        <Button className={'w-full'} variant={'default'}>
          Editar
        </Button>
        <Button className={'w-full'} variant={'outline'}>
          Excluir
        </Button>
      </div>
    </div>
  )
}
